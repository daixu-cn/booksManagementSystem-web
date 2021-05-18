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
      <el-table-column prop="name" label="书名"></el-table-column>
      <el-table-column prop="author" label="作者" width="180"></el-table-column>
      <el-table-column prop="sort" label="图书类别" width="100"></el-table-column>
      <el-table-column prop="publishingHouse" label="出版社" width="140"></el-table-column>
      <el-table-column prop="outDate" label="借书日期" width="100"></el-table-column>
      <el-table-column prop="returnDate" label="图书到期" width="100"></el-table-column>
      <el-table-column
        prop="tag"
        label="是否续借"
        width="120"
        filter-placement="bottom-end"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '申请续借' ? 'primary' : 'success'"
            disable-transitions
            style="cursor: pointer"
            @click="btnApply($event)"
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ApplicationStatus" label="申请状况">
        <template slot-scope="applyStatus">
          <el-tag
            :type="applyStatus.row.statusText === '续借成功' ? 'success' : 'danger'"
            class="textColor"
            disable-transitions
          >{{applyStatus.row.statusText}}</el-tag>
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
      tableData: [],
      haveAppliedList: [] // 存储已经申请过的书,

    }
  },
  async created () {
    await this.$store.dispatch('stu_id')
    const url = '/admin/borrow/renewStatus/'
    const params = {
      params: {
        stu_id: this.$store.state.studentId
      }
    }
    await axios.get(url, params).then(res => {
      this.totalNum = res.data.length
      for (let i = 0; i < res.data.data.length; i++) {
        this.tableData.push(res.data.data[i])
      }
      this.tableData.map(item => {
        if (item.ApplicationStatus === 1) {
          this.haveAppliedList.push(item.id)
          item.tag = '已申请续借'
          item.statusText = '申请续借中,等待管理员审批'
        } else if (item.ApplicationStatus === 2) {
          this.haveAppliedList.push(item.id)
          item.statusText = '续借不通过,请联系管理员了解信息'
          item.tag = '已申请续借'
        } else if (item.ApplicationStatus === 3) {
          this.haveAppliedList.push(item.id)
          item.statusText = '续借成功'
          item.tag = '已申请续借'
        } else {
          item.tag = '申请续借'
          item.ApplicationStatus = ''
        }
      })
    })
  },
  methods: {
    handleCurrentChange (val) {},
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    },
    btnApply (e) {
      const bookId =
        e.target.parentNode.parentNode.parentNode.firstChild.firstChild
          .innerText
      let key = true
      for (let i = 0; i < this.haveAppliedList.length; i++) {
        if (this.haveAppliedList[i] === Number(bookId)) {
          this.$message({
            message: '不可重复申请！',
            type: 'warning'
          })
          key = false
        }
      }
      if (key === true) {
        const url = '/admin/borrow/modifyRenewalStatus/'
        const params = {
          params: {
            bookId: bookId,
            ApplicationStatus: 1
          }
        }
        axios.post(url, params).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '续借申请已发送,请耐心等待',
              type: 'success'
            })
          }
          this.$router.go(0)
        })
      }
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
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
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
  transition: all 0.5s;
}
.container .details:hover {
  background-color: #409eff;
}
.container .details:focus {
  outline: 0;
}
.container .textColor{
  border:none;
  background:none;
  white-space: normal;
  height:0px;
  margin-left: -10px;
  font-size: 16px;
}
</style>
