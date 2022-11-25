<template>
  <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
          <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
      </template>
      <v-app-bar-title>Student Startup</v-app-bar-title>
  </v-app-bar>
  <page-container no-bottom-bar="true">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign in
          </h1>
          <p class="text-xs-center">
          </p>

          <ul class="error-messages">
            <li
              v-for="(error, field) in errors"
              :key="field"
            >
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul>

          <v-form
            ref="formRef"
            lazy-validation
          >
            <v-text-field
                v-model="form.email"
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                class="form-control form-control-lg"
                type="password"
                required
                placeholder="Password"
              ></v-text-field>
            <v-btn
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="!form.email || !form.password"
              @click="login"
            >
              Sign in
            </v-btn>
          </v-form>
        </div>
      </div>
    </page-container>
</template>

<script setup >
import { routerPush } from '@/router/index'
import { Api } from '@/services/api'
//import type { LoginUser } from 'src/services/api'
import { useUserStore } from '@/store/user'
import { reactive, ref } from 'vue'
const formRef = ref(null)
const LoginUser = reactive({
  email: '',
  password: '',
})
const form = reactive({
  email: '',
  password: '',
})
const { updateUser } = useUserStore()
const errors = ref()
const login = async () => {
  errors.value = {}
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