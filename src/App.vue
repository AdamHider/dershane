

<template>
  <v-app  :theme="theme">
    <RouterView/>
    <BottomBar/>
  </v-app>
</template>
<script setup>
  import { ref } from 'vue'
  import BottomBar from './components/BottomBar.vue';

  const theme = ref('light')

  function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
</script>