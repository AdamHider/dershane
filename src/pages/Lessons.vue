<template>
    <v-app-bar color="primary" density="compact">
        <template v-slot:prepend>
            <v-btn icon="mdi-arrow-left" v-on:click="$router.go(-1);"></v-btn>
        </template>
        <v-app-bar-title>Lessons</v-app-bar-title>
        <template v-slot:append >
            <v-btn icon="mdi-calendar-check-outline" to=""></v-btn>
            <v-btn icon="mdi-trophy-variant-outline" to=""></v-btn>
        </template>
    </v-app-bar>
    <page-container>
        <LessonList/>
    </page-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import LessonList from '@/components/LessonList.vue'


export default {
  components: {
    LessonList
  }
};
</script>
