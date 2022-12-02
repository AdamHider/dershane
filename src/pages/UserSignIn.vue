<template>
  <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
          <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
      </template>
      <v-app-bar-title>Sign In</v-app-bar-title>
  </v-app-bar>
  <page-container no-bottom-bar="true">
    <v-form
      ref="form"
      v-model="formData.valid"
      @submit.prevent="validate()"
      lazy-validation
    >
      <v-text-field
        v-model="formData.fields.username.value"
        :rules="formData.fields.username.rules"
        :error-messages="formData.fields.username.errors"
        label="Username or e-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="formData.fields.password.value"
        :append-icon="formData.fields.password.reveal ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="formData.fields.password.rules"
        :error-messages="formData.fields.password.errors"
        :type="formData.fields.password.reveal ? 'text' : 'password'"
        counter
        label="Password"
        @click:append="formData.fields.password.reveal = !formData.fields.password.reveal"
      ></v-text-field>

      <v-btn
        color="success"
        class="mr-4"
        :disabled="!formData.valid"
        @click="validate()"
        v-on:keyup.enter="validate()"
      >
        Sign In
      </v-btn>
    </v-form>
    </page-container>
</template>

<script setup >
import { routerPush } from '@/router/index'
import { useUserStore } from '@/store/user'
import { reactive, ref } from 'vue'

const form = ref(null);

const formData = reactive({
  valid: false,
  fields: {
    username: {
      value: '',
      rules: [
        v => !!v || 'Username or e-mail is required',
      ],
    }, 
    password: {
      value: '',
      rules: [
        v => !!v || 'Required.',
        v => (/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/.test(v)) || 'Password must contain at least one digit, be of latin and min 8 characters',
      ],
      errors: '',
      reveal: false,
    }
  }
})

const { signIn } = useUserStore()

const validate = async function () {
  const { valid } = await form.value.validate()
  if (valid) {
    const result = await signIn({
      username: formData.fields.username.value,
      password: formData.fields.password.value
    });
    if (result.success) {
      return routerPush('/user-startup');
    } else {
      formData.fields.username.errors = result.message;
      formData.fields.password.errors = result.message;
    }
  }
}
</script>