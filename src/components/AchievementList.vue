<template>
    <v-container fluid>
        <v-row dense>
            <v-col
                v-for="(achievement, index) in achievements.list"
                :key="index"
                cols="12"
                >
                <v-card rounded="lg" density="comfortable">
                    <div class="d-flex flex-no-wrap justify-left align-center">
                        <v-avatar
                            class="ma-3"
                            size="100"
                            rounded="0"
                        >
                            <v-img :src="`/src/${achievement.image}`"></v-img>
                        </v-avatar>
                        <v-container fluid>
                            <v-card-title class="pa-0 text-subtitle-1">{{achievement.description.title.ru}}</v-card-title>
                            <v-card-subtitle class="px-0 pt-2">{{achievement.description.description.ru}}</v-card-subtitle>
                            <v-card-text class="pa-0">
                                <v-sheet color="transparent">
                                    <v-container class="pt-2 pb-2">
                                        <v-row>
                                            <v-col cols="6" class="pl-0 pr-0 text-left"></v-col>
                                            <v-col cols="6" class="pl-0 pr-0 text-right">
                                                <b>{{achievement.achievement_progress.current_progress}}/{{achievement.achievement_progress.target_progress}}</b>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <v-progress-linear 
                                        color="primary"
                                        :model-value="achievement.achievement_progress.percentage" 
                                        :height="20" 
                                        rounded="lg"
                                    ></v-progress-linear>
                                </v-sheet>
                            </v-card-text>
                        </v-container>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import { useAchievement } from '@/composable/useAchievement'
import { CONFIG } from '@/config.js'
import { onMounted, onActivated, onDeactivated} from "vue"

const { achievements, getList } = useAchievement()


onActivated(() => {
    console.log('empty');
    getList();
});




</script>