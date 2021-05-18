<template>
  <div class="container">
    <div class="titletext">
      <div>欢迎注册</div>
      <p>
        <span>已有账号？</span>
        <router-link to="/" tag="span">请登录></router-link>
      </p>
    </div>
    <el-steps :active="active" align-center>
      <el-step title="验证"></el-step>
      <el-step title="信息填写"></el-step>
      <el-step title="确认"></el-step>
    </el-steps>
    <el-input v-if="isStep1Complete" placeholder="请输入对应的个人学号" v-model="input" :disabled="isDisabled">
      <template slot="prepend">学号:</template>
    </el-input>
    <el-row v-if="isStep1Complete">
      <el-button plain class="defaultBtn" @click="defaultBtn()">点击按钮进行验证</el-button>
    </el-row>
    <!-- 第二步信息填写开始 -->
    <el-form v-if="isStep2Complete" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="姓名" class="inputTowBox">
        <el-input el-input v-model="formLabelAlign.name" class="inputTwo"></el-input>
      </el-form-item>
      <el-form-item label="所在专业" class="inputTowBox">
        <el-input v-model="formLabelAlign.region" class="inputTwo"></el-input>
      </el-form-item>
      <el-form-item label="密码" class="inputTowBox">
        <el-input v-model="formLabelAlign.pwd" class="inputTwo" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" class="inputTowBox">
        <el-input v-model="formLabelAlign.verifyPwd" class="inputTwo" show-password></el-input>
      </el-form-item>
      <el-form-item label="性别" class="inputTowBox">
        <el-radio v-model="radio" label="1">男</el-radio>
        <el-radio v-model="radio" label="0">女</el-radio>
      </el-form-item>
    </el-form>
    <!-- 第二步信息填写结束 -->

    <!-- 第三步信息确认开始 -->
    <div class="step3Complete" v-if="isStep3Complete">
      <div class="step3CompleteList">
        <p>学号:</p>
        <input type="text" :placeholder="input" disabled />
      </div>
      <div class="step3CompleteList">
        <p>姓名:</p>
        <input type="text" :placeholder="formLabelAlign.name" disabled />
      </div>
      <div class="step3CompleteList">
        <p>密码:</p>
        <input type="text" :placeholder="formLabelAlign.pwd" disabled />
      </div>
      <div class="step3CompleteList">
        <p>性别:</p>
        <input type="text" :placeholder="radio==0?'女':'男'" disabled />
      </div>
      <div class="step3CompleteList">
        <p>所在专业:</p>
        <input type="text" :placeholder="formLabelAlign.region" disabled />
      </div>
    </div>
    <!-- 第三步信息确认开始 -->
    <el-button :class="this.active<3?'nextBtn':'finish'" style="margin-top: 12px;" @click="next">{{finish}}</el-button>
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
      input: '',
      input2: '',
      finish: '下一步',
      isStep1Complete: true,
      isStep2Complete: false,
      isStep3Complete: false,
      radio: -1,
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        pwd: '',
        verifyPwd: ''
      }
    }
  },

  methods: {
    next () {
      if (this.isNext) {
        this.active++
        if (this.active === 1) {
          this.isStep1Complete = false
          this.isStep2Complete = true
        } else if (this.active === 2) {
          const reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}')
          if (this.formLabelAlign.name === '') {
            this.active = 1
            this.$message.error('姓名填写不能为空!')
          } else if (this.formLabelAlign.region === '') {
            this.active = 1
            this.$message.error('专业填写不能为空!')
          } else if (
            this.formLabelAlign.pwd !== this.formLabelAlign.verifyPwd
          ) {
            this.active = 1
            this.$message.error('两次输入的密码不相符，请检测后重新测试')
          } else if (
            !reg.test(this.formLabelAlign.pwd) &&
            this.formLabelAlign.pwd !== ''
          ) {
            this.active = 1
            this.$message.error('密码中必须包含字母、数字，要求8~16个字符')
          } else if (this.formLabelAlign.pwd === '') {
            this.$alert(
              "您未填写密码,登录时可用默认密码'123456'",
              '密码设置提醒',
              {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${action}`
                  })
                }
              }
            )
            if (this.radio === -1) {
              this.radio = 0
            }
            this.isStep2Complete = false
            this.isStep3Complete = true
            this.formLabelAlign.pwd = '123456'
          } else {
            this.isStep2Complete = false
            this.isStep3Complete = true
            if (this.radio === -1) {
              this.radio = 0
            }
          }
        } else if (this.active === 3) {
          this.finish = '注册成功,点击跳转到登录页'
          this.active = 3
          this.isStep3Complete = false
          const url = '/admin/borrow/s_add/'
          const params = {
            params: {
              stu_id: this.input,
              stu_name: this.formLabelAlign.name,
              stu_pro: this.formLabelAlign.region,
              stu_ma: this.formLabelAlign.pwd,
              stu_sex: this.radio
            }
          }
          axios.post(url, params).then(res => {
            if (res.data.code !== 200) {
              this.$message.error('服务器错误,请刷新后重试')
            }
          })
        }
        if (this.active > 3) {
          this.$router.replace({ name: 'loginBox' })
        }
      } else {
        this.$message.error('请先验证学号,否则无法进去下一步!')
      }
    },
    defaultBtn () {
      const url = '/admin/borrow/s_checkzh/'
      const params = {
        params: {
          stu_id: this.input
        }
      }
      axios.get(url, params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '验证成功，点击下一步',
            type: 'success'
          })
          this.isDisabled = true
          this.isNext = true
        } else if (res.data.code === 401) {
          this.$message.error('学号不能为空')
        } else if (res.data.code === 402) {
          this.$message.error('学号必须为十位数字')
        } else {
          this.$message.error(
            '学号已被注册,请检查后重新输入!或联系管理员电话(110)'
          )
        }
      })
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
.container .defaultBtn {
	width: 36%;
	height: 54px;
	display: block;
	margin: 15px auto 34px auto;
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
.container .step3Complete {
	width: 36%;
	margin: 0 auto;
}
.container .step3Complete .step3CompleteList {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container .step3Complete .step3CompleteList:nth-child(1) {
	margin-top: 30px;
}
.container .step3Complete .step3CompleteList p {
	width: 50%;
	height: 40px;
	box-sizing: border-box;
	padding-right: 12px;
	font-size: 20px;
	color: #606266;
	line-height: 40px;
	text-align: right;
}
.container .step3Complete .step3CompleteList input {
	font-size: 20px;
	border: none;
	outline: 0;
	background: none;
	height: 40px;
	line-height: 40px;
	margin-left: 10px;
}
</style>
