let obj = {}

/** 把数据放入本地 **/
obj.putLocalStorage = function(key, value) {
  value = typeof value === 'string' ? value : JSON.toString(value)
  window.localStorage.setItem(key, value)
}

/** 把数据取出 **/
obj.getLocalStorage = function(key) {
  return window.localStorage.getItem(key)
}

/** 清除本地数据 **/
obj.removeLocalStorage = function(key) {
  if(key) {
    window.localStorage.removeItem(key)
  } else {
    let args = Array.prototype.slice.call(arguments)
    for(let key in args) {
      window.localStorage.removeItem(key)
    }
  }
}

/** 清除所有 **/
obj.removeAllLocalStorage = function() {
  window.localStorage.clean()
}

export default obj