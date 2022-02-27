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