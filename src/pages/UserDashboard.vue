<template>
    <v-app-bar color="transparent" density="compact" class="text-white" elevation="0">
        <template v-slot:prepend>
            <v-btn icon="mdi-account-convert-outline" to="/user-startup"></v-btn>
        </template>
        <v-app-bar-title></v-app-bar-title>
        <template v-slot:append >
            <v-btn icon="mdi-calendar-check-outline" to=""></v-btn>
            <v-btn icon="mdi-trophy-variant-outline" to=""></v-btn>
        </template>
    </v-app-bar>
    <page-container no-bottom-bar="true" container-class="pa-0" align="end">
        <v-sheet color="white" class="text-center pl-4 pr-4 pt-6 pb-6 rounded-t-xl ">
            <h2>{{user.active.data.name}}</h2>
        </v-sheet>
    </page-container>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const { user } = useUserStore()





</script>