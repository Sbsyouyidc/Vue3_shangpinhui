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
  goodDetail: GoodDetail
}

export interface GoodDetail {
  price?: number,
  categoryView?: CategoryView
}