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
    <page-container container-class="pa-0" align="end">
        <v-sheet color="white" class="relative text-center pl-4 pr-4 pt-6 pb-6 rounded-t-xl">
            <v-container class="absolute top text-center ma-auto">
                <v-sheet color="transparent">
                    <v-progress-linear color="primary" model-value="20" :height="12"></v-progress-linear>
                    
                    <v-container class="pt-2 pb-2 text-white">
                        <v-row>
                            <v-col cols="6" class="pl-0 pr-0 text-left">
                                <b>User level</b>
                            </v-col>
                            <v-col cols="6" class="pl-0 pr-0 text-right">
                                <b>User total</b>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
                <v-img
                    width="250"
                    :src="`${CONFIG.API_HOST}/images/dershane/hero_${user.active.data.profile.hero}_hello.png`"
                ></v-img>
            </v-container>
            <h2>{{user.active.data.name}}</h2>
            <v-row no-gutters>
                <v-col cols="6" class="ma-2">
                    <v-card class="pa-2" 
                rounded="lg">
                    One of three columns
                    </v-card>
                </v-col>
            </v-row>
            <v-btn
                block
                rounded="lg"
                color="primary"
                @click="signOut()"
            >
                <label>Sign out</label>
            </v-btn>
        </v-sheet>
    </page-container>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { CONFIG } from '@/config.js'

const { user, signOut } = useUserStore()





</script>