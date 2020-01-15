import request from '@/utils/request'

// 菜单列表
export function menuList() {
  return request({
    url: '/admin/sys/auth/menu',
    method: 'post',
  })
}

// 菜单详情
export function menuDetail(data) {
  return request({
    url: '/admin/sys/admin_menu/show',
    method: 'post',
    data
  })
}
// 添加菜单
export function menuAdd(data) {
  return request({
    url: '/admin/sys/admin_menu/add',
    method: 'post',
    data
  })
}
// 编辑菜单
export function menuEdit(data) {
  return request({
    url: '/admin/sys/admin_menu/edit',
    method: 'post',
    data
  })
}

// 删除菜单
export function menuDel(data) {
  return request({
    url: '/admin/sys/admin_menu/delete',
    method: 'post',
    data
  })
}
