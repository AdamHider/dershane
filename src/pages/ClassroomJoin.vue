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
          v-model="formData.fields.classroom_code.value"
          :rules="formData.fields.classroom_code.rules"
          :error-messages="formData.fields.classroom_code.errors"
          label="Classroom code"
          required
        ></v-text-field>
      </v-sheet>
      <v-sheet v-else-if="formData.step == 2">
        <v-text-field
          v-model="formData.fields.name.value"
          :counter="10"
          :rules="formData.fields.name.rules"
          :error-messages="formData.fields.name.errors"
          label="Name"
          required
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
import { api } from '@/services/'
import { useStudentStore } from '@/store/student'
import { reactive, ref } from 'vue'

const form = ref(null);

const formData = reactive({
  step: 1,
  valid: true,
  fields: {
    classroom_code: {
      value: 'd1d1d1',
      rules: [
        v => !!v || 'Classroom code is required',
        v => (v && v.length > 5) || 'Classroom code must be valid',
      ],
      errors: '',
    },
    name: {
      value: 'admin7',
      rules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      errors: '',
    }
  }
})

const steps = [
  '', 'classroom_code', 'name'
];

const { signUp } = useStudentStore()

const validate = async function () {
  const { valid } = await form.value.validate()
  if (valid) formData.step++
  if (formData.step == steps.length){
    const result = await signUp({
      classroom_code: formData.fields.classroom_code.value,
      name: formData.fields.name.value
    });
    if (result) {
      routerPush('/student-startup')
    } else {
      /*
      setErrors(result)
      formData.step = steps.indexOf(result.error_field[0]);
      */
    }
  }
}



    
const setErrors = (response) => {
  for(var i in response.error_field){
      var field = response.error_field[i];
      formData.fields[field].errors = response.message[field];
    }
}
</script>