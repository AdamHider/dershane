<template>
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :centeredSlides="true"
      navigation
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide>
                <v-img
                contain
                height="300"
                src="src/assets/logo.svg"
                /></swiper-slide>
      <swiper-slide>
                <v-img
                contain
                height="300"
                src="src/assets/logo.svg"
                /></swiper-slide>
      <swiper-slide>
                <v-img
                contain
                height="300"
                src="src/assets/logo.svg"
                /></swiper-slide>
      ...
    </swiper>
  </template>
  <script>
    // import Swiper core and required modules
    import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
  
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';
  
    // Import Swiper styles
    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      setup() {
        const onSwiper = (swiper) => {
          console.log(swiper);
        };
        const onSlideChange = () => {
          console.log('slide change');
        };
        return {
          onSwiper,
          onSlideChange,
          modules: [Navigation, Pagination, Scrollbar, A11y],
        };
      },
    };
  </script>
  