<template>
    <v-app-bar color="primary" density="compact">
        <template v-slot:prepend>
            <v-btn icon="mdi-account-convert-outline" to="/student-startup"></v-btn>
        </template>
        <v-app-bar-title>Home</v-app-bar-title>
        <template v-slot:append >
            <v-btn icon="mdi-calendar-check-outline" to=""></v-btn>
            <v-btn icon="mdi-trophy-variant-outline" to=""></v-btn>
        </template>
    </v-app-bar>
    <page-container>
        <v-img contain height="300" src="src/assets/logo.svg"/>
        <Suspense>
            <CoursesList/>
        </Suspense>
    </page-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import CoursesList from '@/components/CourseList.vue'


export default {
  components: {
    CoursesList
  }
};
</script>
