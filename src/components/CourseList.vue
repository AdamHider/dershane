<template>
    <v-container fluid>
        <v-row dense>
            <v-col
                v-for="(course, index) in courses.list"
                :key="index"
                cols="12"
                >
                <v-card :to="'/lessons-'+course.id" :image="'http://localhost:777/dershane/assets'+course.image">
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


<script setup>
import { useCourses } from '@/composable/useCourses.js'

const { courses, getList } = useCourses();
getList();





</script>