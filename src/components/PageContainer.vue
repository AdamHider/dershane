<template>
    <v-main>
      <v-container>
        <v-container class="fill-height">
            <v-responsive class="d-flex align-center text-center fill-height">
              <slot/>
            </v-responsive>
        </v-container>
      </v-container>
    </v-main>
</template>

<script>
export default {
  props: [
    'pageConfig'
  ],
};
</script>