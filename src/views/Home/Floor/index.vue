<template>
  <div class="floor">
    <div class="py-container">
        <div class="title clearfix">
            <h3 class="fl">{{list.name}}</h3>
            <div class="fr">
                <ul class="nav-tabs clearfix">
                    <li class="active" v-for="(nav) in list.navList">
                        <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tab-content">
            <div class="tab-pane">
                <div class="floor-1">
                    <div class="blockgary">
                        <ul class="jd-list">
                            <li v-for="(keyword) in list.keywords">{{keyword}}</li>
                        </ul>
                        <img :src="list.imgUrl" />
                    </div>
                    <div class="floorBanner">
                      <swiper
                        :modules="modules"
                        :loop="true"
                        :autoplay="{
                          delay: 3000,
                          disableOnInteraction: false,
                          pauseOnMouseEnter: true
                        }"
                      >
                        <swiper-slide v-for="(carousel) in list.carouselList" :key="carousel.id">
                          <img :src="carousel.imgUrl" alt="">
                        </swiper-slide>
                      </swiper>
                    </div>
                    <div class="split">
                        <span class="floor-x-line"></span>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[0]" />
                        </div>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[1]" />
                        </div>
                    </div>
                    <div class="split center">
                        <img :src="list.bigImg" />
                    </div>
                    <div class="split">
                        <span class="floor-x-line"></span>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[2]" />
                        </div>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[3]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import {Swiper, SwiperSlide} from 'swiper/vue/swiper-vue.js'
import { Autoplay, Navigation, Pagination } from 'swiper';

interface carousel {
  id: string,
  imgUrl: string
}

interface nav {
  text: string,
  url: string
}

interface List {
  bigImg: string,
  carouselList: Array<carousel>,
  id: string,
  imgUrl: string,
  keywords: string[],
  name: string,
  navList: Array<nav>,
  recommendList: string[]
}

const modules = [Autoplay, Navigation, Pagination]

const props = defineProps<{
  list: List
}>()
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
