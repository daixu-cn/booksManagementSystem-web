<template>
  <div class="container">
    <div class="titletext">
      <div>忘记密码</div>
      <p>
        <span>想起密码？</span>
        <router-link to="/AdminBox" tag="span">请登录></router-link>
      </p>
    </div>
    <el-steps :active="active" align-center>
      <el-step title="验证"></el-step>
      <el-step title="密码修改"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-input v-if="isStep1Complete" placeholder="请输入对应的个人账号" v-model="id" :disabled="isDisabled">
      <template slot="prepend">账号:</template>
    </el-input>
    <div class="inputName" v-if="isStep1Complete">
      <el-input placeholder="请输入对应的姓名" v-model="name" :disabled="isDisabled">
        <template slot="prepend">姓名:</template>
      </el-input>
    </div>
    <!-- 第二步信息填写开始 -->
    <el-form
      v-if="isStep2Complete"
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="密码" class="inputTowBox">
        <el-input v-model="formLabelAlign.pwd" class="inputTwo" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" class="inputTowBox">
        <el-input v-model="formLabelAlign.verifyPwd" class="inputTwo" show-password></el-input>
      </el-form-item>
    </el-form>
    <!-- 第二步信息填写结束 -->
    <div v-if="isStep3Complete" class="isStep3Complete">
      <h3>密码修改已完成,感谢您的配合!</h3>
    </div>
    <el-button
      :class="this.active<3?'nextBtn':'finish'"
      style="margin-top: 12px;"
      @click="next"
    >{{finish}}</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      isNext: false,
      isDisabled: false,
      active: 0,
      id: '',
      name: '',
      finish: '下一步',
      labelPosition: 'right',
      isStep1Complete: true,
      isStep2Complete: false,
      isStep3Complete: false,
      formLabelAlign: {
        pwd: '',
        verifyPwd: ''
      }
    }
  },

  methods: {
    async next () {
      if (this.id === '') {
        this.$message.error('学号不能为空')
      } else if (this.name === '') {
        this.$message.error('姓名不能为空')
      }
      if (this.active === 0) {
        const url = '/admin/manager/AdminForgetPwd/'
        const params = {
          params: {
            manager_zh: this.id,
            manager_name: this.name
          }
        }
        await axios.post(url, params).then(res => {
          if (res.data.code === 200) {
            this.active++
            this.isStep1Complete = false
            this.isStep2Complete = true
          } else {
            this.$message.error('账号与姓名不匹配,请检查后重新输入')
          }
        })
      }
      const reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}')
      if (this.active === 1) {
        if (this.formLabelAlign.pwd === '') {
          this.$message.error('修改的密码不能为空!')
        } else if (this.formLabelAlign.verifyPwd !== this.formLabelAlign.pwd) {
          this.$message.error('两次密码不相符,请检查后重新输入!')
        } else if (!reg.test(this.formLabelAlign.pwd)) {
          this.$message.error('密码中必须包含字母、数字，要求8~16个字符')
        } else {
          const url2 = '/admin/manager/AdminUpdatePwd/'
          const params2 = {
            params: {
              manager_zh: this.id,
              manager_name: this.name,
              manager_ma: this.formLabelAlign.pwd
            }
          }
          await axios.post(url2, params2).then(res => {
            if (res.data.code === 200) {
              this.active++
              this.isStep2Complete = false
              this.isStep3Complete = true
            } else {
              this.$message.error('node错误')
            }
          })
        }
      } else if (this.active === 2) {
        this.active++
        this.finish = '点击进行登录'
        this.isStep3Complete = false
      } else if (this.active >= 3) {
        this.$router.replace({ name: 'adminBox' })
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 1190px;
  margin: 0 auto;
}
.titletext {
  width: 100%;
  height: 110px;
  background: url(//misc.360buyimg.com/user/reg/3.0.0/css/i/headbg.jpg) repeat-x
    left bottom;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.titletext div {
  height: 34px;
  font-size: 24px;
  color: #333;
}
.titletext p {
  margin-top: 10px;
}
.titletext p span {
  font-size: 16px;
  color: #999;
}
.titletext p span:nth-child(2) {
  color: #ee2222;
}
.titletext p span:nth-child(2):hover {
  cursor: pointer;
  color: #c81623;
  text-decoration: underline;
}
.el-steps--horizontal {
  margin: 80px auto 0px auto;
  width: 50%;
}
.container .el-input {
  width: 36%;
  left: 50%;
  margin-left: -18%;
  margin-top: 50px;
}
.container .el-input__inner {
  height: 54px;
}
.container .nextBtn {
  width: 36%;
  height: 54px;
  display: block;
  margin: 0px auto;
  background-color: #e2231a;
  color: white;
}
.container .nextBtn:hover {
  background-color: #c81623;
}
.container .finish {
  width: 36%;
  height: 54px;
  display: block;
  margin: 0px auto;
  background-color: #85ce61;
  color: white;
}
.container .finish:hover {
  background-color: #93dd6e;
}
.container .inputName {
  margin: -30px auto 30px auto;
}
.container .inputTwo {
  width: 48%;
  left: 0px;
  margin: 0px;
}
.container .inputTowBox {
  padding-left: 370px;
}
.container form {
  margin-top: 40px;
}
.container .isStep3Complete h3 {
  text-align: center;
  margin: 40px;
}
</style>
