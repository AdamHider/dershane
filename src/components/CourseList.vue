<template>
    <v-container fluid>
        <v-row dense>
            <v-col
                v-for="(course, index) in globalState.courses"
                :key="index"
                cols="12"
                >
                <v-card :to="'/lessons#category_id='+course.id">
                    <v-img
                        :src="'http://localhost:777/dershane/assets'+course.image"
                        class="align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                        cover
                        >
                        <v-card-title class="text-white" v-text="course.title"></v-card-title>
                    </v-img>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

                        <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

                        <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script >
import { useCourses } from '@/composable/useCourses.js'
import { ref, onMounted } from 'vue'

export default {
    setup(){
        const { globalState, fetchCourses } = 
            useCourses();
        fetchCourses();
        return {
        globalState
        }
    }
}





</script>