<template>
  <v-app :theme="theme">
    <RouterView/>
    <BottomBar/>
  </v-app>
</template>
<script setup>
  import BottomBar from './components/BottomBar.vue';
</script>