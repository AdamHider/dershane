<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :centeredSlides="true"
    navigation
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(studentItem, index) in student.list" :key="index">
              <v-img
              contain
              height="300"
              src="src/assets/logo.svg"
              />
            <h4>{{studentItem.data.name}}</h4>
            </swiper-slide>
    ...
  </swiper>
  <v-btn  to="/classroom-join">Join Classroom</v-btn>
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

import { useStudentStore } from '@/store/student'

  // Import Swiper styles
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const { student } = useStudentStore()
      const onSwiper = (swiper) => {
      };
      const onSlideChange = () => {
      };
      return {
        student,
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar, A11y],
      };
    },
  };
</script>
  