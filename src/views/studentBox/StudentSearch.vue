<template>
  <div class="container">
    <div class="headBox">
      <p>
        <span>书名:</span>
        <el-input v-model="searchName" clearable></el-input>
      </p>
      <p>
        <span>作者:</span>
        <el-input v-model="searchAuthor" clearable></el-input>
      </p>
      <p>
        <span>出版社:</span>
        <el-input v-model="searchPublishingHouse " clearable></el-input>
      </p>
      <el-button type="primary" icon="iconfont icon-sousuo2" @click="search()">
        <span>搜索</span>
      </el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column prop="name" label="书名" width="270"></el-table-column>
      <el-table-column prop="author" label="作者" width="200"></el-table-column>
      <el-table-column prop="sort" label="图书类别" width="130"></el-table-column>
      <el-table-column prop="publishingHouse" label="出版社" width="220"></el-table-column>
      <el-table-column prop="isLibrary" label="是否在馆" width="80"></el-table-column>
      <el-table-column prop="details" label="图书详情">
        <button class="details" @click='detailPage($event)'>查看图书</button>
      </el-table-column>
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
      searchName: '',
      searchAuthor: '',
      searchPublishingHouse: '',
      pageSize: 8, // 表示一页多少条数据
      tableData: [],
      isSearch: true
    }
  },
  async created () {
    const bookAllUrl = '/admin/library/allBook/'
    await axios.get(bookAllUrl).then(res => {
      this.$store.commit('setBookQueriesNum', res.data.total)
      for (let i = 0; i < this.pageSize; i++) {
        this.tableData.push(res.data.data[i])
      }
      this.tableData.map(item => {
        item.details = '查看图书'
        if (item.isLibrary === 1) {
          item.isLibrary = '是'
          return item
        } else if (item.isLibrary === 0) {
          item.isLibrary = '否'
          return item
        } else {
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
    detailPage (event) {
      const id = event.target.parentNode.parentNode.parentNode.firstChild.innerText
      this.$router.replace({ path: '/DetailPage', query: { id } })
    },
    handleCurrentChange (val) {
      if (this.isSearch) {
        const bookAllPagingUrl = '/admin/library/allBookPaging/'
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
            item.details = '查看图书'
            if (item.isLibrary === 1) {
              item.isLibrary = '是'
              return item
            } else if (item.isLibrary === 0) {
              item.isLibrary = '否'
              return item
            } else {
              return item
            }
          })
        })
      } else {
        let searchName = this.searchName
        let searchAuthor = this.searchAuthor
        let searchPublishingHouse = this.searchPublishingHouse
        if (this.searchName === '') {
          searchName = 'ぼ'
        }
        if (this.searchAuthor === '') {
          searchAuthor = 'ぼ'
        }
        if (this.searchPublishingHouse === '') {
          searchPublishingHouse = 'ぼ'
        }

        const url = '/admin/library/searchBookPaging/'
        const params = {
          params: {
            searchName: searchName,
            searchAuthor: searchAuthor,
            searchPublishingHouse: searchPublishingHouse,
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
            item.details = '查看图书'
            if (item.isLibrary === 1) {
              item.isLibrary = '是'
              return item
            } else if (item.isLibrary === 0) {
              item.isLibrary = '否'
              return item
            } else {
              return item
            }
          })
        })
      }
    },
    search () {
      if (
        this.searchName === '' &&
        this.searchAuthor === '' &&
        this.searchPublishingHouse === ''
      ) {
        this.$message({
          message: '内容为空,搜索失败!',
          type: 'warning'
        })
        const bookAllUrl = '/admin/library/allBook/'
        axios.get(bookAllUrl).then(res => {
          this.tableData = []
          this.$store.commit('setBookQueriesNum', res.data.total)
          for (let i = 0; i < this.pageSize; i++) {
            this.tableData.push(res.data.data[i])
          }
          this.tableData.map(item => {
            item.details = '查看图书'
            if (item.isLibrary === 1) {
              item.isLibrary = '是'
              return item
            } else if (item.isLibrary === 0) {
              item.isLibrary = '否'
              return item
            } else {
              return item
            }
          })
        })
        this.isSearch = true
        return
      }
      const url = '/admin/library/searchBook/'
      let searchName = this.searchName
      let searchAuthor = this.searchAuthor
      let searchPublishingHouse = this.searchPublishingHouse
      if (this.searchName === '') {
        searchName = 'ぼ'
      }
      if (this.searchAuthor === '') {
        searchAuthor = 'ぼ'
      }
      if (this.searchPublishingHouse === '') {
        searchPublishingHouse = 'ぼ'
      }
      const params = {
        params: {
          searchName: searchName,
          searchAuthor: searchAuthor,
          searchPublishingHouse: searchPublishingHouse
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
            item.details = '查看图书'
            if (item.isLibrary === 1) {
              item.isLibrary = '是'
              return item
            } else if (item.isLibrary === 0) {
              item.isLibrary = '否'
              return item
            } else {
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
