import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import LoginBox from '../views/inputBox/LoginBox.vue'
import AdminBox from '../views/inputBox/AdminBox.vue'
import AdminIndex from '../views/AdminIndex.vue'
import StudentIndex from '../views/StudentIndex.vue'
import Register from '../views/Register.vue'
import StudentForgetPwd from '../views/StudentForgetPwd.vue'
import AdminForgetPwd from '../views/AdminForgetPwd.vue'
import StudentSearch from '../views/studentBox/StudentSearch.vue'
import StudentBorrow from '../views/studentBox/StudentBorrow.vue'
import StudentGiveBack from '../views/studentBox/StudentGiveBack.vue'
import StudentOverdue from '../views/studentBox/StudentOverdue.vue'
import StudentRenew from '../views/studentBox/StudentRenew.vue'
import DetailPage from '../views/studentBox/DetailPage.vue'
import StudentPersonage from '../views/studentBox/StudentPersonage.vue'
import AddBook from '../views/adminBox/AddBook.vue'
import DelBook from '../views/adminBox/DelBook.vue'
import AllBook from '../views/adminBox/AllBook.vue'
import LendingRegistration from '../views/adminBox/LendingRegistration.vue'
import ReturnBookRegister from '../views/adminBox/ReturnBookRegister.vue'
import RenewProcessing from '../views/adminBox/RenewProcessing.vue'
import AllStudent from '../views/adminBox/AllStudent.vue'
import AddStudent from '../views/adminBox/AddStudent.vue'
import DelStudent from '../views/adminBox/DelStudent.vue'

Vue.use(VueRouter)

// 解决在使用ElementUI中的导航时，默认情况下如果重复点击某选项，会报错。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  // name: 'login',
  component: Login,
  children: [{
    path: '/',
    name: 'loginBox',
    component: LoginBox
  }, {
    path: '/AdminBox',
    name: 'adminBox',
    component: AdminBox
  }]
},
{
  path: '/AdminIndex',
  // name: 'adminIndex',
  component: AdminIndex,
  children: [{
    path: '/',
    name: 'AllBook',
    component: AllBook
  }, {
    path: '/AddBook',
    name: 'AddBook',
    component: AddBook
  },
  {
    path: '/DelBook',
    name: 'DelBook',
    component: DelBook
  },
  {
    path: '/RenewProcessing',
    name: 'RenewProcessing',
    component: RenewProcessing
  },
  {
    path: '/LendingRegistration',
    name: 'LendingRegistration',
    component: LendingRegistration
  },
  {
    path: '/ReturnBookRegister',
    name: 'ReturnBookRegister',
    component: ReturnBookRegister
  },
  {
    path: '/AllStudent',
    name: 'AllStudent',
    component: AllStudent
  },
  {
    path: '/AddStudent',
    name: 'AddStudent',
    component: AddStudent
  },
  {
    path: '/DelStudent',
    name: 'DelStudent',
    component: DelStudent
  }
  ]
},
{
  path: '/StudentIndex',
  // name: 'studentIndex',
  component: StudentIndex,
  children: [{
    path: '/',
    name: 'studentSearch',
    component: StudentSearch
  },
  {
    path: '/StudentBorrow',
    name: 'studentBorrow',
    component: StudentBorrow
  },
  {
    path: '/StudentGiveBack',
    name: 'studentGiveBack',
    component: StudentGiveBack
  },
  {
    path: '/StudentOverdue',
    name: 'studentOverdue',
    component: StudentOverdue
  },
  {
    path: '/StudentRenew',
    name: 'studentRenew',
    component: StudentRenew
  },
  {
    path: '/StudentPersonage',
    name: 'studentPersonage',
    component: StudentPersonage
  },
  {
    path: '/DetailPage',
    name: 'detailPage',
    component: DetailPage
  }
  ]
},
{
  path: '/Register',
  name: 'register',
  component: Register
},
{
  path: '/StudentForgetPwd',
  name: 'studentForgetPwd',
  component: StudentForgetPwd
},
{
  path: '/AdminForgetPwd',
  name: 'adminForgetPwd',
  component: AdminForgetPwd
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
