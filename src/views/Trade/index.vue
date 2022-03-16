<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix" v-for="(address, index) in addressList" :key="address.id">
        <span class="username" :class="{selected: address.isDefault === '1'}">{{address.consignee}}</span>
        <p @click="changeDefault(address)">
          <span class="s1">{{address.fullAddress}}</span>
          <span class="s2">{{address.phoneNum}}</span>
          <span class="s3" v-show="address.isDefault === '1'">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="(item, index) in order.detailArrayList" :key="item.skuId">
          <li>
            <img :src="item.imgUrl" alt="" style="height:100px;width:100px">
          </li>
          <li>
            <p>{{item.skuName}}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{item.orderPrice}}</h3>
          </li>
          <li>X{{item.skuNum}}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="message"></textarea>

      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{order.totalNum}}</i>件商品，总商品金额</b>
          <span>¥{{order.totalAmount}}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:　<span>¥{{order.totalAmount}}</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{defaultAddress?.fullAddress}}</span>
        收货人：<span>{{defaultAddress.consignee}}</span>
        <span>{{defaultAddress.phoneNum}}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Address, Order } from '@/store/trade/types' 
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const API = getCurrentInstance()?.appContext.config.globalProperties.$API

// 留言信息
let message = ref('')

// 订单号
let orderId = ref('')

onMounted(() => {
  store.dispatch('getUserAddress')
  store.dispatch('getOrderInfo')
})

const addressList = computed<Array<Address>>(() => store.state.trade.address)
const order = computed<Order>(() => store.state.trade.order)

// 将来提交订单的默认选中地址
const defaultAddress = computed(() => {
  return addressList.value.find((item: Address) => item.isDefault == '1') || {}
})

// 改变默认地址
function changeDefault(address: Address) {
  // 全部的isDefault为0
  addressList.value.forEach((item: Address) => item.isDefault = '0')
  address.isDefault = '1'
}

// 提交订单
async function submitOrder() {
  let tradeNo = order.value.tradeNo!
  let data = {
    "consignee": defaultAddress.value.consignee, // 收件人名字
    "consigneeTel": defaultAddress.value.phoneNum, // 收件人手机号
    "deliveryAddress": defaultAddress.value.fullAddress, // 收件人地址
    "paymentWay": "ONLINE", // 收件人付款方式
    "orderComment": message.value, // 留言信息
    "orderDetailList": order.value.detailArrayList // 商品清单
  }
  let res = await API.reqSubmit(tradeNo, data)
  // 提交成功
  if (res.code === 200) {
    orderId.value = res.data
    // 跳到支付页面
    router.push('/pay?orderId='+orderId.value)
  } else {
    // 提交订单失败
    alert(res.message)
  }
}

</script>

<style lang="less" scoped>
@import url('./index.less');
</style>