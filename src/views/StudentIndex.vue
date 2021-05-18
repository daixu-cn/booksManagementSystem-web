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
        >
          <h2>学生图书系统</h2>
          <p>分类</p>
          <el-menu-item index="1" @click="search()">
            <i class="iconfont icon-sousuo2"></i>
            <span slot="title">图书查询&借阅</span>
          </el-menu-item>
          <el-menu-item index="2" @click="borrow()">
            <i class="iconfont icon-jiekuanshenqing"></i>
            <span slot="title">已借图书</span>
          </el-menu-item>
          <el-menu-item index="3" @click="giveBack()">
            <i class="iconfont icon-huankuanshenqing"></i>
            <span slot="title">归还图书</span>
          </el-menu-item>
          <el-menu-item index="4" @click="overdue()">
            <i class="iconfont icon-yiyuqi"></i>
            <span slot="title">逾期信息</span>
          </el-menu-item>
          <el-menu-item index="5" @click="renew()">
            <i class="iconfont icon-xuqi"></i>
            <span slot="title">续借办理</span>
          </el-menu-item>
          <el-menu-item index="6" @click="personage()">
            <i class="iconfont icon-geren3"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="7" @click="logOut()">
            <i class="iconfont icon-084tuichu"></i>
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
        <img :src="stu_img" />
        <span>【{{stu_name}}】</span>
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
      stu_img: '',
      stu_name: '',
      defaultActive: '1'
    }
  },
  async created () {
    if (this.$route.name === 'studentSearch') {
      this.defaultActive = '1'
    } else if (this.$route.name === 'studentBorrow') {
      this.defaultActive = '2'
    } else if (this.$route.name === 'studentGiveBack') {
      this.defaultActive = '3'
    } else if (this.$route.name === 'studentOverdue') {
      this.defaultActive = '4'
    } else if (this.$route.name === 'studentRenew') {
      this.defaultActive = '5'
    } else if (this.$route.name === 'studentPersonage') {
      this.defaultActive = '6'
    }
    await this.$store.dispatch('stu_id')
    const url = '/admin/borrow/s_queryInfo/'
    const params = {
      params: {
        stu_id: this.$store.state.studentId
      }
    }
    await axios.post(url, params).then(res => {
      this.stu_img = res.data.data.stu_img
      this.stu_name = res.data.data.stu_name
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
    // 退出登录
    logOut () {
      this.$confirm('退出到登录页面,下次需要重新登录, 是否继续?', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.replace({ name: 'loginBox' })
      }).catch(() => {})
    },
    // 跳转到搜索查询
    search () {
      if (this.$route.name !== 'StudentSearch') {
        this.$router.replace({ path: '/StudentIndex' })
      }
    },
    // 跳转到已借图书
    borrow () {
      if (this.$route.name !== 'StudentBorrow') {
        this.$router.replace({ path: '/StudentBorrow' })
      }
    },
    // 跳转到归还图书
    giveBack () {
      if (this.$route.name !== 'StudentGiveBack') {
        this.$router.replace({ path: '/StudentGiveBack' })
      }
    },
    // 跳转到逾期信息
    overdue () {
      if (this.$route.name !== 'StudentOverdue') {
        this.$router.replace({ path: '/StudentOverdue' })
      }
    },
    // 跳转到续借办理
    renew () {
      if (this.$route.name !== 'StudentRenew') {
        this.$router.replace({ path: '/StudentRenew' })
      }
    },
    // 跳转到个人信息
    personage () {
      if (this.$route.name !== 'StudentPersonage') {
        this.$router.replace({ path: '/StudentPersonage' })
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  background-color: #f3f5f6;
}
.container .tac {
  float: left;
    position: fixed;
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
  float: right;
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
  float: right;
  margin-right: 18px;
}
</style>
