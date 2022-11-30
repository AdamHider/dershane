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
      @submit.prevent="validate()"
    >
      <v-sheet v-if="formData.step == 1">
        <v-text-field
          v-model="formData.fields.name.value"
          :counter="10"
          :rules="formData.fields.name.rules"
          :error-messages="formData.fields.name.errors"
          label="Name"
          required
        ></v-text-field>
      </v-sheet>
      <v-sheet v-else-if="formData.step == 2">
        <v-text-field
          v-model="formData.fields.email.value"
          :rules="formData.fields.email.rules"
          :error-messages="formData.fields.email.errors"
          label="E-mail"
          required
        ></v-text-field>
      </v-sheet>
      <v-sheet v-else-if="formData.step == 3">
          <v-text-field
            v-model="formData.fields.password.value"
            :append-icon="formData.fields.password.reveal ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="formData.fields.password.rules"
            :error-messages="formData.fields.password.errors"
            :type="formData.fields.password.reveal ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="formData.fields.password.reveal = !formData.fields.password.reveal"
          ></v-text-field>
      </v-sheet>
      <v-sheet v-else-if="formData.step == 4">
          <v-text-field
            v-model="formData.fields.passwordConfirm.value"
            :append-icon="formData.fields.password.reveal ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="formData.fields.passwordConfirm.rules"
            :type="formData.fields.password.reveal ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm password"
            hint="At least 8 characters"
            counter
            @click:append="formData.fields.password.reveal = !formData.fields.password.reveal"
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
        v-on:keyup.enter="validate()"
      >
        <label v-if="formData.step == 4">Sign Up</label>
        <label v-else>Next</label>
      </v-btn>
    </v-form>
    </page-container>
</template>

<script setup >
import { routerPush } from '@/router/index'
import { useUserStore } from '@/store/user'
import { reactive, ref, watch } from 'vue'

const form = ref(null);

const formData = reactive({
  step: 1,
  valid: true,
  fields: {
    name: {
      value: 'admin7',
      rules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      errors: '',
    },
    email: {
      value: 'as@as.com',
      rules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      errors: '',
    },
    password: {
      value: '12345678',
      rules: [
        v => !!v || 'Required.',
        v => (v && v.length <= 8) || 'Min 8 characters',
      ],
      errors: '',
      reveal: false,
    },
    passwordConfirm: {
      value: '12345678',
      rules: [
        v => !!v || 'Required.',
        v => (v === formData.fields.password.value) || 'Your passwords are different',
      ],
    }
  }
})

const steps = [
  '', 'name', 'email', 'password'
];

const { signUp, checkUsername } = useUserStore()

const validate = async function () {
  const { valid } = await form.value.validate()
  if (valid) formData.step++
  if (formData.step > 4){
    const result = await signUp({
      name: formData.fields.name.value,
      email: formData.fields.email.value,
      password: formData.fields.password.value
    });
    if (result.success) {
      routerPush('/student-startup')
    } else {
      setErrors(result)
      formData.step = steps.indexOf(result.error_field[0]);
    }
  }
}
watch(formData.fields.name, async (currentValue, oldValue) => {
    const result = await checkUsername({username: currentValue.value});
    formData.fields.name.errors = '';
    if(!result.success){
      formData.fields.name.errors = result.message;
    } 
});
    
const setErrors = (response) => {
  for(var i in response.error_field){
      var field = response.error_field[i];
      formData.fields[field].errors = response.message[field];
    }
}
</script>