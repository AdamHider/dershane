<template>
    <v-container fluid>
        <v-row dense>
            <v-col
                v-for="(lesson, index) in lessons.list"
                :key="index"
                cols="12"
                >
                <v-card :to="'/lesson_start#id='+lesson.id" :image="'http://localhost:777/dershane/assets'+lesson.image">
                    

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
import { useLessons } from '@/composable/useLessons.js'
import { ref, onMounted } from 'vue'

const { lessons, getList } = useLessons();
getList();





</script>