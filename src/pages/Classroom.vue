<template>
    <page-container :page-config="PageConfig" >
        <v-img contain height="300" src="src/assets/logo.svg"/>

        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

        <h1 class="text-h2 font-weight-bold">Classroom</h1>
    </page-container>
</template>

<script>
const PageConfig = {
    title: 'Classroom',
    header:{
        class: "transparent",
        left: {
            icon: 'mdi-account-convert-outline',
            action: () => { $router.push({ path: '/student-startup' }); }
        },
        right: {
            icon: 'mdi-dots-vertical',
            action: () => {}
        }
    }
};
export default {
  props: [
    'pageTitle'
  ],
  setup() {
    return {
      PageConfig
    }
  },
};
</script>