<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartInfo, index) in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked" @change="updateChecked(cartInfo.skuId, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cartInfo)">-</a>
            <input 
              autocomplete="off" 
              type="text" 
              :value="cartInfo.skuNum" 
              minnum="1" 
              class="itxt" 
              @change="handler('change', $event.target!['value'], cartInfo)"
            >
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuNum * cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cartInfo.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="checkAll&&length!==0" @change="changeCheckAll($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费）: </em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>  
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { CartInfoList, CartInfo } from '../../store/cart/types';
import { throttle1 } from '@/utils/throttle';

const store = useStore()

onMounted(() => {
  getData()
})

// 获取数据
const cartInfoList = computed<CartInfoList>(() => store.getters.cartInfoList)

let length = computed<number>(() => store.getters.cartInfoList.length)

// 计算购物车总价格
const totalPrice = computed(() => {
  let sum = 0;
  (cartInfoList.value as CartInfo[]).forEach((item: CartInfo) => {
    sum += item.skuPrice * item.skuNum
  })
  return sum
})

// 全选
const checkAll = computed(() => (cartInfoList.value as CartInfo[]).every((item: CartInfo) => item.isChecked == 1))

// 获取个人购物车列表
function getData() {
  store.dispatch('getCartList')
}

// 删除产品的操作
async function deleteCartById(id: number) {
  let res = await store.dispatch('deleteCartById', id)
  // 产出成功后发送新请求获取新数据
  if (res === 'deleted') {
    getData()
  } else {
    console.log(res)
  }
}

// 修改产品勾选状态
async function updateChecked(skuId: number, event:any) {
  // 带给服务器的参数不能是bool值
  // 派发action
  try {
    let isChecked = event.target.checked ? '1' : '0'
    await store.dispatch('updateCheckedById', {skuId, isChecked})
    // 获取数据
    getData()
  } catch (error) {
    console.log('update failed')
  }
}

// 全选/全部选状态修改
async function changeCheckAll(event: any) {
  try {
    let isCheckedAll = event.target.checked ? '1' : '0';
    // 派发action
    await store.dispatch('updateCheckAll', isCheckedAll)
    // 获取数据
    getData()
  } catch (error) {
    getData()
    console.log(error)
  }
}

// 删除选中的商品
async function deleteAllChecked() {
  try {
    await store.dispatch('deleteAllChecked')
    getData()
  } catch (error) {
    console.log(error)
  }
}

// 修改购物车产品个数, 并使用节流操作
const handler = throttle1(async function (type: string, disNum: number, cartItem: CartInfo) {
  // type：区分三个元素
  // disNum：+变化1，-变化 -1，input最终的个数 
  switch (type) {
    case 'add':
      disNum = 1
      break;
    case 'minus':
      // 产品个数小于等于一，传递给服务器的个数变化就为0
      disNum = cartItem.skuNum > 1 ? -1 : 0
      break
    case 'change':
      if (isNaN(disNum) || disNum < 1) {
        disNum = 0
      } else {
        disNum = Math.floor(disNum) - cartItem.skuNum
      }
      break
  }
  // 派发action
  try {
    await store.dispatch('addOrUpdateCart', {skuId: cartItem.skuId, skuNum: disNum})
    // 再次获取数据
    getData()
  } catch (error) {
    console.log(error)
  }
}, 200)

</script>

<style lang="less">
@import url('./index.less');
</style>
