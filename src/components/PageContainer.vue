<template>
    <main-header :page-title="pageTitle"/>
    <v-main>
      <v-container>
        <slot/>
      </v-container>
    </v-main>
</template>

<script>

export default {
  props: [
    'pageTitle'
  ],
};
</script>