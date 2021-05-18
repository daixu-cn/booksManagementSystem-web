<template>
  <div class="container clearfix" ref="page">
    <!-- 左侧导航栏开始 -->
    <el-row class="tac">
      <el-col :span="12" class="navBox">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#243946"
          text-color="#96afbe"
          active-text-color="#ffffff"
          :unique-opened="true"
        >
          <h2>学生图书系统</h2>
          <p>分类</p>
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-yewutubiao_tushuguanlixitong"></i>
              <span>图书管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="allBook()" style="margin-top:-22px">全部图书</el-menu-item>
              <el-menu-item index="1-2" @click="addBook()">增加图书</el-menu-item>
              <el-menu-item index="1-3" @click="delBook()">删除图书</el-menu-item>
              <el-menu-item index="1-4" @click="lendingRegistration()">借阅登记</el-menu-item>
              <el-menu-item index="1-5" @click="returnBookRegister()">还书登记</el-menu-item>
              <el-menu-item index="1-6" @click="renewProcessing()">续借处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-xueshengguanli"></i>
              <span>学生管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="allStudent()" style="margin-top:-22px">全部学生</el-menu-item>
              <el-menu-item index="2-2" @click="addStudent()">增加学生</el-menu-item>
              <el-menu-item index="2-3" @click="delStudent()">删除学生</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3" @click="logOut()">
            <i class="iconfont icon-tuichu"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <!-- 左侧导航栏结束 -->

    <!-- 右侧头部开始 -->
    <div class="right_head">
      <img src="../assets/images/logo.png" class="logo" />
      <div>
        <img :src="manager_img" />
        <span>【{{manager_name}}】</span>
      </div>
    </div>
    <!-- 右侧头部结束 -->
    <router-view class="right_bottom"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      clientHeight: '',
      defaultActive: '1-1',
      manager_img: '',
      manager_name: ''
    }
  },
  async created () {
    if (this.$route.name === 'AdminIndex') {
      this.defaultActive = '1-1'
    } else if (this.$route.name === 'AddBook') {
      this.defaultActive = '1-2'
    } else if (this.$route.name === 'DelBook') {
      this.defaultActive = '1-3'
    } else if (this.$route.name === 'LendingRegistration') {
      this.defaultActive = '1-4'
    } else if (this.$route.name === 'ReturnBookRegister') {
      this.defaultActive = '1-5'
    } else if (this.$route.name === 'RenewProcessing') {
      this.defaultActive = '1-6'
    } else if (this.$route.name === 'BorrowingStatistics') {
      this.defaultActive = '1-7'
    } else if (this.$route.name === 'AllStudent') {
      this.defaultActive = '2-1'
    } else if (this.$route.name === 'AddStudent') {
      this.defaultActive = '2-2'
    } else if (this.$route.name === 'DelStudent') {
      this.defaultActive = '2-3'
    }
    await this.$store.dispatch('admin_zh')
    const url = '/admin/manager/m_getinfo/'
    const params = {
      params: {
        manager_zh: this.$store.state.adminId
      }
    }
    await axios.get(url, params).then(res => {
      this.manager_img = res.data.data.manager_img
      this.manager_name = res.data.data.manager_name
    })
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
    // 跳转到全部图书
    allBook () {
      if (this.$route.name !== 'AllBook') {
        this.$router.replace({ path: '/AdminIndex' })
      }
    },
    // 跳转到增加图书
    addBook () {
      if (this.$route.name !== 'AddBook') {
        this.$router.replace({ path: '/AddBook' })
      }
    },
    // 跳转到删除图书
    delBook () {
      if (this.$route.name !== 'DelBook') {
        this.$router.replace({ path: '/DelBook' })
      }
    },
    // 跳转到借阅登记
    lendingRegistration () {
      if (this.$route.name !== 'LendingRegistration') {
        this.$router.replace({ path: '/LendingRegistration' })
      }
    },
    // 跳转到还书登记
    returnBookRegister () {
      if (this.$route.name !== 'ReturnBookRegister') {
        this.$router.replace({ path: '/ReturnBookRegister' })
      }
    },
    // 跳转到续借处理
    renewProcessing () {
      if (this.$route.name !== 'RenewProcessing') {
        this.$router.replace({ path: '/RenewProcessing' })
      }
    },
    // 跳转到全部学生
    allStudent () {
      if (this.$route.name !== 'AllStudent') {
        this.$router.replace({ path: '/AllStudent' })
      }
    },
    // 跳转到增加学生
    addStudent () {
      if (this.$route.name !== 'AddStudent') {
        this.$router.replace({ path: '/AddStudent' })
      }
    },
    // 跳转到删除
    delStudent () {
      if (this.$route.name !== 'DelStudent') {
        this.$router.replace({ path: '/DelStudent' })
      }
    },
    // 退出登录
    logOut () {
      this.$confirm('退出到登录页面,下次需要重新登录, 是否继续?', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.replace({ name: 'adminBox' })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  background-color: #f3f5f6;
  overflow-y:hidden;
}
.container .tac {
  float: left;
}
.container .tac,
.container .tac .navBox,
.container .tac .navBox ul {
  width: 220px;
  height: 100%;
}
.container .tac .navBox h2 {
  margin-left: 20px;
  line-height: 56px;
  color: white;
}
.container .tac .navBox p {
  line-height: 56px;
  color: #96afbe;
  margin-left: 10px;
}
.container .tac .navBox .iconfont {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  display: inline-block;
}
.container .right_head {
  width: calc(100% - 220px);
  height: 55px;
  background-color: white;
  float: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 18px;
  margin-bottom: 18px;
  box-shadow: 0px 2px 5px #dbdedf;
}
.container .right_head .logo {
  width: 40px;
  height: 40px;
}
.container .right_head div {
  color: #a9acae;
}
.container .right_head div img {
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
}
.container .right_head span {
  font-weight: bold;
}
.container .right_bottom {
  width: calc(100% - 256px);
  float: left;
  margin-left: 18px;
}
</style>
