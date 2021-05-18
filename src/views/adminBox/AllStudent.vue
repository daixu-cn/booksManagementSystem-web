<template>
  <div class="container">
    <div class="headBox">
      <p>
        <span>学号:</span>
        <el-input v-model="searchID" clearable></el-input>
      </p>
      <p>
        <span>姓名:</span>
        <el-input v-model="searchName" clearable></el-input>
      </p>
      <el-button type="primary" icon="iconfont icon-sousuo2" @click="search()">
        <span>搜索</span>
      </el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="学号" width="190"></el-table-column>
      <el-table-column prop="name" label="名字" width="150"></el-table-column>
      <el-table-column prop="sex" label="性别" width="120"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="domain" label="专业" width="180"></el-table-column>
      <el-table-column prop="grade" label="年级" width="100"></el-table-column>
      <el-table-column prop="borrowedBook" label="所借图书" width="110"></el-table-column>
      <el-table-column prop="notReturnBook" label="已还图书"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="totalNum"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      searchID: '',
      searchName: '',
      pageSize: 8, // 表示一页多少条数据
      tableData: [],
      isSearch: true
    }
  },
  async created () {
    const bookAllUrl = '/admin/manager/allStuden/'
    await axios.get(bookAllUrl).then(res => {
      this.$store.commit('setBookQueriesNum', res.data.total)
      for (let i = 0; i < this.pageSize; i++) {
        this.tableData.push(res.data.data[i])
      }
      this.tableData.map(item => {
        if (item.sex === '1') {
          item.sex = '男'
          item.borrowedBook = item.borrowedBook + '(本)'
          item.notReturnBook = item.notReturnBook + '(本)'
          return item
        } else {
          item.sex = '女'
          item.borrowedBook = item.borrowedBook + '(本)'
          item.notReturnBook = item.notReturnBook + '(本)'
          return item
        }
      })
    })
  },
  computed: {
    totalNum () {
      return this.$store.state.bookQueriesNum
    }
  },
  methods: {
    handleCurrentChange (val) {
      if (this.isSearch) {
        const bookAllPagingUrl = '/admin/manager/allStudenPaging/'
        const params = {
          params: {
            paging: val,
            pageSize: this.pageSize
          }
        }
        axios.get(bookAllPagingUrl, params).then(res => {
          this.tableData = []
          for (let i = 0; i < res.data.data.length; i++) {
            this.tableData.push(res.data.data[i])
          }
          this.tableData.map(item => {
            if (item.sex === '1') {
              item.sex = '男'
              item.borrowedBook = item.borrowedBook + '(本)'
              item.notReturnBook = item.notReturnBook + '(本)'
              return item
            } else {
              item.sex = '女'
              item.borrowedBook = item.borrowedBook + '(本)'
              item.notReturnBook = item.notReturnBook + '(本)'
              return item
            }
          })
        })
      } else {
        let searchID = this.searchID
        let searchName = this.searchName
        if (this.searchID === '') {
          searchID = 'ぼ'
        }
        if (this.searchName === '') {
          searchName = 'ぼ'
        }

        const url = '/admin/manager/searchStudentPaging/'
        const params = {
          params: {
            searchID: searchID,
            searchName: searchName,
            paging: val,
            pageSize: this.pageSize
          }
        }
        axios.get(url, params).then(res => {
          this.tableData = []
          for (let i = 0; i < res.data.data.length; i++) {
            this.tableData.push(res.data.data[i])
          }
          this.tableData.map(item => {
            if (item.sex === '1') {
              item.sex = '男'
              item.borrowedBook = item.borrowedBook + '(本)'
              item.notReturnBook = item.notReturnBook + '(本)'
              return item
            } else {
              item.sex = '女'
              item.borrowedBook = item.borrowedBook + '(本)'
              item.notReturnBook = item.notReturnBook + '(本)'
              return item
            }
          })
        })
      }
    },
    search () {
      if (this.searchID === '' && this.searchName === '') {
        this.$message({
          message: '内容为空,搜索失败!',
          type: 'warning'
        })
        const bookAllUrl = '/admin/manager/allStuden/'
        axios.get(bookAllUrl).then(res => {
          this.tableData = []
          this.$store.commit('setBookQueriesNum', res.data.total)
          for (let i = 0; i < this.pageSize; i++) {
            this.tableData.push(res.data.data[i])
          }
          this.tableData.map(item => {
            if (item.sex === '1') {
              item.sex = '男'
              item.borrowedBook = item.borrowedBook + '(本)'
              item.notReturnBook = item.notReturnBook + '(本)'
              return item
            } else {
              item.sex = '女'
              item.borrowedBook = item.borrowedBook + '(本)'
              item.notReturnBook = item.notReturnBook + '(本)'
              return item
            }
          })
        })
        this.isSearch = true
        return
      }
      const url = '/admin/manager/searchStudent/'
      let searchID = this.searchID
      let searchName = this.searchName
      if (this.searchID === '') {
        searchID = 'ぼ'
      }
      if (this.searchName === '') {
        searchName = 'ぼ'
      }
      const params = {
        params: {
          searchID: searchID,
          searchName: searchName
        }
      }
      axios.get(url, params).then(res => {
        this.$store.commit('setBookQueriesNum', res.data.total)
        this.tableData = []
        if (res.data.code === 200) {
          this.isSearch = false
          this.$message({
            message: `搜索成功,共${res.data.total}条数据`,
            type: 'success'
          })
          if (res.data.total < 8) {
            for (let i = 0; i < res.data.total; i++) {
              this.tableData.push(res.data.data[i])
            }
          } else {
            for (let i = 0; i < this.pageSize; i++) {
              this.tableData.push(res.data.data[i])
            }
          }
          this.tableData.map(item => {
            if (item.sex === '1') {
              item.sex = '男'
              item.borrowedBook = item.borrowedBook + '(本)'
              item.notReturnBook = item.notReturnBook + '(本)'
              return item
            } else {
              item.sex = '女'
              item.borrowedBook = item.borrowedBook + '(本)'
              item.notReturnBook = item.notReturnBook + '(本)'
              return item
            }
          })
        } else {
          this.$message('未查询到相关书籍,请更换搜索词后重新搜索!')
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  background-color: white;
  box-sizing: border-box;
  border-bottom: #eceef0 solid 2px;
  padding: 0px 18px;
}
.headBox {
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.headBox p {
  display: flex;
  justify-content: center;
  align-items: center;
}
.headBox p span {
  display: inline-block;
  width: 70px;
  margin-right: 5px;
  color: #7a7d7f;
  font-weight: bold;
}
.headBox p:nth-child(1) span,
.headBox p:nth-child(2) span {
  margin-right: -10px;
}
.headBox p:nth-child(2) span,
.headBox p:nth-child(3) span,
.headBox button {
  margin-left: 7px;
}
.headBox button span {
  margin-left: 5px;
}
.container .block {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
.container .details {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
  display: inline-block;
  height: 23px;
  padding: 0 5px;
  line-height: 23px;
  font-size: 12px;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  box-sizing: border-box;
  white-space: nowrap;
  cursor: pointer;
}
.container .details:hover {
  background-color: #e6f8dd;
}
.container .details:focus {
  outline: 0;
}
</style>
