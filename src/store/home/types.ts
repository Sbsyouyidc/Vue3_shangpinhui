export interface Category {
  categoryId: number,
  categoryName: string,
  categoryChild?: Category 
}

export interface Banner {
  id: string,
  imgUrl: string
}

export interface State {
  categoryList: Array<Category>,
  bannerList: Array<Banner>,
  floorList: Array<any>
}