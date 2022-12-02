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
        <div v-if="user.active?.data.id">
            Welcome, dear user {{user.active?.data.name}}
            <div class="d-flex justify-center align-baseline" style="gap: 1rem">
                <v-btn rounded="lg" @click="signOut()">sign out</v-btn>
            </div>
        </div>
        <div v-else>
            <p>
            You are not logged in. You may just: 
            </p>
            <div class="d-flex justify-center align-baseline" style="gap: 1rem">
                <v-btn rounded="lg" to="/user-sign-in">sign in</v-btn> or <v-btn rounded="lg" to="/user-sign-up">sign up</v-btn> 
            </div>
        </div>
      </v-sheet>
      <v-dialog v-model="dialogOpened">
        <v-card >
            <v-card-title class="text-h5">
                Saved users
            </v-card-title>
            <v-list lines="two">
                <v-list-item
                    v-for="(userItem, index) in user.list" :key="index"
                    :title="userItem.data.name"
                    :subtitle="'Description'"
                >
                    <template v-slot:append>
                    <v-btn
                        :disabled="(userItem.data.id == user.active.data.id)"
                        icon="mdi-information"
                        variant="text"
                        @click="signIn(userItem.authorization); dialogOpened = false;"
                    >Sign In</v-btn>
                    </template>
                </v-list-item>
            </v-list>
            <v-card-actions>
            <v-btn color="primary" block @click="dialogOpened = false">Close Dialog</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
      <v-btn rounded="lg" @click="dialogOpened = true">Modal</v-btn>

    </page-container>
</template>

<script setup>
import { reactive, watch, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import { api  } from '@/services/'
import StudentSlider from '@/components/StudentSlider.vue'

const dialogOpened = ref(false);

const { signOut, signIn, user, isAuthorized } = useUserStore()


</script>