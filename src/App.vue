<template>
  <v-app>
    <v-main>
      <v-container>
          <router-view/>
      </v-container>
    </v-main>
    <BottomBar/>
  </v-app>
</template>
<script setup>
  import BottomBar from './components/BottomBar.vue';
</script>