<template>
  <page-container no-bottom-bar="true">
    <v-form
      ref="form"
      v-model="formData.valid"
      @submit.prevent="validate()"
    >
      <v-sheet v-if="formData.step == 1">
        <v-text-field
          v-model="formData.fields.name.value"
          :rules="formData.fields.name.rules"
          :error-messages="formData.fields.name.errors"
          label="Name"
          required
        >
          <template v-if="formData.valid" v-slot:append-inner>
              <v-icon color="success" icon="mdi-check"></v-icon>
          </template>
        </v-text-field>
        <v-card  
          v-if="(formData.fields.name.suggestions.length > 0)"
          class="mx-auto pa-2"
          max-width="300"
        >
          <v-list>
            <v-list-item
              v-for="(item, index) in formData.fields.name.suggestions"
              :key="index"
              :value="item"
              @click="(formData.fields.name.value = item); formData.fields.name.suggestions = []"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
              <template v-slot:append>        
                <v-icon color="success" icon="mdi-check"></v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-sheet>
      <v-sheet v-else-if="(formData.step == 2)">
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
      </v-sheet>
      <v-sheet v-else-if="(formData.step == 3)">
          <v-text-field
            v-model="formData.fields.passwordConfirm.value"
            :append-icon="formData.fields.passwordConfirm.reveal ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="formData.fields.passwordConfirm.rules"
            :type="formData.fields.passwordConfirm.reveal ? 'text' : 'password'"
            counter
            label="Confirm password"
            @click:append="formData.fields.passwordConfirm.reveal = !formData.fields.passwordConfirm.reveal"
          ></v-text-field>
      </v-sheet>
      <v-sheet v-else-if="(formData.step == 4)">
        <v-text-field
          v-model="formData.fields.email.value"
          :rules="formData.fields.email.rules"
          :error-messages="formData.fields.email.errors"
          label="E-mail"
          required
        ></v-text-field>
      </v-sheet>
      <v-btn
        v-if="formData.step < 5"  
        color="success"
        class="mr-4"
        :disabled="!formData.valid"
        @click="validate()"
        v-on:keyup.enter="validate()"
      >
        <label v-if="formData.step == 4">Sign Up</label>
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
    </page-container>
</template>

<script setup >
import { routerPush, router } from '@/router/index'
import { useUserStore } from '@/store/user'
import { reactive, ref, watch, watchEffect } from 'vue'
import { useRoute } from "vue-router";

const { signUp, signIn, checkUsername, checkEmail } = useUserStore()
const route = useRoute();
const form = ref(null);
const formData = reactive({
  step: route.params.step,
  valid: true,
  fields: {
    name: {
      value: 'admin7',
      rules: [
        v => !!v || 'Name is required',
        v => (/^([a-zA-Z0-9]*[._]{0,1}[a-zA-Z0-9]*)$/.test(v) && v.length >= 5) || 'Name must be of latin, without spaces and min 5 characters'
      ],
      suggestions: [],
      errors: '',
      required: true,
      focused: true,
      active: true,
      menu: true
    },
    password: {
      value: '',
      rules: [
        v => !!v || 'Required.',
        v => (/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/.test(v)) || 'Password must contain at least one digit, be of latin and min 8 characters',
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
    email: {
      value: 'as@as.com',
      rules: [
        v => v === '' || ((/.+@.+\..+/.test(v)) || 'E-mail must be valid'),
      ],
      errors: '',
      required: false
    }
  }
})

const steps = [
  '', 'name', 'password', 'password', 'email'
];

const validate = async function () {
  if (formData.step == 4){
    const user_auth = {
      username: formData.fields.name.value,
      email: formData.fields.email.value,
      password: formData.fields.password.value
    };
    const result = await signUp(user_auth);
    if (result.success) {
      await signIn(user_auth);
      routerPush('/student-startup')
    } else {
      formData.fields[steps[formData.step]].errors = message;
    }
    return;
  }
  if (formData.valid) formData.step++
  routerPush('/user-sign-up/step'+formData.step);
}

watch(() => formData.fields.name.value, async (currentValue, oldValue) => {
    formData.fields.name.errors = '';
    const result = await checkUsername({username: currentValue});
    if(!result.success){
      formData.fields.name.errors = result.message;
    }
    formData.fields.name.suggestions = result.data;
});
watch(() => formData.fields.email.value, async (currentValue, oldValue) => {
  formData.fields.email.errors = '';
  if (!currentValue) return;
  const result = await checkEmail({email: currentValue});
  if(!result.success){
    formData.fields.email.errors = result.message;
    formData.valid = false;
  }
});
watch(() => route.params.step, (currentValue, oldValue) => {
  console.log(formData.valid);
  if(!formData.valid && route.params.step > formData.step){
    router.go(-1);
    return false;
  }
  formData.step = route.params.step;
});
watchEffect(async () => {
  if(form.value){
    const { valid } = await form.value.validate();
    formData.valid = valid;
  } else {
    formData.valid = true;
  }
})

</script>