// import parseTime, formatTime and set to filter
export {
  parseTime,
  formatTime
}
from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [{
      value: 1E18,
      symbol: 'E'
    },
    {
      value: 1E15,
      symbol: 'P'
    },
    {
      value: 1E12,
      symbol: 'T'
    },
    {
      value: 1E9,
      symbol: 'G'
    },
    {
      value: 1E6,
      symbol: 'M'
    },
    {
      value: 1E3,
      symbol: 'k'
    }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 保留N位小数
 * @author Ocean
 * @param {int} input 数字
 * @param {num} num 尾数
 */
export function toFixed(input, num) {
  return Number(input).toFixed(num)
}


/**
 * 转换时间
 * @author Ocean
 * @param {int} time 传入时间戳
 * @param {string} ff 转换日期格式 Y-m-d 等，下方有著明
 */
export function timeStr(time, ff) {
  if (time == 0) return "/"
  ff = ff ? ff : "Y-m-d H:i:s"
  if (Number(time).toString().length == 10) {
    time = Number(time + "000")
  }
  time = new Date(time);
  var year = time.getFullYear();
  var month =
    time.getMonth() + 1 < 10 ?
    "0" + (time.getMonth() + 1) :
    time.getMonth() + 1;
  var date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  var minute =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  var second =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  if (ff == "Y-m-d") {
    return year + "-" + month + "-" + date;
  } else if (ff == "Y-m-d H:i:s") {
    return (
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second
    );
  } else if (ff == "Y-m-d H:i") {
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  } else if (ff == "Y.m.d") {
    return year + "." + month + "." + date;
  } else if (ff == "Y.m.d H:i:s") {
    return (
      year +
      "." +
      month +
      "." +
      date +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second
    );
  } else if (ff == "Y.m.d H:i") {
    return year + "." + month + "." + date + " " + hour + ":" + minute;
  }
}

/**
 * 计时器
 * @author Ocean
 * @param {int} value 传入时间，单位 秒
 * @param {string} dw 时分秒间间隔符号，默认为":"，cn为中文
 */
export function countTime(value, dw) {
  let theTime = parseInt(value)
  let theTime1 = 0
  let theTime2 = 0
  let result
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
    }
  }
  if (dw && dw == "cn") {
    result = '' + parseInt(theTime) + '秒'
    if (theTime1 > 0) {
      result = '' + parseInt(theTime1) + '分' + result
    }
    if (theTime2 > 0) {
      result = '' + parseInt(theTime2) + '小时' + result
    }
  } else if (dw && dw != "cn") {
    result = '' + parseInt(theTime)
    if (theTime1 > 0) {
      result = '' + parseInt(theTime1) + dw + result
    }
    if (theTime2 > 0) {
      result = '' + parseInt(theTime2) + dw + result
    }
  } else {
    result = '' + (parseInt(theTime) < 10 ? "0" + theTime : parseInt(theTime))
    if (theTime1 > 0) {
      result = '' + (parseInt(theTime1) < 10 ? "0" + theTime1 : parseInt(theTime1)) + ':' + result
    }
    if (theTime2 > 0) {
      result = '' + (parseInt(theTime2) < 10 ? "0" + theTime2 : parseInt(theTime2)) + ':' + result
    }
  }
  return result
}

// 正计时，只返回分
export function countMin(value) {
  let theTime = parseInt(value)
  let theTime1 = 0
  let theTime2 = 0
  let result
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    // if (theTime1 > 60) {
    //   theTime2 = parseInt(theTime1 / 60)
    //   theTime1 = parseInt(theTime1 % 60)
    // }
  }
  return theTime1
}

// 转换支付方式
export function payType(val) {
  switch (val) {
    case 1:
      return "余额支付"
    case 2:
      return "微信支付"
    case 3:
      return "支付宝支付"
    default:
      return "/"
  }
}

// 转换订单来源
export function orderFrom(val) {
  switch (val) {
    case 1:
      return "apk订单"
    case 2:
      return "公众号订单"
    case 3:
      return "小程序订单"
    case 4:
      return "app订单"
    default:
      return "/"
  }
}

// 转换订单状态
export function orderStatus(val) {
  switch (val) {
    case 0:
      return "已取消"
    case 10:
      return "未付款【默认】"
    case 20:
      return "已付款"
    case 30:
      return "已发货"
    case 31:
      return "使用中"
    case 40:
      return "已收货/已出货/已完成/已归还"
    case 50:
      return "已退款"
    case 51:
      return "退款中"
    case 52:
      return "出货失败"
    case 53:
      return "退款失败"
    case 60:
      return "已评价"
    case 90:
      return "异常订单"
    default:
      return "/"
  }
}
