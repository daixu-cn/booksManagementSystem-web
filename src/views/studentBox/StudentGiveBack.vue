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
      <el-button type="primary" icon="iconfont icon-sousuo2">
        <span>搜索</span>
      </el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column prop="name" label="书名" width="270"></el-table-column>
      <el-table-column prop="author" label="作者" width="180"></el-table-column>
      <el-table-column prop="sort" label="图书类别" width="100"></el-table-column>
      <el-table-column prop="publishingHouse" label="出版社" width="170"></el-table-column>
      <el-table-column prop="returnDate" label="归还日期"></el-table-column>
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
      pageSize: 7, // 表示一页多少条数据
      totalNum: 0,
      tableData: []
    }
  },
  async created () {
    await this.$store.dispatch('stu_id')
    const url = '/admin/borrow/returnBook/'
    const params = {
      params: {
        stu_id: this.$store.state.studentId
      }
    }
    await axios.get(url, params).then(res => {
      this.totalNum = res.data.data.length
      for (let i = 0; i < res.data.data.length; i++) {
        this.tableData.push(res.data.data[i])
      }
    })
  },
  methods: {
    handleCurrentChange (val) {}
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
</style>
