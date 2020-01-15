import request from '@/utils/request'

/**
 * 用户列表
 * @param {int} pageNo 页码
 * @param {int} pageSize 分页大小
 * @param {int} namekey 搜索昵称
 * @param {int} telkey 搜索手机
 */
export function getUserList(data) {
  return request({
    url: '/admin/user/member/getUserList',
    method: 'post',
    data
  })
}
/**
 * 会员列表
 * @param {int} pageNo 页码
 * @param {int} pageSize 分页大小
 * @param {int} keyword 搜索账号/昵称/手机/邮箱
 */
export function memberList(data) {
  return request({
    url: '/admin/sys/member/index',
    method: 'post',
    data
  })
}

/**
 * 会员详情
 * @param {int} mid 会员ID 
 */
export function memberDetail(data) {
  return request({
    url: '/admin/sys/member/show',
    method: 'post',
    data
  })
}
// 添加会员
export function memberAdd(data) {
  return request({
    url: '/admin/sys/member/add',
    method: 'post',
    data
  })
}
// 编辑会员
export function memberEdit(data) {
  return request({
    url: '/admin/sys/member/edit',
    method: 'post',
    data
  })
}

// 删除会员
export function memberDel(data) {
  return request({
    url: '/admin/sys/member/delete',
    method: 'post',
    data
  })
}
