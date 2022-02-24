export function throttle1(func: Function, wait: number = 100) {
  let lastTime = 0
  return function(...args: Array<any>) {
    let now = Date.now()
    let coolDown = now - lastTime < wait

    if (!coolDown) {
      lastTime = Date.now()
      func.apply(null, args)
    }
  }
}

export function throttle2(func: Function, wait: number = 100) {
  let timer: null | number = null
  return function(...args: Array<any>) {
    if (timer) return
    timer = setTimeout(() => {
      func.apply(null, args)
      timer = null
    }, wait)
  }
}