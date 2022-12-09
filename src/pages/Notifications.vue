<template>
    <v-app-bar density="compact" >
        <template v-slot:prepend>
            <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
        </template>
        <v-app-bar-title>Notifications</v-app-bar-title>
    </v-app-bar>
    <page-container background="white" container-class="pa-0" align="start" >
        <NotificationList/>
    </page-container>
  </template>
  
  <script setup >
  import NotificationList from '@/components/NotificationList.vue'
  
  
  </script>