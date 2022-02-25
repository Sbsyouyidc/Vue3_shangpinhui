export default function debounce (func: Function, wait: number = 1000, immediate = false){
  let timer: null | number = null   // 定时器

  // 返回包装过的debounce函数
  return function(...args: Array<any>){
      // 如果有触发，则取消之前的触发，以当前触发为准，重新计时
      if(timer){
          clearTimeout(timer)
      }
      if (immediate) {
        if (!timer) func.apply(null, args)
        timer = window.setTimeout(() => {
          timer = null
        }, wait)
      } else {
        timer = setTimeout(function(){
            // 定时器的回调函数：清除本次定时器，并执行函数
          func.apply(null, args)
        }, wait)
      }
  }
}