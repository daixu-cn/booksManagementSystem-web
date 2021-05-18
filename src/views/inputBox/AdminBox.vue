<template>
  <div class="loginInputBox">
    <el-input
      @input="IdInput($event)"
      v-model="$store.state.adminId"
      placeholder="管理员账号:"
      clearable
      :autofocus="true"
    ></el-input>
    <el-input
      @input="PwdInput($event)"
      v-model="$store.state.adminPwd"
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
      this.$store.commit('setAdminId', value)
    },
    PwdInput: function (value) {
      this.$store.commit('setAdminPwd', value)
    }
  }
}
</script>

<style scoped>
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
  background-color: rgb(255, 255, 255, 0.6);
}
.loginInputBox .el-input__inner-X {
  margin-top: 25px;
}
.loginInputBox input::-webkit-input-placeholder {
  color: #333532;
}
</style>
