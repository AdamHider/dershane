<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :centeredSlides="true"
    navigation
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(studentItem, index) in classroomList" :key="index">
              <v-img
              contain
              height="300"
              src="src/assets/logo.svg"
              />
            <h4>{{studentItem.data.name}}</h4>
            </swiper-slide>
    ...
  </swiper>
  <v-btn  to="/student-sign-up-new">Add student</v-btn>
  <v-btn  to="/student-sign-up-existing">Signin student</v-btn>
</template>
<script setup>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const classroomList = [];

const onSwiper = (swiper) => {};
const onSlideChange = () => {};
</script>
  