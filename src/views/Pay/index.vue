<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{Id}}</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{paymentInfo.totalFee}}</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.png"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" to="/paysuccess" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus'
import type { Action } from 'element-plus'
import QRCode from 'qrcode'

const route = useRoute()
const router = useRouter()

let timer: NodeJS.Timer | null = null
let code = ref(0)

// 订单号
const Id = computed(() => route.query.orderId)

const API = getCurrentInstance()?.appContext.config.globalProperties.$API

interface PaymentInfo {
  totalFee: number
  orderId: number
  codeUrl: string
  resultCode: string
}

const paymentInfo: PaymentInfo = reactive({
  totalFee: 0,
  orderId: 0,
  codeUrl: '',
  resultCode: ''
})

// 发送请求，获取支付信息
onMounted(() => {
  getPayment((Id.value as string))
})

async function getPayment(Id: string) {
  let res = await API.reqPayment(Id)
  if (res.code === 200) {
    paymentInfo.codeUrl = res.data.codeUrl
    paymentInfo.orderId = res.data.orderId
    paymentInfo.totalFee = res.data.totalFee
    paymentInfo.resultCode = res.data.resultCode
  }
}

// elment-ui弹出框与遮罩层
async function open() {
  // 获得二维码地址
  let url = await QRCode.toDataURL(paymentInfo.codeUrl)
  ElMessageBox.alert(`<img src=${url} />`, '微信支付', {
    confirmButtonText: '确认支付',
    cancelButtonText: '支付遇到问题',
    showCancelButton: true,
    // 确认使用HTML元素
    dangerouslyUseHTMLString: true,
    // 不显示右上角关闭按钮
    showClose: false,
    center: true,
    beforeClose: (action, instance, done) => {
      if (action === 'cancel') {
        alert('请联系管理员')
        clearInterval(Number(timer))
        timer = null
        done()
      } else {
        // if (code.value === 200) {
          clearInterval(Number(timer))
          timer = null
          done()
          router.push('/paySuccess')
        // }
      }
    },
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    }
  })
  // 支付成功，跳转路由
  // 支付失败，提示信息
  // 没有定时器开启一个新的定时器
  if (!timer) {
    timer = setInterval(async () => {
      // 发送请求，获取用户支付状况
      let res = await API.reqPayStatus(Id.value)
      if (res.code === 200) {
        // 第一步：清除定时器
        clearInterval(Number(timer))
        // 保存支付返回的code
        code.value = res.code
        // 隐藏弹窗
        ElMessageBox.close()
        // 跳转下一路由 /paysuccess
        router.push('/paySuccess')
      }
    }, 1000)
  }
}

</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
