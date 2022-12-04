<template>
  <v-app>
    <AppBackground/>
    <router-view/>
  </v-app>
</template>
<script>
import AppBackground from '@/components/AppBackground.vue';
  
export default {
  components: {
    AppBackground
  }
};
</script>