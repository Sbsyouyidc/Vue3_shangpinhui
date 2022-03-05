export interface CategoryView {
  id: number,
  category1Id: number,
  category1Name: string,
  category2Id: number,
  category2Name: string,
  category3Id: number,
  category3Name: string
}

export interface State {
  goodDetail: GoodDetail,
}

export interface GoodDetail {
  price?: number,
  categoryView?: CategoryView,
  skuInfo?: SkuInfo,
  spuSaleAttrList?: Array<SpuSaleAttrValue>
}

export interface SkuInfo {
  category3Id: number,
  createTime: string
  id: number
  isSale: number
  price: number
  skuAttrValueList: Array<SkuAttrValue>
  skuDefaultImg: string
  skuDesc: string
  skuImageList: Array<SkuImage>
  skuName: string
  skuSaleAttrValueList: Array<SkuAttrValue>
  spuId: number
  tmId: number
  weight: string
}

export interface SkuAttrValue {
  id: number, 
  attrId: number, 
  valueId: number, 
  skuId: number, 
  attrName: string, 
  valueName: string
}

export interface SkuImage {
  id: number
  imgName: string
  imgUrl: string
  isDefault: string
  skuId: number
  spuImgId: number
}

export interface SkuSaleAttrValue {
  id: number
  saleAttrId: number
  saleAttrName: string
  saleAttrValueId: number
  saleAttrValueName: string
  skuId: number
  spuId: number
}

export interface SpuSaleAttrValue {
  baseSaleAttrId: number
  isChecked?: string,
  saleAttrValueName?: string
  id: number
  saleAttrName: string
  spuId: number
  spuSaleAttrValueList: Array<SpuSaleAttrValue>
}