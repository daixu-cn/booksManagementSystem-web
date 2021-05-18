<template>
  <div class="container" ref="page">
    <div class="titleIcon"></div>
    <p class="titleText">纺织学院图书后台管理系统</p>
    <router-view></router-view>
    <ul class="loginOptions" :class="isAdmin?'':'resID'">
      <router-link v-show="isAdmin" to="/Register" tag="li">注册账号</router-link>
      <router-link :to="isAdmin?'/studentForgetPwd':'/adminForgetPwd'" tag="li">忘记密码</router-link>
    </ul>
    <el-row>
      <el-button type="success" round @click="isAdmin?studentLogin():adminLogin()">登录</el-button>
    </el-row>
    <el-divider class="hr-X"></el-divider>
    <ul class="ThirdPartylogin">
      <li>第三方登录</li>
      <li>
        <i class="iconfont icon-weibo" title="微博登录"></i>
      </li>
      <li>
        <i class="iconfont icon-qq" title="QQ登录"></i>
      </li>
      <li>
        <i class="iconfont icon-weixin" title="微信登录"></i>
      </li>
      <router-link :to="isAdmin?'/':'/AdminBox'" tag="li">
        <i
          @click="switchLogin()"
          class="iconfont"
          :class="isAdmin?'icon-guanliyuan':'icon-xuesheng'"
          :title="isAdmin?'管理员登录':'学生登录'"
        ></i>
      </router-link>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      clientHeight: ''
    }
  },
  computed: {
    isAdmin () {
      if (this.$route.name === 'loginBox') {
        return true
      } else {
        return false
      }
    },
    studentId () {
      return this.$store.state.studentId
    },
    studentPwd () {
      return this.$store.state.studentPwd
    },
    adminId () {
      return this.$store.state.adminId
    },
    adminPwd () {
      return this.$store.state.adminPwd
    }
  },
  mounted () {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`
    const that = this
    window.onresize = function () {
      this.clientHeight = `${document.documentElement.clientHeight}`
      if (that.$refs.page) {
        that.$refs.page.style.height = this.clientHeight + 'px'
      }
    }
  },
  watch: {
    // 如果clientHeight 发生改变，这个函数就会运行
    clientHeight () {
      this.changeFixed(this.clientHeight)
    }
  },
  methods: {
    // 控制浏览器高度
    changeFixed (clientHeight) {
      if (this.$refs.page) {
        this.$refs.page.style.height = clientHeight + 'px'
      }
    },
    switchLogin () {
      if (this.$route.name === 'loginBox') {
        this.$router.replace({ name: 'adminBox' })
      } else {
        this.$router.replace({ name: 'loginBox' })
      }
    },
    studentLogin () {
      const url = '/admin/borrow/s_login/'
      const params = {
        params: {
          stu_id: this.studentId,
          stu_ma: this.studentPwd
        }
      }
      axios.post(url, params).then(res => {
        if (res.data.code === 200) {
          this.$router.replace({ path: '/StudentIndex' })
          this.$store.commit('setStudentId', res.data.data.stu_id)
          this.$store.commit('setStudentPwd', res.data.data.stu_ma)
        } else {
          this.$message.error('学号或密码有误,请检查后重新输入')
        }
      })
    },
    adminLogin () {
      const url = '/admin/manager/m_login/'
      const params = {
        params: {
          manager_zh: this.adminId,
          manager_ma: this.adminPwd
        }
      }
      axios.post(url, params).then(res => {
        if (res.data.code === 200) {
          this.$router.replace({ path: '/AdminIndex' })
          this.$store.commit('setAdminId', '')
          this.$store.commit('setAdminPwd', '')
        } else {
          this.$message.error('账号或密码有误,请检查后重新输入')
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  background: url("../assets/images/login.jpg") no-repeat center;
  background-size: cover;
  overflow: hidden;
}
.titleIcon {
  width: 110px;
  height: 110px;
  overflow: hidden;
  border-radius: 50%;
  background: url("../assets/images/0022005524792051_b.jpg") no-repeat center
    center;
  background-size: cover;
  margin: 90px auto 35px auto;
}
.titleText {
  width: 100%;
  font-size: 18px;
  color: #ffffffbf;
  text-align: center;
  margin-bottom: 25px;
}
.loginOptions {
  width: 315px;
  box-sizing: border-box;
  padding: 0px 7px;
  margin: 0 auto;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffffbf;
  margin-top: 15px;
}
.loginOptions li {
  cursor: pointer;
}
.container .resID {
  justify-content: flex-end;
}
.loginOptions li:hover {
  color: white;
}
.container .el-button {
  display: block;
  margin: 0 auto;
  background-color: rgba(103, 194, 58, 0.6);
  width: 150px;
  height: 44px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.container .el-button--success:hover {
  background-color: rgba(133, 206, 71, 0.6);
}
.container .el-divider--horizontal {
  margin: 0 auto;
  margin-top: 33px;
  width: 80%;
  height: 1px;
  background: rgba(255, 255, 255, 0.6);
}
.ThirdPartylogin {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffffbf;
  margin-top: 40px;
}
.ThirdPartylogin li {
  margin-left: 27px;
}
.ThirdPartylogin li i {
  font-size: 34px;
  cursor: pointer;
}
.ThirdPartylogin li:nth-child(3) i {
  font-size: 26px;
}
.ThirdPartylogin li:nth-child(4) i {
  font-size: 28px;
}
.ThirdPartylogin li:nth-child(5) i {
  font-size: 28px;
}
.container .hr-X{
  width: 100%;
}
</style>
