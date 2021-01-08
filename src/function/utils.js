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