// vuex的权限模块
import { constantRoutes, asyncRoutes } from '@/router'
// vuex中的permission模块用来存放当前的静态路由+ 此用户的权限路由
const state = {
  routes: constantRoutes // 所有人默认拥有静态路由
}
const mutations = {
  // newRoutes 是此用户登录后通过权限所得到的的动态路由的部分
  setRoutes(state, newRoutes) {
    // 每次更新都应该在静态路由的基础上进行追加
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // 筛选权限路由
  // 第二个参数为当前用户的所拥有的的菜单权限
  // menus: ["settings","permissions"]
  // asyncRoutes是所有的动态路由
  // asyncRoutes  [{path: 'setting',name: 'setting'},{}]
  filterRoutes(context, menus) {
    const routes = []
    // 筛选出动态路由中和menus中能够对上的路由
    menus.forEach(key => {
        // key就是标识
        // asyncRoutes 中找有没有对象中的name属性等于 key的    如果找到了就筛选出来推出数组，如果没找到则代表没权限
        routes.push(...asyncRoutes.filter(item => item.name === key))
      })
    // 得到的routes是所有模块中满足权限要求的路由数组
    // routes就是当前用户所拥有的的动态路由的权限
    context.commit('setRoutes', routes) // 将动态路由提交给mutations
    return routes // state数据中的routes是用来显示左侧菜单用的 return用来给路由的addRoutes用的
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
