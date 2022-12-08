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
        <v-container class="relative text-center mb-n12">
            <v-sheet color="transparent">
                <v-progress-linear 
                    color="white"
                    :model-value="userData.profile.level.percentage" 
                    :height="20" 
                    rounded="lg"
                ></v-progress-linear>
                <v-container class="pt-2 pb-2 text-white">
                    <v-row>
                        <v-col cols="6" class="pl-0 pr-0 text-left">
                            <b>Level {{userData.profile.level.id}}</b>
                        </v-col>
                        <v-col cols="6" class="pl-0 pr-0 text-right">
                            <b>{{userData.profile.total_points}}/{{userData.profile.level.points_to}}</b>
                        </v-col>
                    </v-row>
                </v-container>
            </v-sheet>
            <v-img
                class="ma-auto"
                width="170"
                :src="`${CONFIG.API_HOST}/images/dershane/hero_${userData.profile?.hero}_hello.png`"
            >
            </v-img>
        </v-container>
        <v-sheet color="white" class="relative text-center pl-2 pr-2 pt-6 pb-6 rounded-t-xl">
            <h2>{{userData.name}}</h2>
            <v-card class="mt-4 mb-4 text-left"  rounded="lg">
                <v-row align="center" no-gutters class="pa-2">
                    <v-col cols="2">
                        <v-avatar color="grey-lighten-1">
                            <v-img :src="`${CONFIG.API_HOST}${classroom.active?.introimage}`"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col class="text-left" cols="8">
                        <h4>{{classroom.active?.title}}</h4>
                        <p class="text-grey">
                            Current classroom
                        </p>
                    </v-col>
                    <v-col class="text-medium-emphasis text-truncate" cols="2">
                        <v-btn icon="mdi-account-convert-outline" to="/user-startup" variant="text"></v-btn>
                    </v-col>
                </v-row>
            </v-card>
            <v-btn
                block
                rounded="lg"
                to="user-edit"
                append-icon="mdi-account-edit"
            >
                <label>Edit profile</label>
            </v-btn>
            <v-container class="mt-4 mb-4 pa-0">
                <v-row >
                    <v-col cols="6">
                        <v-card class="pa-2 pv-2 text-left" rounded="lg">
                            <h3>{{userData.profile.total_exercises}}</h3>
                            <p class="text-grey">Exercises</p>
                            <v-tooltip activator="parent" location="top">
                                Tooltip
                            </v-tooltip>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="pa-2 text-left" rounded="lg">
                            <h3>{{userData.profile.total_points}}</h3>
                            <p class="text-grey">Points</p>
                            <v-tooltip activator="parent" location="top">
                                Tooltip
                            </v-tooltip>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="pa-2 text-left" rounded="lg">
                            <h3>{{userData.profile.total_classrooms}}</h3>
                            <p class="text-grey">Classrooms</p>
                            <v-tooltip activator="parent" location="top">
                                Tooltip
                            </v-tooltip>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="pa-2 text-left" rounded="lg">
                            <h3>{{userData.profile.total_achievements}}</h3>
                            <p class="text-grey">Achievements</p>
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
                @click="exitUser(); "
                append-icon="mdi-logout-variant"
            >
                <label>Sign out</label>
            </v-btn>
        </v-sheet>
    </page-container>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { useClassroom } from '@/composable/useClassroom'
import { routerPush } from '@/router/index'
import ClassroomToggle from '@/components/ClassroomToggle.vue'
import { CONFIG } from '@/config.js'
import { ref } from 'vue'

const { userData, signOut } = useUserStore()
const { classroom } = useClassroom()


const sheet = ref(false);


const exitUser = async function () {
    await signOut();
    return routerPush('/user-startup');
}


</script>