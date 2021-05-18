<template>
  <div class="container">
    <div class="box clearfix">
      <span>图书编号</span>
      <el-input v-model="id" placeholder class="box_input"></el-input>
    </div>
    <div class="box clearfix">
      <span>管理密码</span>
      <el-input v-model="password" placeholder class="box_input"></el-input>
    </div>
    <div class="box clearfix btn" @click="modifyBtn()">
      <el-button type="success" round>删除图书</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      id: '',
      password: '',
      classify: 0,
      manager_ma: ''
    }
  },
  async created () {
    await this.$store.dispatch('admin_zh')
    const url = '/admin/manager/m_getinfo/'
    const params = {
      params: {
        manager_zh: this.$store.state.adminId
      }
    }
    await axios.get(url, params).then(res => {
      this.manager_ma = res.data.data.manager_ma
      this.classify = res.data.data.manager_book_id
    })
  },
  methods: {
    modifyBtn () {
      const url = '/admin/library/delBook/'
      const params = {
        params: {
          id: this.id,
          password: this.password,
          classify: this.classify
        }
      }
      if (this.id === '') {
        this.$message({
          message: '图书编号不能为空!',
          type: 'warning'
        })
        return
      } else if (this.password === '') {
        this.$message({
          message: '密码不能为空!',
          type: 'warning'
        })
        return
      } else if (this.manager_ma !== this.password) {
        this.$message({
          message: '密码错误!',
          type: 'warning'
        })
        return
      }
      axios.post(url, params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '图书删除成功!',
            type: 'success'
          })
          this.id = ''
          this.password = ''
        } else if (res.data.code === 201) {
          this.$message.error('删除失败!不存在该图书!')
        } else if (res.data.code === 202) {
          this.$message.error('您没有权限操作其他类书籍!')
        } else if (res.data.code === 203) {
          this.$message.error('删除失败,请召唤系统管理员!')
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
  margin-right: 20px;
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
