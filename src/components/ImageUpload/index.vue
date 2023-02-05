<template>
  <div>
    <el-upload
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :file-list="fileList"
      list-type="picture-card"
      action="#"
      :limit="1"
      :class="{disabled: fileComputed }"
      :http-request="upload"
      :before-upload="beforeUpload"
    >

      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import COS from 'cos-js-sdk-v5' // 引入腾讯云SDK
  const cos = new COS({
    SecretId: 'AKIDpVyB9sNrKdhfYEm9h6KXiomZCeuyoRxL', // 身份识别ID
    SecretKey: 'IZgbKsIWckuvlSznR1RfjcKrEZigS2Pb' // 身份密钥
  })
  export default {
    name: 'index',
    data() {
      return {
        fileList: [],
        showDialog: false,
        imgUrl: '',
        currentFileUid: null,
        showPercent: false,
        percent: 0
      }
    },
    computed: {
      // 设定一个计算属性 判断是否已经上传完了一张
      fileComputed() {
        return this.fileList.length === 1
      }
    },
    methods: {
      // 点击预览事件
      preview(file) {
        console.log(file.url)
        this.imgUrl = file.url
        this.showDialog = true
      },
      handleRemove(file, fileList) {
        // file是点击删除的文件 fileList是删除后的fileList
        // this.fileList = this.fileList.filter(item => item.uid !== file.uid)
        this.fileList = fileList
      },
      changeFile(file, fileList) {
        /*
        * 修改文件时触发
        * 此时可以用fileList 因为该方法会进来很多遍 不能每次都去push
        * fileList因为fileList参数是当前传进来的最新参数 我们只需要将其转化成数组即可 需要转化成一个新的数组
        *[] => [...fileList] [] => fileList.map()
        * 上传成功之后 还会进来 需要实现上传代码的逻辑 这里才会成功
        * */
        this.fileList = fileList.map(item => item)
      },
      beforeUpload(file) {
        // 文件上传前的检查
        const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
        if (!types.includes(file.type)) {
          this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG形式')
          return false
        }
        // 检查大小
        const maxSize = 5 * 1024 * 1024
        if (maxSize < file.size) {
          this.$message.error('图片大小最大不能超过5M')
          return false
        }
        this.currentFileUid = file.uid
        this.showPercent = true
        return true
      },
      // 自定义上传内容
      upload(params) {
        // console.log(params.file)
        if (params.file) {
          // 执行上传操作
          cos.putObject({
            Bucket: 'zuochaoran-1313955062', // 存储桶
            Region: 'ap-beijing', // 地域
            Key: params.file.name, //文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
            // 进度条
            onProgress: (params) => {
              this.percent = params.percent * 100
            }
          }, (err, data) => {
            // console.log(err || data)
            // data中有一个状态码 = 200 此时表示上传成功，进行后续操作
            if (!err && data.statusCode === 200) {
              // 此时获取文件的线上地址，并把原先urlList中的地址替换掉
              this.fileList = this.fileList.map(item => {
                  // 去找谁的uid等于刚刚记录下来的id
                  if (item.uid === this.currentFileUid) {
                    // 将成功的地址赋值给原来的url属性
                    return { url: 'http://' + data.Location, upload: true }
                    // upload = true的时候则代表着图片已经上传成功且替换成功了，这时候才可以修改用户信息的表单
                  }
                  return item
                })
              setTimeout(() => {
                this.showPercent = false // 隐藏进度条
                this.percent = 0 // 进度归0
              }, 1000)
            }
          })
        }
      }
    }
  }
</script>

<style>
  .disabled .el-upload--picture-card {
    display: none
  }
</style>
