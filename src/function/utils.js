/** 弹出框 **/
export function notifyError($message, message) {
  $message({
    message: message,
    showClose: true,
    duration: 2000,
    type: "error",
  });
}

export function notifySuccess($message, message) {
  $message({
    message: message,
    showClose: true,
    duration: 2000,
    type: "success",
  });
}

export function notifyTips($message, message) {
  $message({
    message: message,
    showClose: true,
    duration: 2000,
    type: "warning",
  });
}

/** 防抖函数 **/
export function debounce(func, wait = 1000) {
  let timer;
  return function() {
    let context = this,
      args = arguments;
    let latter = function() {
      timer = null;
      func.apply(context, args);
    };
    clearTimeout(timer);
    timer = setTimeout(latter, wait);
  };
}

/** 深拷贝 **/
export function deepClone(obj) {
  let data = null;
  if (obj && typeof obj === "object") {
    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }
    if (obj instanceof Date) {
      return new Date(obj);
    }
    data = Array.isArray(obj) ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty) {
        data[i] = deepClone(obj[i]);
      }
    }
  } else {
    data = obj;
  }
  return data;
}

// 时间格式化
export function timeFormat(time, fmt) {
  let obj = new Date(time);
  var o = {
    "M+": obj.getMonth() + 1, //月份
    "d+": obj.getDate(), //日
    "h+": obj.getHours(), //小时
    "m+": obj.getMinutes(), //分
    "s+": obj.getSeconds(), //秒
    "q+": Math.floor((obj.getMonth() + 3) / 3), //季度
    S: obj.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (obj.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
