<template>
    <v-main>
      <v-container>
        <v-responsive class="d-flex align-center  fill-height">
          <slot/>
        </v-responsive>
      </v-container>
    </v-main>
    <BottomBar v-if="!noBottomBar"/>
</template>
<script>
  import BottomBar from '@/components/BottomBar.vue';
  
export default {
  props: {
    noBottomBar: false
  },
  components: {
    BottomBar
  }
};
</script>
