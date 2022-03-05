<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="50"
          :speed="500"
          navigation
          :pagination="{ clickable: true }"
          :loop="true"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
        >
          <swiper-slide v-for="(carousel) in bannerList" :key="carousel.id">
            <img :src="carousel.imgUrl" alt="" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li v-for="(text, index) in text2" :key="index">
              <span class="bold">[{{text}}]</span>备战开学季 全民半价购数码
            </li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item" v-for="(item, index) in text1" :key="index">
            <i class="list-item"></i>
            <span class="service-intro">{{item}}</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue/swiper-vue.js'
// import Swiper from 'swiper/swiper-bundle.min.js'
// import { SwiperOptions } from 'swiper'


const store = useStore()

const bannerList = computed<Array<any>>(() => store.state.home.bannerList)

onMounted(async () => {
  store.dispatch('getBannerList')
})

const modules = [Navigation, Pagination, A11y, Autoplay]

const text1 = ['话费','机票','电影票','游戏','彩票','加油站','酒店','火车票','众筹','理财','礼品卡','白条']
const text2 = ['特惠', '公告', '特惠', '公告', '特惠']

//#region 
// const swiperParams: typeof SwiperOptions = {
//   observer: true,
//   slidesPerView: 1,
//   spaceBetween: 50,
//   loop: true,
//   speed: 500,
//   modules,
//   autoplay: {
//     disableOnInteraction: false,
//     delay: 2000,
//     pauseOnMouseEnter: true
//   },
//   pagination: {
//     el: '.swiper-pagination',
//   },

//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// }

// // 使用watch监听bannerList变化
// watch(bannerList, async (newValue, oldValue) => {
//   await nextTick()
//   new Swiper('.swiper', swiperParams)
// }, { deep: true })
//#endregion

</script>

<style lang="less" scoped>
@import url("./index.less");
</style>