import request from '@/utils/request'

/*
*  获取用户列表数据
* */
export function getRoleList(params) {
  return request({
    url:'/sys/role',
    params
  })
}
/*
*   读取公司信息数据
* */
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

/*
*   删除角色
* */
export function deleteRole(id) {
  return request({
    url:`/sys/role/${id}`,
    method:'delete'
  })
}
/** *
 * 修改点击项的角色信息
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
/**
 * 获取点击的那项的数据
 * **/
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}


/** *
 * 新增角色
 * ***/
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
