import request from "./request";
import request_mock from "./request_mock";

// 三级联动接口
export function reqCategoryList() {
  return request({
    url: '/product/getBaseCategoryList'
  })
}

// 轮播图接口
export function reqGetBannerList() {
  return request_mock({
    url: '/banner'
  })
}

export function reqFloorList() {
  return request_mock({
    url: '/floor'
  })
}

export function reqGetSearchInfo(data: Object = {}) {
  return request({
    url: '/list',
    data
  }, 'post')
}

// 详情接口
export function reqGoodDetail(skuId: string) {
  return request({
    url: `/item/${skuId}`
  })
}

// 将产品添加到购物车中，或者更新某个产品的个数
export function reqAddOrUpdateCart(skuId: string, skuNum: string) {
  return request({
    url: `/cart/addToCart/${skuId}/${skuNum}`
  }, 'post')
}

// 获取购物车列表接口
export function reqCartList() {
  return request({
    url: '/cart/cartList'
  })
}

// 删除购物车产品接口
export function reqDeleteCartById(skuId: string) {
  return request({
    url: `/cart/deleteCart/${skuId}`
  }, 'delete')
}

// 更新选中状态
export function reqUpdateCheckedById(skuId: string, isChecked: boolean) {
  return request({
    url: `/cart/checkCart/${skuId}/${isChecked}`
  })
}

// 获取验证码
export function reqGetCode(phone: string) {
  return request({
    url: `user/passport/sendCode/${phone}`
  })
}

// 注册
export function reqRegister(phone: string, code: string, password: string) {
  return request({
    url: '/user/passport/register',
    data: {
      phone,
      code,
      password
    }
  }, 'post')
}

// 登录
export function reqLogin(phone: string, password: string) {
  return request({
    url: '/user/passport/login',
    data: {
      phone,
      password
    }
  }, 'post')
}

// 获取用户信息，使用token
export function reqUserInfo() {
  return request({
    url: '/user/passport/auth/getUserInfo'
  })
}

// 退出登录
export function reqLogout() {
  return request({
    url: '/user/passport/logout'
  })
}

// 获取用户地址的信息
export function reqAddress() {
  return request({
    url: '/user/userAddress/auth/findUserAddressList'
  })
}

// 获取订单交易页信息
export function reqOrder() {
  return request({
    url: '/order/auth/trade'
  })
}

// 提交订单
export function reqSubmit(tradeNo: string, data: Object) {
  return request({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data
  }, 'post')
}

// 获取支付信息
export function reqPayment(orderId: string) {
  return request({
    url: `/payment/weixin/createNative/${orderId}`
  })
}

// 获取支付状态
export function reqPayStatus(orderId: string) {
  return request({
    url: `/payment/weixin/queryPayStatus/${orderId}`
  })
}