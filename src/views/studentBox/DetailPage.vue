<template>
  <div class="container">
    <el-page-header @back="goBack" :content="content"></el-page-header>
    <div class="receptacle clearfix">
      <div class="left clearfix">
        <div>
          <img :src="bookImg" alt />
        </div>
        <div>
          <p>
            <span>图书编号:</span>
            <span>{{id}}</span>
          </p>
          <p>
            <span>副标题:</span>
            <span>{{subhead}}</span>
          </p>
          <p>
            <span>作者:</span>
            <span>{{author}}</span>
          </p>
          <p>
            <span>出版社:</span>
            <span>{{book_pub}}</span>
          </p>
          <p>
            <span>类别:</span>
            <span>{{sort}}</span>
          </p>
          <p>
            <span>出版年:</span>
            <span>{{publicationTime}}</span>
          </p>
          <p>
            <span>页数:</span>
            <span>{{pagination}}</span>
          </p>
          <p>
            <span>定价:</span>
            <span>{{price}}</span>
          </p>
        </div>
      </div>
      <div class="center">
        <p>内容简介······</p>
        <p>{{centerText}}</p>
      </div>
      <div class="right">
        <p>读者评分</p>
        <div class="clearfix">
          <div class="top">{{averageScore}}</div>
          <div class="bottom">
            <div>
              <el-rate
                v-model="value2"
                :colors="colors"
                :allow-half="true"
                :disabled="true"
                :disabled-void-color="'#c3c7cb8c'"
              ></el-rate>
            </div>
            <p>{{gradeNum}}人评价</p>
          </div>
        </div>
      </div>
    </div>
    <div class="comment clearfix">
      <div class="tag">想读</div>
      <div class="tag">在读</div>
      <div class="tag">读过</div>
      <div>评价:</div>
      <div>
        <el-rate
          v-model="value"
          :texts="texts"
          show-text
          :colors="colors"
          @change="comment"
          :allow-half="true"
          :disabled="disabled"
          :disabled-void-color="'#c3c7cb8c'"
        ></el-rate>
      </div>
    </div>
    <div class="froumTitle">
      <span>短评 · · · · · ·</span>
      (
      <span>全部 {{total}} 条</span>)
      <div @click="announceShow">
        <i class="iconfont icon-qianbi-"></i>发布评论
      </div>
    </div>
    <div class="froum" v-for="(item,index) in dataList" :key="index">
      <div class="froum_top">
        <img :src="item.student_img" class="tou_xiang" />
        <span class="forum_name">{{item.student_name}}</span>
        <div class="block_forum">
          <el-rate
            :value="item.grade"
            :colors="colors"
            :disabled="true"
            :allow-half="true"
            :disabled-void-color="'#c3c7cb8c'"
          ></el-rate>
        </div>
        <span class="forum_time">{{item.releaseTime}}</span>
      </div>
      <div class="froum_second">
        <span class="froum_title">{{item.title}}</span>
      </div>
      <div class="froum_last">
        <li class="froum_ping">{{item.container}}</li>
      </div>
    </div>
    <div class="announceConter" v-if="isComments">
      <div class="box">
        <div class="head">
          <span>来发表你的评论吧~~</span>
          <span @click="close">x</span>
        </div>
        <div class="conter">
          <el-input v-model="input" placeholder="请输入标题" :clearable="true"></el-input>
          <div style="margin-top:20px"></div>
          <el-input
            type="textarea"
            :resize="'none'"
            :rows="6"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="127"
            show-word-limit
          ></el-input>
          <div class="btn">
            <el-button @click="announce" type="success" round style="margin:0px auto">发布评论</el-button>
          </div>
        </div>
      </div>
    </div>
    <img
      v-if="btnFlag"
      class="go-top"
      src="https://s1.ax1x.com/2020/06/25/NBowrR.png"
      @click="backTop"
    />
    <div @click="viewMore" class="viewMore_c">{{viewMoreText}}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      viewMoreText: '查看更多',
      btnFlag: false,
      isComments: false,
      input: '',
      textarea: '',
      averageScore: '0.0',
      gradeNum: '0', // 查询当天图书有多少人评分
      content: '',
      bookImg: '',
      author: '',
      id: '',
      price: '',
      pagination: '',
      publicationTime: '',
      book_pub: '',
      sort: '',
      subhead: '',
      centerText: '',
      value2: 0,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      value: 0,
      // value3: 0,
      texts: ['很差', '较差', '还行', '推荐', '力荐'],
      disabled: false,
      dataList: [],
      student_name: '',
      student_img: '',
      page: 1,
      total: 0
    }
  },
  async created () {
    await this.$store.dispatch('stu_id')
    await axios
      .get('/admin/library/bookInfo/', {
        params: { bookId: this.$route.query.id }
      })
      .then(res => {
        // 获取当前图书所有信息
        this.content = res.data.data.book_name
        this.id = res.data.data.book_id
        this.bookImg = res.data.data.book_img
        this.author = res.data.data.book_author
        this.pagination = res.data.data.pagination
        this.publicationTime = res.data.data.publicationTime
        this.book_pub = res.data.data.book_pub
        this.price = res.data.data.book_price
        this.sort = res.data.data.sort_name
        this.subhead = res.data.data.subhead
        this.centerText = res.data.data.conter
      })
    await axios
      .get('/admin/borrow/StudentInfo/', {
        params: { studentId: this.$store.state.studentId }
      })
      .then(res => {
        // 获取学号学生信息，以便于发表评论时使用
        this.student_img = res.data.data.stu_img
        this.student_name = res.data.data.stu_name
      })
    await axios
      .get('/admin/library/isGrade/', {
        params: {
          bookId: this.$route.query.id,
          studentId: this.$store.state.studentId
        }
      })
      .then(res => {
        if (res.data.code === 200) {
          this.value = res.data.grade
          this.disabled = true
        }
      })
    await axios
      .get('/admin/library/gradeNum/', {
        params: {
          bookId: this.$route.query.id
        }
      })
      .then(res => {
        if (res.data.code === 200) {
          this.gradeNum = res.data.gradeNum
        }
      })
    await axios
      .get('/admin/library/avgGrade/', {
        params: {
          bookId: this.$route.query.id
        }
      })
      .then(res => {
        if (res.data.code === 200) {
          this.averageScore = res.data.avg
          this.value2 = parseFloat(res.data.avg)
        }
      })
    await axios
      .get('/admin/library/getComments/', {
        params: {
          bookId: this.$route.query.id,
          page: this.page
        }
      })
      .then(res => {
        if (res.data.code === 200) {
          this.dataList = res.data.data
          this.total = res.data.total
        }
      })
    if (this.dataList.length === 0 || this.total < 11) {
      this.viewMoreText = ''
    }
  },
  methods: {
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
    goBack () {
      this.$router.replace({ path: '/StudentIndex' })
    },
    comment (val) {
      if (!this.disabled) {
        this.$confirm('确定评分后将不可修改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const url = '/admin/library/grade/'
            const params = {
              params: {
                bookId: this.$route.query.id,
                studentId: this.$store.state.studentId,
                grade: val
              }
            }
            axios.get(url, params).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '打分成功!'
                })
                this.value = parseFloat(val)
                this.disabled = true
              } else {
                this.$message.error('服务器繁忙,请稍后再试!')
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '打分失败!'
            })
            this.value = 0
          })
      }
    },
    announceShow () {
      this.isComments = !this.isComments
    },
    close () {
      this.isComments = false
    },
    announce () {
      if (this.textarea === '') {
        this.$message({
          message: '您还没有写评论哦~~~',
          type: 'warning'
        })
        return
      }
      const params = {
        params: {
          bookId: this.$route.query.id,
          studentId: this.$store.state.studentId,
          student_name: this.student_name,
          student_img: this.student_img,
          releaseTime: new Date().toLocaleDateString(),
          title: this.input,
          container: this.textarea
        }
      }
      axios.get('/admin/library/addComment/', params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '评论成功啦!',
            type: 'success'
          })
          this.$router.go(0)
        } else {
          this.$message.error('当前服务器繁忙,请稍后再试!')
        }
      })
    },
    backTop () {
      const that = this
      const timer = setInterval(() => {
        const ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop () {
      const that = this
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    viewMore () {
      this.page++
      axios
        .get('/admin/library/getComments/', {
          params: {
            bookId: this.$route.query.id,
            page: this.page
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.dataList = res.data.data
          }
        })
      if (this.page * 10 >= this.total) {
        this.viewMoreText = '已加载全部评论!'
      }
    }
  },

  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 18px;
}
.container .receptacle {
  width: 100%;
  margin-top: 20px;
  border-bottom: #eceef0 solid 2px;
}
.container .receptacle .left {
  width: 33%;
  float: left;
}
.container .receptacle .left div {
  float: left;
}
.container .receptacle .left img {
  width: 135px;
  height: 195px;
  margin-right: 14px;
}
.container .receptacle .left div:nth-child(2) p {
  margin-top: 3px;
}
.container .receptacle .left div:nth-child(2) p span:nth-child(1) {
  color: #666666;
  font-size: 13px;
  margin-right: 5px;
}
.container .receptacle .left div:nth-child(2) p span:nth-child(2) {
  color: #111;
  font-size: 13px;
}
.container .receptacle .left div:nth-child(2) p:nth-child(2) span:nth-child(2),
.container .receptacle .left div:nth-child(2) p:nth-child(4) span:nth-child(2) {
  color: #3377aa;
  font-size: 13px;
}
.container .receptacle .center {
  width: 43%;
  height: 200px;
  float: left;
}
.container .receptacle .center p:nth-child(1) {
  font-size: 20px;
  color: #007722;
  margin-top: 8px;
  margin-bottom: 10px;
}
.container .receptacle .center p:nth-child(2) {
  font-size: 14px;
  color: #111111;
}
.container .receptacle .right {
  width: 19%;
  height: 200px;
  float: left;
  border-left: 1px solid #eaeaea;
  margin-left: 58px;
  color: #9b9b9b;
  box-sizing: border-box;
  padding-top: 50px;
}
.container .receptacle .right > p {
  color: #9b9b9b;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
}
.container .receptacle .right > div {
  height: 60px;
  width: 190px;
  margin: 0 auto;
}
.container .receptacle .right .top {
  float: left;
  width: 50px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #494949;
  font-size: 34px;
}
.container .receptacle .right .bottom {
  float: left;
  height: 60px;
  box-sizing: border-box;
  padding: 10px 6px;
  margin-top: 5px;
}
.container .receptacle .right .bottom p:nth-child(2) {
  color: #3377aa;
  font-size: 12px;
}
.container .comment {
  margin: 10px 0px;
}
.container .comment div {
  float: left;
}
.container .comment .tag {
  width: 51px;
  background-color: #ffeada;
  text-align: center;
  margin-right: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.container .comment div:nth-child(5) {
  margin-top: 3px;
  margin-left: 5px;
}
.container .froum {
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  box-sizing: border-box;
  padding: 5px 0px 20px 0px;
}
.container .froum_top {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.tou_xiang {
  width: 25px;
  height: 25px;
}
.forum_name {
  margin-left: 10px;
  color: #3377aa;
  font-size: 16px;
}
.block_forum {
  margin-left: 10px;
}
.forum_time {
  color: #999;
  font-size: 14px;
  margin-left: 10px;
}
.froum_second {
  margin-top: 15px;
}
.froum_title {
  color: #388ed0;
  font-size: 16px;
}
.froum_last {
  margin-top: 15px;
}
.froum_ping {
  list-style: none;
  color: #999;
  font-size: 12px;
}
.container .froumTitle {
  margin: 20px 0px;
}
.container .froumTitle span:nth-child(1) {
  color: #007722;
}
.container .froumTitle span:nth-child(2) {
  color: #3377aa;
}
.container .froumTitle div {
  width: 106px;
  height: 27px;
  box-sizing: border-box;
  color: #c65e24;
  background: rgba(198, 94, 36, 0.15);
  padding: 7px 12px;
  line-height: 13px;
  border-radius: 2px;
  text-align: center;
  float: right;
  cursor: pointer;
  font-size: 13px;
}
.container .announceConter {
  position: fixed;
  width: 40%;
  height: 50%;
  background-color: rgba(51, 51, 51, 0.2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  box-sizing: border-box;
  padding: 10px;
}
.container .announceConter .box {
  width: 100%;
  height: 100%;
  background-color: white;
}
.container .announceConter .box .head {
  width: 100%;
  height: 13%;
  background-color: #ebf5ea;
  font-size: 16px;
  color: #007722;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 18px;
  margin-bottom: 25px;
}
.container .announceConter .box .head span:nth-child(2) {
  font-size: 12px;
  color: #bbbbbb;
  cursor: pointer;
  display: inline-block;
  width: 17px;
  height: 17px;
  text-align: center;
}
.container .announceConter .box .head span:nth-child(2):hover {
  background-color: #773333;
  color: white;
}
.container .announceConter .box .conter {
  width: calc(100% - 36px);
  margin: 0 auto;
}
.container .announceConter .box .conter .btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.container .go-top {
  width: 30px;
  height: 30px;
  position: fixed;
  right: 30px;
  bottom: 50px;
  cursor: pointer;
}
.viewMore_c {
  width: 100%;
  margin: 30px 0px;
  text-align: center;
  cursor: pointer;
}
.viewMore_c:hover {
  color: purple;
}
</style>
