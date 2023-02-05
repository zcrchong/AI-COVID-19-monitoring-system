import request from '@/utils/request'

export function login(data) {
  return request({
    url:'/sys/login',
    method : 'post',
    // 因为登录提交的数据是body请求体里面的数据 所以存在data中
    // 如果提交的数据是路径参数 应该存在params中
    data
  })
}
// 获取用户信息的接口
export function getUserInfo() {
  return request({
    url:'/sys/profile',
    method:'post'
  })
}
/** *
 *
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * **/
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
