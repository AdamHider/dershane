<template>
  <v-sheet class="text-center" v-if="user.active.data.id"  color="transparent">
    <swiper
      ref="classroomSlider"
      :modules="[Navigation, Pagination, Scrollbar, A11y]"
      :slides-per-view="props.slidesPerView"
      :centeredSlides="props.centerAligned"
      :initialSlide="classroom.list.findIndex((classroom) => classroom.code == user.active.authorization.classroom_code)"
      :navigation="props.navigation"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(classroomItem, index) in classroom.list" :key="index" :class="'text-center'" @click="select(index)">
        <v-card class="ma-3">
          <v-img class="align-end text-white pa-3" cover :src="(CONFIG.API_HOST+classroomItem.fulltext_image)" :height="props.slideHeight">
            <v-card-title>{{classroomItem.title}}</v-card-title>
            <v-card-subtitle class="pt-4">{{classroomItem.code}}</v-card-subtitle>
          </v-img>
        </v-card>
      </swiper-slide>
      <swiper-slide :class="'text-center'" @click="select(false)">
        <v-card class="ma-3">
          <v-img class="align-center pa-3" cover :width="(props.slideHeight*2)" :height="props.slideHeight">
            <v-icon icon="mdi-plus" size="x-large"></v-icon>
          </v-img>
        </v-card>
      </swiper-slide>
    </swiper>
    <v-btn v-if="props.withButton" rounded="lg" @click="select()" :disabled="(activeItem.code == user.active.authorization.classroom_code)">
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

const props = defineProps({
    slidesPerView: Number,
    centerAligned: Boolean,
    withButton: Boolean,
    slideHeight: String,
    navigation: Boolean
  });
const { setActiveClassroom, user, signOut, signIn } = useUserStore()
const { classroom, getList } = useClassroom();
console.log(classroom.list);
if(user.active.data.id){
  getList();
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
  