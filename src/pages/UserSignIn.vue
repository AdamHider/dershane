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

    </v-form>
    </page-container>
</template>

<script setup >
import { routerPush } from '@/router/index'
import { Api } from '@/services/api'
import { useUserStore } from '@/store/user'

import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const form = ref(null);

const formData = reactive({
  valid: true,
  email: '',
  emailRules: [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ],
  password: '',
  passwordRules: [
    v => !!v || 'Name is required',
    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
  ],
  select: null,
  items: [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ],
  checkbox: false,
})

const validate = async function () {
  const { valid } = await form.value.validate()
  if (valid) alert('Form is valid')
}
const reset =  function () {
  form.value.reset()
}
const resetValidation = function() {
  form.value.resetValidation()
}


const { updateUser } = useUserStore()
const errors = ref()
const login = async () => {
  errors.value = {}

  console.log(form);


  if (!formRef.value?.checkValidity()) return
    const result = await Api.users.login({ user: form })
  if (result.ok) {
    updateUser(result.data.user)
    await routerPush('global-feed');
  } else {
    errors.value = await result.error
  }
}
</script>