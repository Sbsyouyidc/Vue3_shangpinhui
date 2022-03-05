<template>
  <swiper
    class="swiper-container"
    :modules="modules"
    :slides-per-view="3"
    :space-between="50"
    :speed="500"
    navigation
  >
    <swiper-slide class="swiper-slide">
      <img :src="currentImage" alt="">
    </swiper-slide>
  </swiper>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { Navigation, A11y } from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue/swiper-vue.js'
// import "swiper/swiper-bundle.min.css"
import { SkuImage } from '@/store/detail/types';

const modules = [Navigation, A11y]

const props = defineProps<{
  skuImageList: Array<SkuImage>,
  currentIndex: number
}>()

let currentImage = computed(() => {
  return props.skuImageList[props.currentIndex]?.imgUrl || ''
})


</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>