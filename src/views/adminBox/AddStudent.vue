<template>
  <div class="container">
    <div class="box clearfix">
      <span>学号</span>
      <el-input v-model="id" placeholder class="box_input"></el-input>
    </div>
    <div class="box clearfix">
      <span>性别</span>
      <el-radio v-model="sex" label="1">男</el-radio>
      <el-radio v-model="sex" label="0">女</el-radio>
    </div>
    <div class="box clearfix">
      <span>姓名</span>
      <el-input v-model="name" placeholder class="box_input"></el-input>
    </div>
    <div class="box clearfix">
      <span>年级</span>
      <el-input v-model="grade" placeholder class="box_input"></el-input>
    </div>
    <div class="box clearfix">
      <span>年龄</span>
      <el-input v-model="age" placeholder class="box_input"></el-input>
    </div>
    <div class="box clearfix">
      <span>专业</span>
      <el-input v-model="domain" placeholder class="box_input"></el-input>
    </div>
    <div class="box clearfix btn" @click="modifyBtn">
      <el-button type="success" round>添加学生</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      sex: '',
      id: '',
      name: '',
      grade: '',
      age: '',
      domain: '' // 专业
    }
  },
  methods: {
    modifyBtn () {
      const url = '/admin/manager/addStudent/'
      const params = {
        params: {
          id: this.id,
          sex: this.sex,
          name: this.name,
          grade: this.grade,
          age: this.age,
          domain: this.domain
        }
      }
      const reg = new RegExp('[0-9]{10}')
      if (this.id === '') {
        this.$message({
          message: '学号不能为空!',
          type: 'warning'
        })
        return
      } else if (!reg.test(this.id)) {
        this.$message({
          message: '学号必须为10位数字组成!',
          type: 'warning'
        })
        return
      } else if (this.sex === '') {
        this.$message({
          message: '请选择一个性别!',
          type: 'warning'
        })
        return
      } else if (this.name === '') {
        this.$message({
          message: '姓名不能为空!',
          type: 'warning'
        })
        return
      } else if (this.grade === '') {
        this.$message({
          message: '年级不能为空!',
          type: 'warning'
        })
        return
      } else if (this.age === '') {
        this.$message({
          message: '年龄不能为空!',
          type: 'warning'
        })
        return
      } else if (this.domain === '') {
        this.$message({
          message: '专业不能为空!',
          type: 'warning'
        })
        return
      }
      axios.post(url, params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '学生添加成功!',
            type: 'success'
          })
          this.sex = ''
          this.id = ''
          this.name = ''
          this.grade = ''
          this.age = ''
          this.domain = ''
        } else {
          this.$message.error('账号存在,添加失败!')
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 40px;
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
</style>
