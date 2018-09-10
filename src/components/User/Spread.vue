<template>
  <div id="app">
    <h3 v-if="!detail">推广管理</h3>
    <h3 v-if="detail">推广管理详情页</h3>
    <el-row :gutter="10" v-if="!detail">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(item,index) in list" :key="index">
        <div class="list-box" @click="gotodetail(index)">
          <img :src="item.Image" class="row-img">
          <p>{{item.Title}}</p>
        </div>
      </el-col>
    </el-row>
    <div class="block" v-if="!detail&&pageCount>0">
      <el-pagination :page-count="pageCount" layout="prev, pager, next" :current-page="currentPage">
      </el-pagination>
    </div>
    <div v-if="detail" class="detail">
      <!-- <div class="haibao">
        <img :src="Info.Image" class="detail-img">
        <img :src="Info.QrCode" class="code-img">
      </div> -->
      <iframe id="show-iframe" frameborder=0 scrolling="auto" :src="shareurl">
      </iframe>
      <!-- <p>{{Info.Title}}</p> -->
      <div class="btnbox">
        <el-button type="primary" @click="detail=false">上一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detail: false,
        list: [],
        Info: [],
        pageIndex: 1,
        pageCount: 0,
        shareurl: '../../../static/share.html'
      }
    },
    mounted: function () {
      this.getInfo()
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    updated() {
      this.Imgresize()
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {
      currentPage: function () {
        return this.pageIndex
      }
    },
    methods: {
      getInfo() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_UserInfo/GetPosterList", {
            params: {
              pageIndex: this.pageIndex,
              pageSize: 6
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result.list;
                this.pageCount = response.data.Result.page
              } else if (status === 40001) {
                this.$message({
                  showClose: true,
                  type: "warning",
                  message: response.data.Result
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/login"
                  });
                }, 1500);
              } else {
                loading.close();
                this.$message({
                  showClose: true,
                  type: "warning",
                  message: response.data.Result
                });
              }
            }.bind(this)
          )
          // 请求error
          .catch(
            function (error) {
              console.log(error)
              loading.close();
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      },
      handleCurrentChange(val) {
        this.filters.pageIndex = val;
      },
      gotodetail(index) {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_UserInfo/PersionalInformation", {
            params: {
              Token: getCookie("token"),
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                if (response.data.Result) {
                  this.Info = this.list[index]
                  this.detail = true
                } else {
                  this.$confirm('您还没有完善个人信息哦', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.Info = this.list[index]
                    this.detail = true
                  }).catch(() => {
                    this.Info = this.list[index]
                    this.detail = true
                  });
                }
                this.shareurl = "../../../static/share.html?index=" +index+"&"
              } else if (status === -1) {
                this.$message({
                  showClose: true,
                  type: "warning",
                  message: response.data.Result
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/login"
                  });
                }, 1500);
              } else {
                loading.close();
                this.$message({
                  showClose: true,
                  type: "warning",
                  message: response.data.Result
                });
              }
            }.bind(this)
          )
          // 请求error
          .catch(
            function (error) {
              console.log(error)
              loading.close();
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );

      },
      Imgresize() {
        window.onresize = function () {
          $(".row-img").css("height", $(".row-img").width() * 1.5)
        }
        $(".row-img").css("height", $(".row-img").width() * 1.5)
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    margin-top: 60px;
    background-color: #fff;
    margin-bottom: 60px;
    padding: 30px 10%;
    width: 80%;
    position: relative;
  }

  h3 {
    padding: 20px 30px;
    border-bottom: 1px solid #EEEEEE;
  }

  .main p {
    line-height: 40px;
  }

  .el-row {
    padding: 10px 30px;
  }

  .el-row p {
    line-height: 0;
    text-align: center;
  }

  .row-img {
    width: 100%;
  }

  .list-box {
    padding: 10px;
    cursor: pointer;
  }

  .detail {
    text-align: center;
    width: 100%;
  }

  .sharebox .share {
    font-weight: 600;
  }

  .haibao {
    position: relative;
  }

  .detail-img {
    max-width: 100%;
  }

  .btnbox {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .block {
    text-align: center;
    margin-top: 20px;
    padding-bottom: 80px;
    width: 100%;
  }

  #show-iframe {
    width: 100%;
    height: 100%;
  }

  @media (min-width:768px) {
    #show-iframe {
      min-height: 750px;
    }
  }

</style>
