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

        <div class="text-body-2 font-weight-light mb-n1">Welcome to {{ count }}</div>

        <h1 class="text-h2 font-weight-bold" v-on:click="increment()">Home</h1>
    </page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const pageConfig = {
    title: 'Home'
};

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>
