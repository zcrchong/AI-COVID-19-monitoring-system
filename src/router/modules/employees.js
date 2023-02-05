// 导出属于员工的路由规则
import Layout from '@/layout'

// 每个子模块 其实就是外层是layout 组件位于layout的二级路由里面
export default {
  path: '/employees',
  name:'employees',
  component : Layout, //组件
  children:[{
    path:'',  // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/employees'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta:{
      // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      title:'员工管理', icon:'people'
    }
  },
    {
      path: 'detail/:id', // query动态路由传参
      component : () => import('@/views/employees/detail'),
      hidden: true, // 不在左侧菜单显示
      meta : {
        title : '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时使用
      }
    },
    {
      path: 'print/:id', // 二级默认路由
      component: () => import('@/views/employees/print'),
      hidden: true,
      meta: {
        title: '打印',
        icon: 'people'
      }
    }
  ]
}
