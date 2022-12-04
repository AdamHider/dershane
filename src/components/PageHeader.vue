<template>
    <div :class="`ma-4 text-center text-${textColor}`">
        <h2 class="mb-2">{{title}}</h2>
        <h4 class="mt-2">{{subtitle}}</h4>
    </div>
</template>

<script >
export default {
  props: {
    title: '',
    subtitle: '',
    textColor: ''
  }
};
</script>
