import request from "./request";

// 三级联动接口
export function reqCategoryList() {
  return request({
    url: 'product/getBaseCategoryList'
  })
}