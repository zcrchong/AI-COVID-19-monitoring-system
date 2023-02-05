import { getToken , setToken , removeToken , setTimeStamp , getTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
// 状态
const state = {
  token: getToken(), // 从缓存中读取token初始值(状态)
  userInfo: {}
}
// 修改状态
const mutations = {
  // vuex的初始化：vuex和前端缓存相结合
  setToken(state,token){
    // 将数据载荷token赋值给state中的token
    state.token = token
    setToken(token) // 把数据载荷token更新到给缓存中的token
  },
  removeToken(){
    // 清空vuex中的token
    state.token = null
    // 清空缓存中的token
    removeToken()
  },
  setUserInfo(state,userInfo){
    state.userInfo = { ...userInfo }
  },
  removeUserInfo(state){
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context,data){
    const result = await login(data) // 实际上就是一个promise对象， result是执行的结果
    // 是否成功的逻辑在login里面已经判断完了 所以直接返回result
    context.commit('setToken',result)
    // 设置当前的时间戳
    setTimeStamp()
  },
  // 获取用户资料actions
  async getUserInfo(context){
    // console.log(11)
    const result = await getUserInfo()
    // 等待上面执行完后
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result , ...baseInfo}
    context.commit('setUserInfo',baseResult)

    return baseResult // 这里为什么要返回 为后面埋下伏笔
  },
  logout(context){
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
    // 重置路由
    resetRouter()
    // 此时vuex中的数据还存在，要想办法把vuex/permission中的数据重置
    // 此时为子模块调用另一个带有命名空间的子模块中的方法
    // 需要用到context.commit的第三个参数
    context.commit('permission/setRoutes',[],{ root : true })
    // 子模块调用子模块的action 可以 将 commit的第三个参数 设置成  { root: true } 就表示当前的context不是子模块了 而是父模块
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
