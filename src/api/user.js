import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/sys/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/sys/auth/userInfo',
    method: 'post',
    params: { token }
  })
}

export function getMenu() {
  return request({
    url: '/admin/sys/auth/menu',
    method: 'post'
  })
}
