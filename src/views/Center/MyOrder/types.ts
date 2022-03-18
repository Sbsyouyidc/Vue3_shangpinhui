export interface MyOrder {
  records: Array<Record>
  total: number,
  size: number,
  current: number,
  pages: number
}

export interface Record {
  id: number,
  consignee: string,
  consigneeTel: string,
  totalAmount: number,
  orderStatus: string,
  userId: number,
  paymentWay: string,
  deliveryAddress: string,
  orderComment: string,
  outTradeNo: string,
  tradeBody: string,
  createTime: string,
  expireTime: string,
  processStatus: string,
  trackingN: any,
  parentOrderId: any,
  imgUrl?: string,
  orderDetailList: Array<Detail>
  orderStatusName: string,
  wareId: any
}

export interface Detail {
  id: number,
  orderId: number,
  skuId: number,
  skuName: string,
  imgUrl: string,
  orderPrice: number,
  skuNum: number,
  hasStock: any
}