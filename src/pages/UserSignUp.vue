<template>
  <v-app-bar color="transparent" density="compact" class="text-white" elevation="0">
      <template v-slot:prepend>
          <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
      </template>
      <v-app-bar-title></v-app-bar-title>
  </v-app-bar>
  <page-container no-bottom-bar="true" container-class="pa-0" align="end">
    <v-sheet color="white" class="text-center pl-4 pr-4 pt-6 pb-6 rounded-t-xl ">
      <v-form 
        ref="form"
        v-model="formData.valid" 
        @submit.prevent="validate()">
        <v-sheet v-if="(formData.step == 1)">
          <v-input v-if="formData.passwordIsPin"
            v-model="formData.fields.password.value"
            :rules="formData.fields.password.rules"
          >
            <OTPInput 
              :fieldConfig="formData.fields.password"
              :default="formData.fields.password.value"
              @update:otp="formData.valid = $event.valid; formData.fields.password.value = $event.value;"
              :digit-count="4"
              label="Password"
            >
            </OTPInput>
          </v-input>
          <v-text-field v-else
            v-model="formData.fields.password.value"
            :append-icon="formData.fields.password.reveal ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="formData.fields.password.rules"
            :error-messages="formData.fields.password.errors"
            :type="formData.fields.password.reveal ? 'text' : 'password'"
            counter
            label="Password"
            autocomplete="off"
            @click:append="formData.fields.password.reveal = !formData.fields.password.reveal"
          ></v-text-field>
          <v-chip
            variant="text"
            class="ma-4"
            :ripple="false" 
            @click="formData.passwordIsPin = !formData.passwordIsPin"
          >
            <template v-if="formData.passwordIsPin">Use password</template>
            <template v-else>Use pin</template>
          </v-chip>
        </v-sheet>
        <v-sheet v-else-if="(formData.step == 2)">
          <v-input v-if="formData.passwordIsPin"
            v-model="formData.fields.passwordConfirm.value"
            :rules="formData.fields.passwordConfirm.rules"
          >
            <OTPInput 
              :fieldConfig="formData.fields.passwordConfirm"
              :default="formData.fields.passwordConfirm.value"
              @update:otp="formData.valid = $event.valid; formData.fields.passwordConfirm.value = $event.value;"
              :digit-count="4"
              label="Confirm password"
            >
            </OTPInput>
          </v-input>
          <v-text-field  v-else
            v-model="formData.fields.passwordConfirm.value"
            :append-icon="formData.fields.passwordConfirm.reveal ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="formData.fields.passwordConfirm.rules"
            :type="formData.fields.passwordConfirm.reveal ? 'text' : 'password'"
            counter
            label="Confirm password"
            autocomplete="off"
            @click:append="formData.fields.passwordConfirm.reveal = !formData.fields.passwordConfirm.reveal"
          ></v-text-field>
          <v-chip
            variant="text"
            class="ma-4"
            :ripple="false" 
            @click="formData.passwordIsPin = !formData.passwordIsPin"
          >
            <template v-if="formData.passwordIsPin">Use password</template>
            <template v-else>Use pin</template>
          </v-chip>
        </v-sheet>
        <v-sheet v-else-if="(formData.step == 3)">
          <v-checkbox
            v-model="formData.fields.terms.value"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>
        </v-sheet>
        <v-btn
          v-if="(formData.step < 4)"  
          color="success"
          class="mr-4"
          :disabled="!formData.valid"
          @click="validate()"
          v-on:keyup.enter="validate()"
        >
          <label v-if="(formData.step == 3)">Sign Up</label>
          <label v-else>Next</label>
        </v-btn>
        <v-btn
          v-if="!formData.fields[steps[formData.step]].required"  
          class="mr-4"
          @click="formData.fields[steps[formData.step]].value = ''; validate();"
        >
          Skip
        </v-btn>
      </v-form>
    </v-sheet>
    </page-container>
</template>

<script setup >
import  OTPInput from '@/components/OTPInput'
import { routerPush, router } from '@/router/index'
import { useUserStore } from '@/store/user'
import { reactive, ref, watch, watchEffect } from 'vue'
import { useRoute } from "vue-router";

const { signUp, signIn } = useUserStore()
const route = useRoute();
const form = ref(null);
const formData = reactive({
  step: route.params.step,
  passwordIsPin: true,
  valid: true,
  fields: {
    password: {
      value: '',
      rules: [
        v => !!v || 'Required.',
        v => (/^[0-9a-zA-Z]{4,}$/.test(v)) || 'Password must contain at least one digit, be of latin and min 8 characters',
      ],
      errors: '',
      reveal: false,
      required: true
    },
    passwordConfirm: {
      value: '',
      rules: [
        v => !!v || 'Required.',
        v => (v === formData.fields.password.value) || 'Your passwords are different',
      ],
      errors: '',
      reveal: false,
      required: true
    },
    terms: {
      value: false
    }
  }
})

const steps = [
  '', 'password', 'password', 'terms'
];

const validate = async function () {
  if (formData.step == 3){
    const user_auth = {
      password: formData.fields.password.value
    };
    const authResponse = await signUp(user_auth);
    if (authResponse.success) {
      const logged = await signIn(authResponse.data);
      if(logged.success) return routerPush('/user-dashboard');
    } else {
      formData.fields[steps[formData.step]].errors = result.message;
    }
    return;
  }
  if (formData.valid) formData.step++
  return routerPush('/user-sign-up/step'+formData.step);
}

watch(() => route.params.step, (currentValue, oldValue) => {
  if(!formData.valid && route.params.step > formData.step){
    router.go(-1);
    return false;
  }
  formData.step = route.params.step;
});

</script>