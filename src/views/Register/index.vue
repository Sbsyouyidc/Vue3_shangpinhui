<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content" :class="{ error: v$.phone.$errors.length }">
        <label>手机号:</label>
        <input name="phone" type="text" placeholder="请输入你的手机号" v-model="phone">
        <div class="error-msg" v-for="error of v$.phone.$errors" :key="error.$uid"><span>{{error.$message}}</span></div>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <button style="width: 100px; height: 38px;" @click="getCode">获取验证码</button>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="passwordConfirm">
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'

const user = reactive({
  phone: '',
  code: '',
  password: '',
  passwordConfirm: '',
  agree: true
})

const min = ref(6)

const rules: any = computed(() => ({
  phone: {
    required: required,
    minLength: minLength(min.value)
  },
  code: {required},
  password: {required},
  passwordConfirm: {required},
  agree: {required}
}))

const v$ = useVuelidate(rules, user)

const router = useRouter()

const {phone, code, password, passwordConfirm, agree} = toRefs(user)

const store = useStore()

async function getCode() {
  try {
    user.phone !== '' && await store.dispatch('getCode', user.phone)
    user.code = store.state.user.code
  } catch (error) {}
}

async function userRegister() {
  try {
    await store.dispatch('register', {phone: phone.value, code: code.value, password: password.value})
    router.push('/login')
  } catch (error) {
    console.log(error)
  }
}

</script>

<style lang="less" scoped>
@import url('./index.less');
</style>