<template>
    <v-snackbar
      v-model="message.visible"
      :timeout="message.timeout"
    >
      {{ message.text }}
      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="message.visible = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script setup>
import { message } from '@/composable/useAppMessage'


</script>