<template>
  <div class="container">
    <div class="left">
      <div class="box clearfix">
        <p>书名</p>
        <el-input v-model="name" class="inp"></el-input>
      </div>
      <div class="box clearfix">
        <p>作者</p>
        <el-input v-model="author" class="inp"></el-input>
      </div>
      <div class="box clearfix">
        <p>定价</p>
        <el-input v-model="price" class="inp"></el-input>
      </div>
      <div class="box clearfix">
        <p>页数</p>
        <el-input v-model="pagination" class="inp"></el-input>
      </div>
    </div>
    <div class="right">
      <div class="box clearfix">
        <p>分类</p>
        <el-select v-model="sort" placeholder="请选择" class="inp">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="box clearfix">
        <p>副标题</p>
        <el-input v-model="subhead" class="inp"></el-input>
      </div>
      <div class="box clearfix">
        <p>出版社</p>
        <el-input v-model="publishingHouse" class="inp"></el-input>
      </div>
      <div class="box clearfix">
        <p>出版时间</p>
        <el-input v-model="publicationTime" class="inp"></el-input>
      </div>
    </div>
    <el-button type="success" round class="btn" @click="btn">成功按钮</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      author: '',
      price: '',
      pagination: '', // 页数
      sort: '', // 分类
      subhead: '', // 副标题
      publishingHouse: '', // 出版社
      publicationTime: '', // 出版时间
      options: []
    }
  },
  async created () {
    await axios('/admin/library/bookSort/').then(res => {
      res.data.data.map(item => {
        const obj = {
          value: item.sort_id,
          label: item.sort_name
        }
        this.options.push(obj)
      })
    })
  },
  methods: {
    btn () {
      const url = '/admin/library/addBook/'
      const params = {
        params: {
          name: `《${this.name}》`,
          author: this.author,
          price: this.price,
          pagination: this.pagination, // 页数
          sort: this.sort, // 分类
          subhead: this.subhead, // 副标题
          publishingHouse: this.publishingHouse, // 出版社
          publicationTime: this.publicationTime // 出版时间
        }
      }
      if (this.name === '') {
        this.$message({
          message: '书名不能为空!',
          type: 'warning'
        })
        return
      }
      if (this.author === '') {
        this.$message({
          message: '作者不能为空!',
          type: 'warning'
        })
        return
      }
      if (this.price === '') {
        this.$message({
          message: '价格不能为空!',
          type: 'warning'
        })
        return
      }
      if (this.pagination === '') {
        this.$message({
          message: '页数不能为空!',
          type: 'warning'
        })
        return
      }
      if (this.sort === '') {
        this.$message({
          message: '请选择一个分类!',
          type: 'warning'
        })
        return
      }
      if (this.subhead === '') {
        this.$message({
          message: '副标题不能为空!',
          type: 'warning'
        })
        return
      }
      if (this.publishingHouse === '') {
        this.$message({
          message: '出版社不能为空!',
          type: 'warning'
        })
        return
      }
      if (this.publicationTime === '') {
        this.$message({
          message: '出版时间不能为空!',
          type: 'warning'
        })
        return
      }
      axios.get(url, params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '图书添加成功!',
            type: 'success'
          })
          this.name = ''
          this.author = ''
          this.price = ''
          this.pagination = ''
          this.sort = ''
          this.subhead = ''
          this.publishingHouse = ''
          this.publicationTime = ''
        } else {
          this.$message.error('服务器繁忙,请稍后再试!')
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
}
.container .left {
  width: 40%;
  margin-left: 100px;
  float: left;
  margin-top: 80px;
  margin-bottom: 35px;
}
.container .right {
  width: 40%;
  margin-right: 100px;
  float: right;
  margin-top: 80px;
  margin-bottom: 35px;
}
.container .box {
  margin-top: 40px;
}
.container .box p {
  width: 17%;
  height: 40px;
  line-height: 40px;
  text-align: right;
  float: left;
}
.container .box .inp {
  width: 70%;
  float: left;
  margin-left: 20px;
}
.container .btn {
  display: block;
  margin: 30px auto;
}
</style>
