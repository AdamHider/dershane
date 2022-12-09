<template>
  <v-app-bar density="compact" >
      <template v-slot:prepend>
          <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
      </template>
      <v-app-bar-title>Edit password</v-app-bar-title>
      <template v-slot:append>
          <v-btn icon="mdi-check" v-on:click="saveChanges();"></v-btn>
      </template>
  </v-app-bar>
  <page-container no-bottom-bar="true" background="white" container-class="pa-0" align="start" >
    <v-sheet color="white" class="text-center pl-4 pr-4 pt-6 pb-6 rounded-t-xl ">
      <v-form
        ref="form"
        v-model="formData.valid"
        @submit.prevent="validate()"
      >
        <v-input v-if="formData.passwordIsPin"
          v-model="formData.fields.oldPassword.value"
          :rules="formData.fields.oldPassword.rules"
          :append-icon="formData.fields.oldPassword.reveal ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="formData.fields.oldPassword.reveal = !formData.fields.oldPassword.reveal"
        >
          <OTPInput 
            :fieldConfig="formData.fields.oldPassword"
            :default="formData.fields.oldPassword.value"
            @update:otp="formData.valid = $event.valid; formData.fields.oldPassword.value = $event.value;"
            :digit-count="4"
            :type="formData.fields.oldPassword.reveal ? 'text' : 'password'"
            label="Old password"
          >
          </OTPInput>
        </v-input>
        <v-text-field v-else
          v-model="formData.fields.oldPassword.value"
          :append-icon="formData.fields.oldPassword.reveal ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="formData.fields.oldPassword.rules"
          :error-messages="formData.fields.oldPassword.errors"
          :type="formData.fields.oldPassword.reveal ? 'text' : 'password'"
          counter
          label="Old password"
          autocomplete="off"
          @click:append="formData.fields.oldPassword.reveal = !formData.fields.oldPassword.reveal"
        ></v-text-field>

        <v-input v-if="formData.passwordIsPin"
          v-model="formData.fields.password.value"
          :rules="formData.fields.password.rules"
          :append-icon="formData.fields.password.reveal ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="formData.fields.password.reveal = !formData.fields.password.reveal"
        >
          <OTPInput 
            :fieldConfig="formData.fields.password"
            :default="formData.fields.password.value"
            @update:otp="formData.valid = $event.valid; formData.fields.password.value = $event.value;"
            :type="formData.fields.password.reveal ? 'text' : 'password'"
            :digit-count="4"
            label="New password"
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
          label="New password"
          autocomplete="off"
          @click:append="formData.fields.password.reveal = !formData.fields.password.reveal"
        ></v-text-field>


        <v-input v-if="formData.passwordIsPin"
          v-model="formData.fields.passwordConfirm.value"
          :rules="formData.fields.passwordConfirm.rules"
          :append-icon="formData.fields.passwordConfirm.reveal ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="formData.fields.passwordConfirm.reveal = !formData.fields.passwordConfirm.reveal"
        >
          <OTPInput 
            :fieldConfig="formData.fields.passwordConfirm"
            :default="formData.fields.passwordConfirm.value"
            @update:otp="formData.valid = $event.valid; formData.fields.passwordConfirm.value = $event.value;"
            :digit-count="4"
            :type="formData.fields.passwordConfirm.reveal ? 'text' : 'password'"
            label="Confirm new password"
          >
          </OTPInput>
        </v-input>
        <v-text-field v-else
          v-model="formData.fields.passwordConfirm.value"
          :append-icon="formData.fields.passwordConfirm.reveal ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="formData.fields.passwordConfirm.rules"
          :error-messages="formData.fields.passwordConfirm.errors"
          :type="formData.fields.passwordConfirm.reveal ? 'text' : 'password'"
          counter
          label="Confirm new password"
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
      </v-form>
    </v-sheet>
  </page-container>
</template>

<script setup >
import  OTPInput from '@/components/OTPInput'
import { routerPush, router } from '@/router/index'
import { useUserStore } from '@/store/user'
import { reactive, ref, watch } from 'vue'
import { useRoute } from "vue-router";

const form = ref(null);
const route = useRoute();
const { user, savePassword } = useUserStore()


const formData = reactive({
  step: route.params.step,
  passwordIsPin: true,
  valid: true,
  fields: {
    oldPassword: {
      value: '',
      rules: [
        v => !!v || 'Required.',
        v => (/^[0-9a-zA-Z]{4,}$/.test(v)) || 'Password must contain at least one digit, be of latin and min 8 characters',
      ],
      errors: '',
      reveal: false,
    },
    password: {
      value: '',
      rules: [
        v => !!v || 'Required.',
        v => (/^[0-9a-zA-Z]{4,}$/.test(v)) || 'Password must contain at least one digit, be of latin and min 8 characters',
      ],
      errors: '',
      reveal: false,
    },
    passwordConfirm: {
      value: '',
      rules: [
        v => !!v || 'Required.',
        v => (v === formData.fields.password.value) || 'Your passwords are different',
      ],
      errors: '',
      reveal: false,
    },
  }
})

const steps = [
  '', 'password', 'password', 'terms'
];



const saveChanges = async function () {
    const data = {
      old_password: formData.fields.oldPassword.value,
      password: formData.fields.password.value,
      passwordConfirm: formData.fields.passwordConfirm.value
    }
    const saved = await savePassword(data);
    if(saved.success) return routerPush('/user-edit');
    return;
}

</script>