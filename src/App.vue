<template>
  <v-app>
    <AppBackground/>
    <router-view/>
    <AppMessage/>
  </v-app>
</template>
<script>
import AppBackground from '@/components/AppBackground.vue';
import AppMessage from '@/components/AppMessage.vue';
  
export default {
  components: {
    AppBackground,
    AppMessage
  }
};
</script>