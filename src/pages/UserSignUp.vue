<template>
  <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
          <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
      </template>
      <v-app-bar-title>Sign Up</v-app-bar-title>
  </v-app-bar>
  <page-container no-bottom-bar="true">
    <v-form
      ref="form"
      v-model="formData.valid"
    >
      <v-sheet v-if="formData.step == 1">
        <v-text-field
          v-model="formData.name"
          :counter="10"
          :rules="formData.nameRules"
          label="Name"
          required
        ></v-text-field>
      </v-sheet>
      <v-sheet v-else-if="formData.step == 2">
        <v-text-field
          v-model="formData.email"
          :rules="formData.emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-sheet>
      <v-sheet v-else-if="formData.step == 3">
          <v-text-field
            v-model="formData.password"
            :append-icon="formData.passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="formData.passwordRules"
            :type="formData.passwordShow ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="formData.passwordShow = !formData.passwordShow"
          ></v-text-field>
      </v-sheet>
      <v-sheet v-else-if="formData.step == 4">
          <v-text-field
            v-model="formData.passwordConfirm"
            :append-icon="formData.passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="formData.passwordConfirmRules"
            :type="formData.passwordShow ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm password"
            hint="At least 8 characters"
            counter
            @click:append="formData.passwordShow = !formData.passwordShow"
          ></v-text-field>
      </v-sheet>


      <v-btn
        v-if="formData.step!==1"  
        class="mr-4"
        @click="formData.step--;"
      >
        Previous
      </v-btn>

      <v-btn
        v-if="formData.step < 5"  
        color="success"
        class="mr-4"
        @click="validate()"
      >
        Next
      </v-btn>

    </v-form>
    </page-container>
</template>

<script setup >
import { routerPush } from '@/router/index'
import { Api } from '@/services/api'
import { useUserStore } from '@/store/user'

import { reactive, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const form = ref(null);

const formData = reactive({
  step: 1,
  valid: true,
  name: '',
  nameRules: [
    v => !!v || 'Name is required',
    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
  ],
  email: '',
  emailRules: [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ],
  password: '',
  passwordRules: [
    v => !!v || 'Required.',
    v => (v && v.length <= 8) || 'Min 8 characters',
  ],
  passwordShow: false,
  passwordConfirm: '',
  passwordConfirmRules: [
    v => !!v || 'Required.',
    v => (v === formData.password) || 'Your passwords are different',
  ],
  checkbox: false,
})

const validate = async function () {
  const { valid } = await form.value.validate()
  if (valid) formData.step++
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