export interface SearchList {
  attrsList?: Array<{attrId: number, attrName: string, attrValueList: string[]}>,
  goodsList?: Array<{defaultImg: string, hotScore: number, price: number, title: string, id: number}>,
  trademarkList?: Array<{tmId: number, tmName: string}>
  pageNo?: number,
  pageSize?: number,
  total?: number,
  totalPage?: number
}

export interface listParams {
  category1Id?: string,
  category2Id?: string,
  category3Id?: string,
  categoryName?: string,
  keyword?: string,
  props?: Array<any>,
  trademark?: string,
  order?: string,
  pageNo?: number,
  pageSize?: number
}

export interface State {
  searchList: SearchList
}