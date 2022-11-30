<template>
  <page-container no-bottom-bar="true">
  </page-container>
</template>

<script setup >
import { routerPush } from '@/router/index'
import { useUserStore } from '@/store/user'
import { reactive, ref } from 'vue'
import { useRoute } from "vue-router";

const { activate } = useUserStore()
const errors = ref()

const route = useRoute();
const activation_code = route.params.activation_code;

if( activation_code && activation_code.length > 30 ){
  (async () => {
    const activated = await activate({activation: activation_code});
    if (activated) {
      routerPush('/student-startup')
    } else {
      console.log(activated)
    }
  })()
} else {
  routerPush('/student-startup')
}


</script>