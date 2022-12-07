<template>
  <v-sheet class="text-center" v-if="user.active.data.id"  color="transparent">
    <swiper
      ref="classroomSlider"
      :modules="[Navigation, Pagination, Scrollbar, A11y]"
      :slides-per-view="1.3"
      :centeredSlides="true"
      :initialSlide="classroom.list.findIndex((classroom) => classroom.code == user.active.authorization.classroom_code)"
      navigation
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(classroomItem, index) in classroom.list" :key="index" :class="'text-center'" @click="select(index)">
        <v-card class="ma-3">
          <v-img class="align-end text-white  pa-3" cover height="300" :src="(CONFIG.API_HOST+classroomItem.fulltext_image)">
            <v-card-title>{{classroomItem.title}}</v-card-title>
            <v-card-subtitle class="pt-4">{{classroomItem.code}}</v-card-subtitle>
          </v-img>
        </v-card>
      </swiper-slide>
      <swiper-slide :class="'text-center'" @click="select(false)">
        <v-card class="ma-3">
          <v-img class="align-end text-white  pa-3" cover height="300" >
            <v-card-title>{{joinSlide.title}}</v-card-title>
            <v-card-subtitle class="pt-4">{{joinSlide.code}}</v-card-subtitle>
          </v-img>
        </v-card>
      </swiper-slide>
    </swiper>
    <v-btn rounded="lg" @click="select()" :disabled="(activeItem.code == user.active.authorization.classroom_code)">
      <template v-if="(activeItem.id !== 0)">
        Enter {{activeItem.title}}
      </template>
      <template v-else>
        {{activeItem.title}}
      </template>
    </v-btn>
  </v-sheet>
</template>
<script setup>
import { routerPush, router } from '@/router/index'
import { ref } from 'vue';
import { useUserStore } from '@/store/user'
import { useClassroom } from '@/composable/useClassroom'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { CONFIG } from '@/config.js'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const { setActiveClassroom, user, signOut, signIn } = useUserStore()
const { classroom, getList } = useClassroom();
if(user.active.data.id){
  await getList();
}

const activeItem = ref({});
const classroomSlider = ref(null);
const joinSlide = {
  id: 0,
  code: '',
  title: 'Join classroom'
}

const select = async (index) => {
  if(index !== false){
    activeItem.value = classroom.list[index];
    //classroomSlider.slideTo(index);
  } else {
    return routerPush('/classroom-join');
  }
  if(activeItem.value.code == user.active.authorization.classroom_code){
    return false;
  }
  const auth = {
    username: user.active.authorization.username,
    password: user.active.authorization.password,
    classroom_code: activeItem.value.code
  };
  await signIn(auth);
  return routerPush('/user-dashboard');
};

const onSwiper = (swiper) => {
  console.log('swiper')
  if(classroom.list[swiper.activeIndex]){
    activeItem.value = classroom.list[swiper.activeIndex];
  } else {
    activeItem.value = joinSlide;
  }
};
const onSlideChange = (swiper) => {
  if(classroom.list[swiper.activeIndex]){
    activeItem.value = classroom.list[swiper.activeIndex];
  } else {
    activeItem.value = joinSlide;
  }
};

</script>

<style>
.swiper-slide {
  transition: 0.5s all ease;
}
.swiper-slide:not(.swiper-slide-active) {
  filter: grayscale(0.8) opacity(0.5);
}
</style>
  