<template  withBackground="true">
    <v-menu
        :close-on-content-click="false"
        location="bottom" origin="auto"
        transition="slide-y-transition"
        >
            <template v-slot:activator="{ props }">
                <v-chip 
                    class="ma-2  pl-0" 
                    color="white" 
                    v-bind="props" 
                    label  
                    variant="text"
                     size="large"
                >
                    <v-avatar class="mr-2">
                        <v-img
                            :src="`${CONFIG.API_HOST}${classroom.active?.introimage}`"
                            alt="John"
                            cover
                        ></v-img>
                    </v-avatar>
                    <b>{{classroom.active?.title}}</b>
                    <v-icon end icon="mdi-swap-horizontal"></v-icon>
                </v-chip>
            </template>
        <v-sheet class="text-center rounded-xl pt-4 pb-4">
            <h4>Choose your classroom</h4>
            <ClassroomSlider 
                :slidesPerView=1.5
                :centerAligned="false"
                :withButton="false"
                slideHeight="100"
                :navigation="false"/>
        </v-sheet>
    </v-menu>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { useClassroom } from '@/composable/useClassroom'
import ClassroomSlider from '@/components/ClassroomSlider.vue'
import { CONFIG } from '@/config.js'

const { user, signOut } = useUserStore();
const { classroom } = useClassroom();


</script>