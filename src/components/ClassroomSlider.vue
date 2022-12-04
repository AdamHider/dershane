<template>
  <v-sheet class="text-center" v-if="user.active.data.id"  color="transparent">
    <swiper
      ref="classroomSlider"
      :modules="[Navigation, Pagination, Scrollbar, A11y]"
      :slides-per-view="1.3"
      :centeredSlides="true"
      :initialSlide="classroom.list.findIndex((classroom) => classroom.code == user.active.activeClassroom)"
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
    </swiper>
    <v-btn rounded="lg" @click="select()" :disabled="(activeItem.code == classroom.active.code)">
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
import { useClassroomStore } from '@/store/classroom'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { CONFIG } from '@/config.js'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const { user } = useUserStore()
const { classroom, getList, setActive } = useClassroomStore();
if(user.active.data.id){
  await getList();
}

const activeItem = ref({});
const classroomSlider = ref(null);
classroom.list.push({
  id: 0,
  code: '',
  title: 'Join classroom'
})

const select = async (index) => {
  if(index){
    activeItem.value = classroom.list[index];
    //classroomSlider.slideTo(index);
  }
  if(activeItem.value.id == 0) return routerPush('/classroom-join');
  await setActive(activeItem.value.code);
};

const onSwiper = (swiper) => {
  activeItem.value = classroom.list[swiper.activeIndex];
};
const onSlideChange = (swiper) => {
  activeItem.value = classroom.list[swiper.activeIndex];
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
  