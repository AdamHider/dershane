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
      <v-sheet>
        <v-text-field
          v-model="formData.fields.classroom_code.value"
          :rules="formData.fields.classroom_code.rules"
          :error-messages="formData.fields.classroom_code.errors"
          label="Classroom code"
          required
        ></v-text-field>
      </v-sheet>
      <v-btn
        color="success"
        class="mr-4"
        @click="validate()"
        v-on:keyup.enter="validate()"
      >
        <label>Join</label>
      </v-btn>
    </v-form>
    </page-container>
</template>

<script setup >
import { routerPush } from '@/router/index'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from "vue-router";
import { useUserStore } from '@/store/user'

const form = ref(null);
const { setActiveClassroom, user, signIn, signOut } = useUserStore()

const formData = reactive({
  valid: true,
  fields: {
    classroom_code: {
      value: '',
      rules: [
        v => !!v || 'Classroom code is required',
        v => (v && v.length > 5) || 'Classroom code must be valid',
      ],
      errors: '',
    }
  }
})



const validate = async function () {
  const { valid } = await form.value.validate()
  if(valid){
    const auth = {
      username: user.active.authorization.username,
      password: user.active.authorization.password,
      classroom_code: formData.fields.classroom_code.value
    };
    await signOut();
    const isset = await signIn(auth);
    if(isset) return routerPush('/user-startup');
    formData.fields.classroom_code.errors = 'Error';
  }  
}

const route = useRoute();
if(route.params.code != 0){
  formData.fields.classroom_code.value = route.params.code;
}

onMounted(() => {
  if(route.params.code != 0){
    validate();
  }
})

</script>