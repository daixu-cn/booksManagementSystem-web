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
      <el-table-column
        prop="tag"
        label="是否允许续借"
        filter-placement="bottom-end"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '不允许' ? 'danger' : 'success'"
            disable-transitions
            style="cursor: pointer"
            @click="allow($event)"
          >{{scope.row.tag}}</el-tag>
          <el-tag
            :type="scope.row.tag2 === '不允许' ? 'danger' : 'success'"
            disable-transitions
            style="cursor: pointer;margin-left:20px"
            @click="notAllow($event)"
          >{{scope.row.tag2}}</el-tag>
        </template>
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
      pageSize: 7, // 表示一页多少条数据
      totalNum: 0,
      tableData: []
    }
  },
  async created () {
    const url = '/admin/manager/AllRenewStatus/'
    await axios.get(url).then(res => {
      this.totalNum = res.data.data.length
      for (let i = 0; i < res.data.data.length; i++) {
        const obj = res.data.data[i]
        obj.tag = '允许'
        obj.tag2 = '不允许'
        this.tableData.push(obj)
      }
    })
  },
  methods: {
    handleCurrentChange (val) {},
    allow (event) {
      const bookId =
        event.target.parentNode.parentNode.parentNode.firstChild.firstChild
          .innerText
      const url = '/admin/manager/addReturnBook/'
      const params = {
        params: {
          bookId: Number(bookId),
          ApplicationStatus: 3
        }
      }
      axios.post(url, params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '审批成功',
            type: 'success'
          })
          this.$router.go(0)
        } else {
          this.$message.error('服务器繁忙请稍后再试')
        }
      })
    },
    notAllow (event) {
      const bookId =
        event.target.parentNode.parentNode.parentNode.firstChild.firstChild
          .innerText
      const url = '/admin/borrow/modifyRenewalStatus/'
      const params = {
        params: {
          bookId: Number(bookId),
          ApplicationStatus: 2
        }
      }
      axios.post(url, params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '审批成功',
            type: 'success'
          })
          this.$router.go(0)
        } else {
          this.$message.error('服务器繁忙请稍后再试')
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
</style>
