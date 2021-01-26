/** 弹出框 **/
export function notifyError($message, message) {
  $message({
    message: message,
    showClose: true,
    duration: 2000,
    type: 'error'
  })
}

export function notifySuccess($message, message) {
  $message({
    message: message,
    showClose: true,
    duration: 2000,
    type: 'success'
  })
}

export function notifyTips($message, message) {
  $message({
    message: message,
    showClose: true,
    duration: 2000,
    type: 'warning'
  })
}

/** 防抖函数 **/
export function debounce(func, wait = 1000) {
  let timer
  return function() {
    let context = this, args = arguments
    let latter = function() {
      timer = null
      func.apply(context, args)
    }
    clearTimeout(timer)
    timer = setTimeout(latter, wait)
  }
}