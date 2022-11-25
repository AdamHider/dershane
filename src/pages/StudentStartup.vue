<template>
    <v-app-bar color="primary" density="compact">
        <template v-slot:prepend>
            <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
        </template>
        <v-app-bar-title>Student Startup</v-app-bar-title>
    </v-app-bar>
    <page-container no-bottom-bar="true">
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
      <h1 class="text-h2 font-weight-bold">Student Startup</h1>
      <StudentSlider/>
      <v-sheet>
        <div v-if="!user">
            You are not logged in
        </div>
        <div v-else>
            Welcome, dear user
        </div>
      </v-sheet>
    </page-container>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { isAuthorized, useUserStore  } from '@/store/user'
import StudentSlider from '@/components/StudentSlider.vue'

const { user } = storeToRefs(useUserStore());

</script>