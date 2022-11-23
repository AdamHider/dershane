<template>
    <v-app-bar color="primary" density="compact">
        <template v-slot:prepend>
            <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
        </template>
        <v-app-bar-title>Student Startup</v-app-bar-title>
    </v-app-bar>
    <page-container :page-config="pageConfig" >
      <v-img contain height="300" src="src/assets/logo.svg"/>

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Student Startup</h1>
    </page-container>
</template>

<script>
const pageConfig = {
    title: 'Student Startup',
};
export default {
  setup() {
    return {
      pageConfig
    }
  },
};
</script>