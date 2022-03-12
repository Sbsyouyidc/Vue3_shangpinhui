export interface State {
  address: Array<Address>
  order: Order
}

export interface Address {
  consignee?: string
  fullAddress?: string
  id?: number
  isDefault?: string
  phoneNum?: string
  provinceId?: number
  regionId?: number
  userAddress?: string
  userId?: number
}

export interface Order {
  activityReduceAmount?: number
  originalTotalAmount?: number
  totalAmount?: number
  totalNum?: number
  tradeNo?: string
  userAddressList?: any
  couponInfoList?: Array<any>
  detailArrayList?: Array<Detail>
  orderDetailVoList?: Array<any>
}

export interface Detail {
  activityRule: any
  couponInfoList: any
  createTime: any
  hasStock: any
  id: any
  imgUrl: string
  orderId: any
  orderPrice: number
  refundStatus: string
  refundStatusString: string
  skuId: number
  skuName: string
  skuNum:number
  sourceId: number
  sourceType: string
  splitActivityAmount: any
  splitCouponAmount: any
  splitTotalAmount: any
}