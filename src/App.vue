<template>
  <v-app>
    <AppBackground/>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <AppMessage/>
  </v-app>
</template>
<script setup>
import AppBackground from '@/components/AppBackground.vue';
import AppMessage from '@/components/AppMessage.vue';

import { useRoute } from "vue-router";
  
const route = useRoute();

</script>