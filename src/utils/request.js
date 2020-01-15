import axios from 'axios'
import {
  Message,
  Notification,
  Loading
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
// import $router from '@/router_bak';

function queryParse(query) {
  const res = []
  for (const k in query) {
    res.push(`${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
  }
  return res.join('&')
}

let requestingCount = 0;
let loading //定义loading变量

function startLoading() { //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function stopLoading() { //使用Element loading-close 方法
  loading.close()
}
//将同一时刻的请求进行合并. 每次请求的时候requestingCount 递增1, 请求结束递减1 requestingCount为0 停止loading
const handleRequestLoading = () => {
  if (requestingCount === 0) {
    startLoading()
  }
  requestingCount++
}
const handleResponseLoading = () => {
  if (requestingCount <= 0) return
  requestingCount--
  if (requestingCount === 0) stopLoading()
}

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000
})

export const json2fd = json => {
  const fd = new FormData()
  for (const k in json) {
    fd.append(k, json[k])
  }
  return fd
}

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken()
  }
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    config.data = queryParse(config.data)
  }
  handleRequestLoading()
  return config
}, error => {
  handleResponseLoading()
  console.log(error) // for debug
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    handleResponseLoading()
    const res = response.data
    switch (res.code) {
      case 0 || -1:
        Message({
          message: res.msg,
          type: 'warning'
        });
        return Promise.reject(res)
        break;
      case 1:
        // res.msg !== 'success' && res.msg != '' && res.msg != '获取成功' && res.msg != '操作完成' && Message({
        //   message: res.msg,
        //   type: 'success'
        // });
        return res.data
        break;
      case 3 || 21 || 403:
        Notification({
          title: '警告',
          message: '您的登录凭证已过期，请重新登录,2秒后自动退出系统',
          type: 'warning'
        })
        setTimeout(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }, 2000)
        break;
      case null:
        return res.data
        break;
      case 200:
        Message({
          message: '您的权限不足',
          type: 'warning'
        })
        // setTimeout(() => {
        //   store.dispatch('LogOut').then(() => {
        //     $router.replace('/login')
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // }, 2000)
        break;
      default:
        Message({
          message: res.msg,
          type: 'error',
        })
        return Promise.reject(res)
        break;
    }

    // if (res.code === 1) {
    //     return res.data
    // } else if (res.code === 3 || res.code === 21 || res.code === 403) {
    // // console.log(`token`,res)
    // // res.code === 403 ||
    // } else if (res.code === null) {
    //     return res
    // } else {
    // Message({
    //     message: res.msg,
    //     type: 'error',
    //     duration: 5 * 1000
    // })
    // return Promise.reject(res)
    // }
  },
  error => {
    handleResponseLoading()
    console.log('err', error) // for debug
    Message({
      // message: error.message || error.msg,
      message: '接口有误，请通知后台管理员',
      type: 'error',
      duration: 15 * 1000
    })
    return Promise.reject(error)
  })

export default service
