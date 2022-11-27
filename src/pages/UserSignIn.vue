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
      lazy-validation
    >
      <v-text-field
        v-model="formData.email"
        :rules="formData.emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="formData.password"
        :counter="10"
        :rules="formData.passwordRules"
        label="Password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="formData.checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>
      <div>{{errors}}</div>
    </v-form>
    </page-container>
</template>

<script setup >
import { routerPush } from '@/router/index'
import { Api } from '@/services/api'
import { useUserStore } from '@/store/user'
import { reactive, ref } from 'vue'

const form = ref(null);

const formData = reactive({
  valid: true,
  email: 'as@asd.cpo',
  emailRules: [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ],
  password: '123123',
  passwordRules: [
    v => !!v || 'Name is required',
    v => (v && v.length <= 8) || 'Name must be less than 10 characters',
  ],
  select: null,
  checkbox: true,
})

const validate = async function () {
  const { valid } = await form.value.validate()
  if (valid) signIn();
}




const { updateUser } = useUserStore()
const errors = ref()
const signIn = async () => {
  errors.value = {}
  const user = {
    email: formData.email,
    password: formData.password
  };
  if (!await form.value.validate()) return

  const result = await Api.user.signIn(user)
  
  console.log(result);
  if (result.success) {
    updateUser(user)
    await routerPush('/user-startup');
  } else {
    errors.value = await result.message
  }
}
</script>