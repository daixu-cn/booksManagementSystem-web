<template>
  <div class="container">
    <div class="headBox">
      <p>
        <span>图书编号:</span>
        <el-input v-model="bookId" clearable></el-input>
      </p>
      <p>
        <span>借书人学号:</span>
        <el-input v-model="studentId" clearable></el-input>
      </p>
      <el-button type="primary" icon="iconfont icon-sousuo2" @click="btnBook()">
        <span>提交</span>
      </el-button>
    </div>
    <div class="newest">最新借出状况</div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column prop="student_id" label="借书人学号" width="120"></el-table-column>
      <el-table-column prop="name" label="书名" width="270"></el-table-column>
      <el-table-column prop="author" label="作者" width="180"></el-table-column>
      <el-table-column prop="sort" label="图书类别" width="100"></el-table-column>
      <el-table-column prop="publishingHouse" label="出版社" width="150"></el-table-column>
      <el-table-column prop="outDate" label="借书日期" width="130"></el-table-column>
      <el-table-column prop="returnDate" label="图书到期"></el-table-column>
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
      bookId: '',
      studentId: '',
      searchName: '',
      searchAuthor: '',
      searchPublishingHouse: '',
      pageSize: 7, // 表示一页多少条数据
      totalNum: 0,
      tableData: []
    }
  },
  async created () {
    const url = '/admin/library/allBorrowBook/'
    await axios.get(url).then(res => {
      this.totalNum = res.data.data.length
      for (let i = 0; i < res.data.data.length; i++) {
        this.tableData.push(res.data.data[i])
      }
    })
  },
  methods: {
    btnBook () {
      const url = '/admin/library/l_borrowadd/'
      const params = {
        params: {
          bookId: this.bookId,
          studentId: this.studentId
        }
      }
      axios.get(url, params).then(res => {
        if (res.data.code === 401) {
          this.$message({
            message: '借书人学号不能为空!',
            type: 'warning'
          })
          return
        }
        if (res.data.code === 402) {
          this.$message({
            message: '图书编号不能为空!',
            type: 'warning'
          })
          return
        }
        if (res.data.code === 403) {
          this.$message.error(`没有找到编号为${this.bookId}的图书`)
          return
        }
        if (res.data.code === 404) {
          this.$message.error(`没有找到编号为${this.studentId}的学生`)
          return
        }
        if (res.data.code === 405) {
          this.$message.error(`编号为${this.bookId}的图书已经借出`)
          return
        }
        if (res.data.code === 200) {
          this.$message({
            message: '借书成功',
            type: 'success'
          })
          this.$router.go(0)
        } else {
          this.$message.error('服务器异常,请立马联系系统开发商!')
        }
      })
    },
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
  width: 150px;
  margin-right: 5px;
  color: #7a7d7f;
  font-weight: bold;
}
.headBox p:nth-child(1) span,
.headBox p:nth-child(2) span {
  margin-right: -10px;
}
.headBox p:nth-child(2) span,
.headBox button {
  margin-left: 21px;
}
.headBox button {
  margin-left: 12px;
}
.headBox button span {
  margin-left: 5px;
}
.container .block {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
.container .newest {
  border-top: 1px solid #ccc;
  padding: 5px 0px;
  background-color: #d8dade;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #909399;
}
</style>
