export interface State {
  code: string,
  token: string,
  userInfo: Info
}

export interface Info {
  birthday?: any,
  createTime?: string,
  email?: string,
  gender?: any,
  headImg?: string,
  id?: number,
  loginName?: string,
  name?: string,
  nickName?: string,
  operateTime?: any,
  passwd?: string,
  phoneNum?: string,
  status?: number,
  userLevel?: string
}