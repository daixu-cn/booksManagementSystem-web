<template>
  <div class="container">
    <div class="headPortrait clearfix">
      <span>头像</span>
      <!-- 头像上传开始 -->
      <el-upload
        class="avatar-uploader"
        action="/admin/borrow/upload/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :data="params"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!-- 头像上传结束 -->
    </div>
    <div class="box clearfix">
      <span>学号</span>
      <el-input :disabled="true" v-model="id" placeholder="请输入内容" class="box_input"></el-input>
    </div>
    <div class="box clearfix">
      <span>名字</span>
      <el-input :disabled="disabled" v-model="name" placeholder="" class="box_input"></el-input>
    </div>
    <div class="box clearfix">
      <span>性别</span>
      <el-radio :disabled="disabled" v-model="sex" label="1">男</el-radio>
      <el-radio :disabled="disabled" v-model="sex" label="0">女</el-radio>
    </div>
    <div class="box clearfix">
      <span>年龄</span>
      <el-input :disabled="disabled" v-model="age" placeholder="" class="box_input"></el-input>
    </div>
    <div class="box clearfix">
      <span>专业</span>
      <el-input :disabled="disabled" v-model="domain" placeholder="" class="box_input"></el-input>
    </div>
    <div class="box clearfix">
      <span>年级</span>
      <el-input :disabled="disabled" v-model="grade" placeholder="" class="box_input"></el-input>
    </div>
    <div class="box clearfix btn" @click="modifyBtn">
      <el-button :type="modifyType" round>{{btnText}}</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      imageUrl: '',
      params: {
        stu_id: ''
      },
      isModify: false,
      btnText: '修改信息',
      modifyType: 'primary',
      disabled: true,
      sex: '',
      id: '',
      name: '',
      grade: '',
      age: '',
      domain: '' // 专业
    }
  },
  async created () {
    await this.$store.dispatch('stu_id')
    const url = '/admin/borrow/s_queryInfo/'
    this.params.stu_id = this.$store.state.studentId
    this.id = this.$store.state.studentId
    const params = {
      params: {
        stu_id: this.$store.state.studentId
      }
    }
    await axios.post(url, params).then(res => {
      this.name = res.data.data.stu_name
      if (res.data.data.stu_sex === '0') {
        this.sex = '0'
      } else {
        this.sex = '1'
      }
      this.domain = res.data.data.stu_pro
      this.grade = res.data.data.stu_grade
      this.age = res.data.data.stu_age
      this.imageUrl = res.data.data.stu_img
    })
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.$message({
        message: '头像上传成功,请刷新查看',
        type: 'success'
      })
      return isJPG && isLt2M
    },
    modifyBtn () {
      this.isModify = !this.isModify
      if (this.isModify === true) {
        this.modifyType = 'success'
        this.disabled = false
        this.btnText = '保存'
      } else {
        this.modifyType = 'primary'
        this.disabled = true
        this.btnText = '修改信息'
        const url = '/admin/borrow/s_update/'
        const params = {
          params: {
            stu_id: this.$store.state.studentId,
            stu_sex: this.sex,
            stu_age: this.age,
            stu_name: this.name,
            stu_pro: this.domain,
            stu_grade: this.grade
          }
        }
        axios.post(url, params).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
          } else {
            this.$message.error('服务器繁忙,请稍后再试')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  background-color: white;
}
.container .headPortrait {
  width: 40%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  display: flex;
  margin-bottom: 20px;
  margin-top: 25px;
}
.container .box {
  width: 40%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.container .box span,
.container .headPortrait span {
  margin-right: 30px;
}
.container .box_input {
  width: 80%;
  height: 50px;
  line-height: 50px;
}
.container .box_input .el-input__inner {
  border: none;
}
.container .btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-uploader {
  width: 50px;
  height: 50px;
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
</style>
