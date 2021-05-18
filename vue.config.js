module.exports = {
  lintOnSave: false, //关闭eslint检查
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    // 以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { // 配置跨域
      '/admin/manager/m_login': {
        target: 'http://127.0.0.1:3000/admin/manager/m_login/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/m_login': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/s_login': {
        target: 'http://127.0.0.1:3000/admin/borrow/s_login/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/s_login': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/s_checkzh/': {
        target: 'http://127.0.0.1:3000/admin/borrow/s_checkzh/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/s_checkzh/': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/s_add/': {
        target: 'http://127.0.0.1:3000/admin/borrow/s_add/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/s_add/': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/StudentForgetPwd/': {
        target: 'http://127.0.0.1:3000/admin/borrow/StudentForgetPwd/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/StudentForgetPwd/': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/StudentUpdatePwd/': {
        target: 'http://127.0.0.1:3000/admin/borrow/StudentUpdatePwd/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/StudentUpdatePwd/': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/AdminForgetPwd/': {
        target: 'http://127.0.0.1:3000/admin/manager/AdminForgetPwd/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/AdminForgetPwd/': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/AdminUpdatePwd/': {
        target: 'http://127.0.0.1:3000/admin/manager/AdminUpdatePwd/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/AdminUpdatePwd/': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/s_queryInfo': {
        target: 'http://127.0.0.1:3000/admin/borrow/s_queryInfo', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/s_queryInfo': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/session': {
        target: 'http://127.0.0.1:3000/admin/borrow/session', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/session': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/allBookPaging': {
        target: 'http://127.0.0.1:3000/admin/library/allBookPaging', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/allBookPaging': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/allBook': {
        target: 'http://127.0.0.1:3000/admin/library/allBook', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/allBook': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/noReturnBook': {
        target: 'http://127.0.0.1:3000/admin/borrow/noReturnBook', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/noReturnBook': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/returnBook': {
        target: 'http://127.0.0.1:3000/admin/borrow/returnBook', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/returnBook': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/punish': {
        target: 'http://127.0.0.1:3000/admin/borrow/punish', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/punish': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/upload': {
        target: 'http://127.0.0.1:3000/admin/borrow/upload', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/upload': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/s_update': {
        target: 'http://127.0.0.1:3000/admin/borrow/s_update', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/s_update': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/renewStatus': {
        target: 'http://127.0.0.1:3000/admin/borrow/renewStatus', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/renewStatus': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/modifyRenewalStatus': {
        target: 'http://127.0.0.1:3000/admin/borrow/modifyRenewalStatus', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/modifyRenewalStatus': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/searchBookPaging/': {
        target: 'http://127.0.0.1:3000/admin/library/searchBookPaging/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/searchBookPaging/': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/searchBook': {
        target: 'http://127.0.0.1:3000/admin/library/searchBook', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/searchBook': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/session': {
        target: 'http://127.0.0.1:3000/admin/manager/session/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/session': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/m_getinfo': {
        target: 'http://127.0.0.1:3000/admin/manager/m_getinfo/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/m_getinfo': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/AllRenewStatus': {
        target: 'http://127.0.0.1:3000/admin/manager/AllRenewStatus/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/AllRenewStatus': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/addReturnBook': {
        target: 'http://127.0.0.1:3000/admin/manager/addReturnBook/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/addReturnBook': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/allBorrowBook': {
        target: 'http://127.0.0.1:3000/admin/library/allBorrowBook/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/allBorrowBook': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/l_borrowadd': {
        target: 'http://127.0.0.1:3000/admin/library/l_borrowadd/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/l_borrowadd': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/allReturnBook': {
        target: 'http://127.0.0.1:3000/admin/library/allReturnBook/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/allReturnBook': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/l_returntable_add': {
        target: 'http://127.0.0.1:3000/admin/library/l_returntable_add/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/l_returntable_add': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/l_ticketadd': {
        target: 'http://127.0.0.1:3000/admin/library/l_ticketadd/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/l_ticketadd': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/allStudenPaging': {
        target: 'http://127.0.0.1:3000/admin/manager/allStudenPaging/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/allStudenPaging': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/allStuden': {
        target: 'http://127.0.0.1:3000/admin/manager/allStuden/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/allStuden': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/searchStudentPaging': {
        target: 'http://127.0.0.1:3000/admin/manager/searchStudentPaging/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/searchStudentPaging': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/searchStudent': {
        target: 'http://127.0.0.1:3000/admin/manager/searchStudent/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/searchStudent': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/manager/addStudent': {
        target: 'http://127.0.0.1:3000/admin/manager/addStudent/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/manager/addStudent': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/s_delete': {
        target: 'http://127.0.0.1:3000/admin/borrow/s_delete/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/s_delete': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/delBook': {
        target: 'http://127.0.0.1:3000/admin/library/delBook/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/delBook': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/bookSort': {
        target: 'http://127.0.0.1:3000/admin/library/bookSort/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/bookSort': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/addBook': {
        target: 'http://127.0.0.1:3000/admin/library/addBook/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/addBook': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/bookInfo': {
        target: 'http://127.0.0.1:3000/admin/library/bookInfo/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/bookInfo': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/borrow/StudentInfo': {
        target: 'http://127.0.0.1:3000/admin/borrow/StudentInfo/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/borrow/StudentInfo': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/gradeNum': {
        target: 'http://127.0.0.1:3000/admin/library/gradeNum/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/gradeNum': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/grade': {
        target: 'http://127.0.0.1:3000/admin/library/grade/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/grade': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/isGrade': {
        target: 'http://127.0.0.1:3000/admin/library/isGrade/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/isGrade': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/avgGrade': {
        target: 'http://127.0.0.1:3000/admin/library/avgGrade/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/avgGrade': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/getComments': {
        target: 'http://127.0.0.1:3000/admin/library/getComments/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/getComments': '' // 请求的时候使用这个api就可以
        }
      },
      '/admin/library/addComment': {
        target: 'http://127.0.0.1:3000/admin/library/addComment/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/admin/library/addComment': '' // 请求的时候使用这个api就可以
        }
      }
    }
  }
}
