<template>
  <swiper
    class="swiper"
    :modules="modules"
    :slides-per-view="3"
    :slides-per-group="1"
    :space-between="50"
    :speed="500"
    navigation
  >
    <swiper-slide 
      class="swiper-slide" 
      v-for="(skuImage, index) in skuImageList" 
      :key="skuImage.id"
    >
      <img 
        :src="skuImage.imgUrl" 
        alt="" 
        :class="{active: currentIndex===index}"
        @click="changeCurrentIndex(index)"
      >
    </swiper-slide>
  </swiper>
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance } from 'vue';
import { Navigation, A11y } from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue/swiper-vue.js'
// import "swiper/swiper-bundle.min.css"
import { SkuImage } from '@/store/detail/types';

const modules = [Navigation, A11y]

const emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter

// 默认选中的图片
let currentIndex = ref(0)

const props = defineProps<{
  skuImageList: Array<SkuImage>,
}>()

function changeCurrentIndex(index: number) {
  currentIndex.value = index
  emitter.emit('currentIndex', index)
}

</script>

<style lang="less" scoped>
.swiper {
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
      cursor: pointer;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  // 使用/deep/来对less scoped 进行穿透

:deep(.swiper-button-next) {
    left: auto;
    right: 10px;
  }

  :deep(.swiper-button-prev) {
    left: 0;
    right: auto;
  }

  :deep(.swiper-button-next, .swiper-button-prev) {
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