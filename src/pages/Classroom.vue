<template>
  <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
          <v-btn icon="mdi-account-convert-outline" to="/student-startup"></v-btn>
      </template>
      <v-app-bar-title>Classroom</v-app-bar-title>
      <template v-slot:append >
          <v-btn icon="mdi-trophy-variant-outline" to=""></v-btn>
      </template>
  </v-app-bar>
    <page-container>
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">Classroom</h1>
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