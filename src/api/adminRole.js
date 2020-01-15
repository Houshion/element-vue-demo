import request from '@/utils/request'

// 角色列表
export function roleList(data) {
    return request({
        url: 'admin/sys/admin_role/index',
        method: 'post',
        data
    })
}

// 角色详情
export function roleDetail(data) {
    return request({
        url: 'admin/sys/admin_role/show',
        method: 'post',
        data
    })
}

// 添加角色
export function roleAdd(data) {
    return request({
        url: 'admin/sys/admin_role/add',
        method: 'post',
        data
    })
}

// 编辑角色
export function roleEdit(data) {
    return request({
        url: 'admin/sys/admin_role/edit',
        method: 'post',
        data
    })
}

// 删除角色
export function roleDel(data) {
    return request({
        url: 'admin/sys/admin_role/delete',
        method: 'post',
        data
    })
}
