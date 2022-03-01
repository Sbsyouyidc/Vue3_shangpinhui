<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没有用户名：未登录 -->
          <p>
            <span>请</span>
            <!-- 声明式导航：router-link务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 登录了 -->
          <p>
            <a>username</a>
            <a class="register">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- router-link组件本省就是一个a标签 -->
        <router-link to="/home" class="logo">
          <img src="./images/logo.png" alt="#" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input 
            type="text" 
            id="autocomplete" 
            class="input-error input-xxlarge" 
            v-model="keyword"
          />
          <button 
            class="sui-btn btn-xlarge btn-danger" 
            type="button" 
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router';

// 引入路由
const router = useRouter()
const route = useRoute()

const emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter

// 搜索框内的关键字
const keyword = ref<string>('')

// 跳转搜索函数
function goSearch(): void {
  // 路由传参
  // 模板字符串形式
  // if (keyword.value !== '') {
  //   router.push(`/search/${keyword.value}` + `?k=${keyword.value.toUpperCase()}`)
  // }
  // 对象写法
  if (route.query) {
    router.push({
      name: 'Search',
      params: {keyword: keyword.value},
      query: route.query
    })
  }
}

// 监听Search中的事件，清除input框的值
emitter.on('clearInput', () => {
  keyword.value = ''
})

</script>

<style lang="less" scoped>
@import url("./index.less");
</style>