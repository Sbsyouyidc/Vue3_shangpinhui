<template>
  <div class="paysuccess">

    <div class="success">
      <h3>
        <img src="./images/right.png" width="48" height="48">
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center">查看订单</router-link>
          <router-link class="btn-goshop" to="/">继续购物</router-link>
        </p>
      </div>
    </div>

  </div>
</template>


<script lang="ts" setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';


// const Router = useRouter()
// const Route = useRoute()

// onBeforeRouteUpdate((to, from) => {
//   if (from.path === '/pay') {
//     next()
//   } else {
//     next(false)
//   }
// })

// onBeforeRouteLeave((to, from) => {

// })

</script>

<style lang="less" scoped>
@import url('./index.less');
</style>