<template>
    <v-app-bar color="transparent" density="compact" class="text-white" elevation="0">
        <template v-slot:prepend>
            <ClassroomToggle/>
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
            <v-card class="mt-4 mb-4 text-left"  rounded="lg">
                <v-row align="center" no-gutters class="pa-4">
                    <v-col cols="2">
                        <v-avatar color="grey-lighten-1">
                            <v-icon color="white">mdi-folder</v-icon>
                        </v-avatar>
                    </v-col>
                    <v-col class="text-left" cols="8">
                        <h4>{{classroom.active.title}}</h4>
                        <p class="text-grey">
                            Current classroom
                        </p>
                    </v-col>
                    <v-col class="text-medium-emphasis text-truncate" cols="2">
                        <v-btn icon="mdi-account-convert-outline" variant="text"></v-btn>
                    </v-col>
                </v-row>
            </v-card>
            <v-container class="mt-4 mb-4 pa-0">
                <v-row >
                    <v-col cols="6">
                        <v-card class="pa-4 pv-2 text-left" rounded="lg">
                            <h3>1</h3>
                            <p class="text-grey">Description</p>
                            <v-tooltip activator="parent" location="top">
                                Tooltip
                            </v-tooltip>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="pa-4 text-left" rounded="lg">
                            <h3>1</h3>
                            <p class="text-grey">Description</p>
                            <v-tooltip activator="parent" location="top">
                                Tooltip
                            </v-tooltip>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="pa-4 text-left" rounded="lg">
                            <h3>1</h3>
                            <p class="text-grey">Description</p>
                            <v-tooltip activator="parent" location="top">
                                Tooltip
                            </v-tooltip>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="pa-4 text-left" rounded="lg">
                            <h3>1</h3>
                            <p class="text-grey">Description</p>
                            <v-tooltip activator="parent" location="top">
                                Tooltip
                            </v-tooltip>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
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
import { useClassroom } from '@/composable/useClassroom'
import ClassroomToggle from '@/components/ClassroomToggle.vue'
import { CONFIG } from '@/config.js'
import { ref } from 'vue'

const { user, signOut } = useUserStore()
const { classroom } = useClassroom()

const sheet = ref(false);



</script>