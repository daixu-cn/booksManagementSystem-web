import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminId: '',
    adminPwd: '',
    studentId: '',
    studentPwd: '',
    bookQueriesNum: 0
  },
  mutations: {
    setAdminId (state, value) {
      state.adminId = value
    },
    setAdminPwd (state, value) {
      state.adminPwd = value
    },
    setStudentId (state, value) {
      state.studentId = value
    },
    setStudentPwd (state, value) {
      state.studentPwd = value
    },
    setBookQueriesNum (state, value) {
      state.bookQueriesNum = value
    }
  },
  actions: {
    stu_id: async function (content) { // content就是store
      const httpUrl = '/admin/borrow/session/'
      const result = await axios.post(httpUrl)
      await content.commit('setStudentId', result.data.session.stu_id)
    },
    admin_zh: async function (content) { // content就是store
      const httpUrl = '/admin/manager/session/'
      const result = await axios.post(httpUrl)
      await content.commit('setAdminId', result.data.session.manager_zh)
    }
  },
  modules: {}
})
