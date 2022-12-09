<template>
  <v-main :style="`z-index: 0; background: ${background}`">
    <v-container :class="`fill-height ${containerClass}`">
      <v-responsive :class="`d-flex align-${align} fill-height`">
        <slot/>
      </v-responsive>
    </v-container>
    <BottomBar v-if="!noBottomBar"/>
  </v-main>
</template>

<script>
import BottomBar from '@/components/BottomBar.vue';
  
export default {
  props: {
    noBottomBar: false,
    align: 'start',
    containerClass: '',
    background: ''
  },
  components: {
    BottomBar,
  }
};
</script>
