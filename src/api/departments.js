import request from '@/utils/request'

// 获取树形数据
export function getDepartments() {
    return request({
      url:'/company/department'
    })
}

// 封装删除功能
export function delDepartments(id) {
  return request({
    url:`/company/department/${id}`,
    method:'delete'
  })
}

// 封装新增部门的接口
export function addDepartments(data) {
  return request({
    url:'/company/department',
    method:'post',
    data
  })
}
/*
*   获取部门详情
* */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/*
*   编辑部门
* */
export function updateDepartments(data) {
  return request({
    url:`/company/department/${data.id}`,
    method:'put',
    data
  })
}
