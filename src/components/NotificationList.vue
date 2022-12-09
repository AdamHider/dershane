<template>
    <v-container fluid>
        <v-row dense>
            <v-col
                v-for="(notification, index) in notifications.list"
                :key="index"
                cols="12"
                >
                <v-card :image="`/src/${notification.image}`">
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
import { useNotification } from '@/composable/useNotification'
import { CONFIG } from '@/config.js'

const { notifications, getList } = useNotification()
getList();





</script>