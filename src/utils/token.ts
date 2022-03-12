// 对外暴露一个函数
export function setToken(token: string) {
  localStorage.setItem('TOKEN', token)
}

export function getToken() {
  return localStorage.getItem('TOKEN')
}

export function removeToken() {
  localStorage.removeItem('TOKEN')
}