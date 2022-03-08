<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuInfo.skuDefaultImg">
          </div>
          <div class="right-info">
            <p class="title">{{skuInfo.skuName}}</p>
            <p class="attr">{{skuInfo.skuDesc}} 数量：{{route.query.skuNum}}</p>
          </div>
        </div>
        <div class="right-gocart">
          <router-link class="sui-btn btn-xlarge" :to="`/detail/${skuInfo.id}`">查看商品详情</router-link>
          <router-link to="/cart">去购物车结算 </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { SkuInfo } from '../../store/detail/types';

const route = useRoute()
const skuInfo = computed<SkuInfo>(() => JSON.parse(sessionStorage.getItem('SKUINFO')!))

</script>

<style lang="less">
@import url('./index.less');
</style>