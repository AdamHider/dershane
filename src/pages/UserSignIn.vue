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
        v-model="formData.fields.email.value"
        :rules="formData.fields.email.rules"
        :error-messages="formData.fields.email.errors"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="formData.fields.password.value"
        :counter="10"
        :rules="formData.fields.password.rules"
        :error-messages="formData.fields.password.errors"
        label="Password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="formData.fields.terms.value"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        color="success"
        class="mr-4"
        @click="validate()"
        v-on:keyup.enter="validate()"
      >
        Validate
      </v-btn>
    </v-form>
    </page-container>
</template>

<script setup >
import { routerPush } from '@/router/index'
import { api } from '@/services/'
import { useUserStore } from '@/store/user'
import { reactive, ref } from 'vue'

const form = ref(null);

const formData = reactive({
  valid: true,
  fields: {
    email: {
      value: 'ajd1er.adjivapov@gmail.com',
      rules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }, 
    password: {
      value: '12345678',
      rules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 8) || 'Name must be less than 10 characters',
      ],
    },
    terms: {
      value: true
    }
  }
})

const validate = async function () {
  const { valid } = await form.value.validate()
  if (valid) signIn();
}




const { user, updateUser } = useUserStore()
const errors = ref()
const signIn = async () => {
  errors.value = {}
  user.authorization = {
    email: formData.fields.email.value,
    password: formData.fields.password.value,
    terms: formData.fields.terms.value
  };
  if (!await form.value.validate()) return

  const result = await api.user.signIn(user.authorization)
  
  if (result.success) {
    user.data = await api.user.get({id: result.id})
    updateUser(user)
    routerPush('/student-startup')
  } else {
    setErrors(result)
  }
}
const setErrors = (response) => {
  for(var i in response.error_field){
      var field = response.error_field[i];
      formData.fields[field].errors = response.message[field];
    }
}
</script>