<template>
  <v-app-bar density="compact" >
      <template v-slot:prepend>
          <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
      </template>
      <v-app-bar-title>Edit {{user.active.data.name}}</v-app-bar-title>
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
        <v-text-field
          v-model="formData.fields.username.value"
          :rules="formData.fields.username.rules"
          :error-messages="formData.fields.username.errors"
          label="Name"
          required
        >
          <template v-if="formData.valid" v-slot:append-inner>
              <v-icon color="success" icon="mdi-check"></v-icon>
          </template>
          <template  v-slot:append-outer>
              <v-icon color="success" icon="mdi-change"></v-icon>
          </template>
        </v-text-field>
        <v-card  
          v-if="(formData.fields.username.suggestions.length > 0)"
          class="mx-auto pa-2"
        >
          <v-list>
            <v-list-item
              v-for="(item, index) in formData.fields.username.suggestions"
              :key="index"
              :value="item"
              @click="(formData.fields.username.value = item); formData.fields.username.suggestions = []"
            >
              <v-list-item-title class="text-left">{{ item }}</v-list-item-title>
              <template v-slot:append>        
                <v-icon color="success" icon="mdi-check"></v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
        <v-btn
          class="mt-2 mb-2"
            block
            rounded="lg"
            to="user-password-edit"
            append-icon="mdi-pencil"
        >
          <label>Change password</label>
        </v-btn>
        <v-text-field
          v-model="formData.fields.email.value"
          :rules="formData.fields.email.rules"
          :error-messages="formData.fields.email.errors"
          label="E-mail"
          required
        ></v-text-field>
      </v-form>
    </v-sheet>
  </page-container>
</template>

<script setup >
import { routerPush, router } from '@/router/index'
import { useUserStore } from '@/store/user'
import { reactive, ref, watch } from 'vue'
import { useRoute } from "vue-router";

const form = ref(null);
const route = useRoute();
const { user, checkUsername, checkEmail, save } = useUserStore()


const formData = reactive({
  step: route.params.step,
  passwordIsPin: true,
  valid: true,
  fields: {
    name: {
      value: user.active.data.name,
      rules: [
        v => !!v || 'Name is required',
      ],
      suggestions: []
    }, 
    username: {
      value: user.active.data.username,
      rules: [
        v => !!v || 'Username is required',
      ],
      suggestions: []
    }, 
    email: {
      value: user.active.data.email,
      rules: [
        v => v === '' || ((/.+@.+\..+/.test(v)) || 'E-mail must be valid'),
      ],
      errors: '',
      required: false
    },
    terms: {
      value: false
    }
  }
})

const steps = [
  '', 'password', 'password', 'terms'
];



const saveChanges = async function () {
    const data = {
      name: formData.fields.name.value,
      username: formData.fields.username.value,
      email: formData.fields.email.value
    }
    const saved = await save(data);
    if(saved.success) return routerPush('/user-dashboard');
    return;
}

watch(() => formData.fields.username.value, async (currentValue, oldValue) => {
    formData.fields.username.errors = '';
    const result = await checkUsername({username: currentValue});
    if(!result.success){
      formData.fields.username.errors = result.message;
    }
    formData.fields.username.suggestions = result.data;
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
</script>