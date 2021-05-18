<template>
  <div class="loginInputBox">
    <el-input
      @input="IdInput($event)"
      v-model="$store.state.studentId"
      placeholder="学号:"
      clearable
      :autofocus="true"
    ></el-input>
    <el-input
      @input="PwdInput($event)"
      v-model="$store.state.studentPwd"
      class="el-input__inner-X"
      placeholder="密码:"
      show-password
    ></el-input>
  </div>
</template>

<script>
export default {
  methods: {
    IdInput: function (value) {
      this.$store.commit('setStudentId', value)
    },
    PwdInput: function (value) {
      this.$store.commit('setStudentPwd', value)
    }
  }
}
</script>

<style>
.loginInputBox {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.loginInputBox .el-input {
  width: 330px;
  display: block;
}
.loginInputBox .el-input__inner {
  border-radius: 50px;
  width: 330px;
  height: 45px;
  margin: 0 auto;
  display: block;
  background-color: rgb(255, 255, 255, 0.7);
}
.loginInputBox .el-input__inner-X {
  margin-top: 25px;
}
.loginInputBox input::-webkit-input-placeholder {
  color: rgb(153, 153, 153, 0.8);
}
</style>
