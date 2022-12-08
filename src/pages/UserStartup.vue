<template  withBackground="true">
    <v-app-bar color="transparent" density="compact" class="text-white" elevation="0">
        <template v-slot:prepend>
            <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
        </template>
        <v-app-bar-title></v-app-bar-title>
    </v-app-bar>
    <page-container no-bottom-bar="true" container-class="pa-0" align="center">
      <PageHeader v-if="user.active?.data.id" title="User Dashboard" subtitle="Choose your classroom" text-color="white"/>
      <Suspense v-if="user.active?.data.id">
        <ClassroomSlider 
            slidesPerView="1.3"
            centerAligned="true"
            withButton="true"
            slideHeight="300"/>
      </Suspense>
      <v-sheet color="transparent" class="text-center pa-4">
        <div v-if="user.active?.data.id" class="d-flex flex-no-wrap justify-space-between align-center">
            <h4 class="text-white">{{user.active?.data.name}}</h4>
            <v-btn variant="text" @click="signOut()" color="white">Sign out</v-btn>
        </div>
        <div v-else>
            <h4 class="mt-2 mb-2 text-white" >
            You are not logged in. You may just: 
            </h4>
            <div class="d-flex justify-center align-baseline">
                <v-btn variant="text" color="white" to="/user-sign-in">sign in</v-btn> 
                <b class="text-white">or</b> 
                <v-btn variant="text" color="white" to="/user-sign-up">sign up</v-btn> 
            </div>
        </div>
        <v-divider v-if="(Object.keys(user.list).length > 0)" color="white" class="mt-2 mb-2"></v-divider>
        <v-btn v-if="(Object.keys(user.list).length > 0)" variant="text" color="white" rounded="lg" @click="dialogOpened=true">Choose existing accounts</v-btn>
      </v-sheet>
      <v-dialog v-model="dialogOpened">
        <v-card>
            <v-card-title class="text-h5">
                Saved users
            </v-card-title>
            <v-list lines="two">
                <v-list-item
                    v-for="(userItem, index) in user.list" :key="index"
                    :title="userItem.data?.name"
                    :subtitle="'Description'"
                >
                    <template v-slot:append>
                    <v-btn
                        :disabled="(userItem.data?.id == user.active.data.id)"
                        icon="mdi-information"
                        variant="text"
                        :loading="btnLoading[index]"
                        @click="switchUser(userItem, index)"
                    >Sign In</v-btn>
                    </template>
                </v-list-item>
            </v-list>
            <v-card-actions>
            <v-btn color="primary" block @click="dialogOpened = false">Close Dialog</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import ClassroomSlider from '@/components/ClassroomSlider.vue'
import PageHeader from '@/components/PageHeader.vue'
import { routerPush } from '@/router/index'

const dialogOpened = ref(false);
const btnLoading = ref([]);
const switchUser = async (userItem, key) => {
    btnLoading.value[key] = true;
    await signIn(userItem.authorization, userItem.activeClassroom); 
    btnLoading.value[key] = false;
    dialogOpened.value = false;
    return routerPush('/user-dashboard');
}

const { signOut, signIn, user, isAuthorized } = useUserStore()


</script>