<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>发现</h3>
        <div class="dark">
          <div class="managerlist" v-for="(item,index) in list" :key="index">
            <a class="news-item" @click="apply(item.Url)">
              <img class="news-item-avatar" :src="item.Image">
              <div class="news-item-right">
                <p class="news-item-caption">{{item.Tital}}</p>
                <p class="news-item-brief">发布时间：{{item.CreateTime}}</p>
              </div>
            </a>
          </div>
        </div>
        <!-- 分页 -->
        <div class="block" v-if="pageCount>0">
          <el-pagination :page-count="pageCount" layout="prev, pager, next" :current-page="currentPage">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageIndex: 1,
        pageCount: 0,
        list: []
      }
    },
    mounted: function () {
      this.mainurl = mainurl;
      this.getInfo()
      document.getElementsByTagName("body")[0].className = "add_bg";
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
      // 分页
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getInfo();
      },
      apply(url) {
        console.log(url)
        window.location.href = url
        // window.open(url); 
      },
      getInfo() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_NewsList/findList", {
            params: {
              pageIndex: this.pageIndex,
              pageSize: 12
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result.data
                this.pageCount = response.data.Result.page
              } else {
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
              loading.close();
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    margin-top: 60px;
    background-color: #fff;
    margin-bottom: 60px;
    float: left;
    min-width: 100%;
  }

  h3 {
    text-align: center;
    padding: 30px 0;
  }

  .dark {
    margin: 0 30px;
    color: #666666;
    font-family: MicrosoftYaHei;
    border-top: 1px solid #EEEEEE;
  }

  .managerlist {
    float: left;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #EEEEEE;
    cursor: pointer;
  }

  .news-item {
    display: flex;
    color: #2f353f;
  }

  .news-item-avatar {
    height: 180px;
    width: 270px;
    overflow: hidden;
    background-color: black;
    flex-shrink: 0;
  }

  .news-item-time {
    text-align: left;
    margin-left: 20px;
    width: 62px;
    font-size: 10px;
    font-weight: 300;
    padding-top: 0;
    flex-shrink: 0;
    margin-top: 0;
  }

  .news-item-right {
    text-align: left;
    margin-left: 20px;
  }

  .news-item-caption {
    font-size: 18px;
    font-weight: 600;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    margin-top: 0;
  }

  @media (max-width: 768px) {
    .news-item-avatar {
      width: 100px;
      height: 66px;
    }
  }

  .news-item-brief {
    font-size: 14px;
    font-weight: 300;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #999999;
  }

  .block {
    float: left;
    text-align: center;
    margin-top: 50px;
    padding-bottom: 80px;
    width: 100%;
  }

</style>
