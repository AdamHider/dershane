<template>
    <v-app-bar color="primary" density="compact">
        <template v-slot:prepend>
            <v-btn icon="mdi-account-convert-outline" to="/student-startup"></v-btn>
        </template>
        <v-app-bar-title>Home</v-app-bar-title>
        <template v-slot:append >
            <v-btn icon="mdi-calendar-check-outline" to=""></v-btn>
            <v-btn icon="mdi-trophy-variant-outline" to=""></v-btn>
        </template>
    </v-app-bar>
    <page-container :page-config="pageConfig" >
        <v-img contain height="300" src="src/assets/logo.svg"/>

        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

        <h1 class="text-h2 font-weight-bold">Home</h1>
    </page-container>
</template>

<script>
const pageConfig = {
    title: 'Home'
};
export default {
  setup() {
    return {
      pageConfig
    }
  },
};
</script>
