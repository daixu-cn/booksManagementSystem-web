<template>
  <div class="container">
    <div class="box clearfix">
      <span>学号</span>
      <el-input v-model="id" placeholder class="box_input"></el-input>
    </div>
    <div class="box clearfix">
      <span>姓名</span>
      <el-input v-model="name" placeholder class="box_input"></el-input>
    </div>
    <div class="box clearfix btn" @click="modifyBtn">
      <el-button type="success" round>删除学生</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      id: '',
      name: ''
    }
  },
  methods: {
    modifyBtn () {
      const url = '/admin/borrow/s_delete/'
      const params = {
        params: {
          id: this.id,
          name: this.name
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
      } else if (this.name === '') {
        this.$message({
          message: '姓名不能为空!',
          type: 'warning'
        })
        return
      }
      axios.post(url, params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '学生删除成功!',
            type: 'success'
          })
          this.id = ''
          this.name = ''
        } else {
          this.$message.error('删除失败!不存在该学生!')
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
