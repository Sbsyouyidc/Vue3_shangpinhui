<template>
  <Header/>
  <router-link to="/home"></router-link>
  <router-view></router-view>
  <Footer v-show="route.meta.show"/>
</template>

<script lang="ts" setup>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
// 引入路由实例
const route = useRoute()

</script>

<style>

</style>
