<template>
    <div>
      <svg-icon icon-class="fullscreen" style="color: #fff ; width: 20px ; height: 20px" @click="changeScreen"/>
    </div>
</template>

<script>
  import ScreenFull from 'screenfull'
  export default {
    name: 'index',
    methods:{
      // 改变全屏
      changeScreen(){
        if (!ScreenFull.isEnabled){
          // 此时全屏不可用
          this.$message.warning('全屏组件不可用！')
          return
        }
        // 如果可以用 则全屏
        ScreenFull.toggle()
      }
    }
  }
</script>

<style scoped>

</style>
