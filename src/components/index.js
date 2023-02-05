// 该文件负责所有的公共组件的全局注册
import PageTool from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
export default {
  install(Vue){
    // 注册全局的通用栏组件对象
    Vue.component('PageTools',PageTool)
    Vue.component('UploadExcel',UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 注册导入上传图片的组件
    Vue.use(Print)
    Vue.component('ScreenFull' ,  ScreenFull) // 注册全屏组件
    Vue.component('ThemePicker', ThemePicker)
  }
}
