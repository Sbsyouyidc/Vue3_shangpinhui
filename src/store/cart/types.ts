export interface State {
  cartList: Array<CartInfoList>
}

export interface CartInfoList {
  activityRuleList?: any
  cartInfoList?: Array<CartInfo>
  createTime?: any
}

export interface CartInfo {
  cartPrice: number
  couponInfoList: any
  createTime: string
  id: number
  imgUrl: string
  isChecked: number
  isOrdered: number
  operateTime: string
  orderTime: any
  skuId: number
  skuName: string
  skuNum: number
  skuPrice: number
  sourceId: number
  sourceType: string
  userId: string
}