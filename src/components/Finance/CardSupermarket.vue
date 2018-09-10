<template>
  <div id="app">
    <el-carousel arrow="always" height="500px">
      <el-carousel-item v-for="item in bannerlist" :key="item.url">
        <img :src="item.Image" class="banner-img">
      </el-carousel-item>
    </el-carousel>
    <div class="container">
      <div class="main">
        <h3>信用卡超市</h3>
        <div class="dark">
          <div class="managerlist" v-for="(item,index) in list" :key="index" @click="apply(item.ID)">
            <img :src="item.Logo" class="manager-icon">
            <div class="manager-msg">
              <p class="manager-name">{{item.Name}}</p>
              <p class="manager-money">批卡率：
                <span class="yellow">{{item.Rate}}</span>
                <!-- <span class="tall">最高：
                  <span class="yellow">80万</span>
                </span> -->
              </p>
              <p class="manager-money">{{item.Brif}}</p>
              
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="block" v-if="pageCount>0">
          <el-pagination @current-change="handleCurrentChange" :page-count="pageCount" layout="prev, pager, next" :current-page="currentPage">
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
      bannerlist: [
        {
          url: "../../static/img/banner.png"
        },
        {
          url: "../../static/img/1920x896.jpg"
        }
      ],
      list: [],
      pageIndex: 1,
      pageCount: 0
    };
  },
  mounted: function() {
    this.mainurl = mainurl;
    this.getInfo();
    this.getBanner();
    document.getElementsByTagName("body")[0].className = "add_bg";
  },
  beforeDestroy: function() {
    document.body.removeAttribute("class", "add_bg");
  },
  computed: {
    currentPage: function() {
      return this.pageIndex;
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
        .get("api/Web_CreditCardMarket/BankCardList", {
          params: {
            pageIndex: this.pageIndex,
            pageSize: 6
          }
        })
        .then(
          function(response) {
            loading.close();
            var status = response.data.Status;
            if (status === 1) {
              this.list = response.data.Result.list;
              this.pageCount = response.data.Result.page;
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
          function(error) {
            loading.close();
            this.$notify.error({
              title: "错误",
              message: "错误：请检查网络"
            });
          }.bind(this)
        );
    },
    getBanner() {
      this.$http
        .get("api/Web_CreditCardMarket/GetWebCardCenterBanner", {
          params: {
            pageIndex: 1,
            pageSize: 999
          }
        })
        .then(
          function(response) {
            var status = response.data.Status;
            if (status === 1) {
              this.bannerlist = response.data.Result.list;
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
          function(error) {
            this.$notify.error({
              title: "错误",
              message: "错误：请检查网络"
            });
          }.bind(this)
        );
    },
    // 分页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getInfo();
    },
    apply(id) {
      this.$router.push("/Finance/CardSupermarketProduct/id=" + id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner-img {
  width: 100%;
  height: 100%;
}

/* banner居中显示，不受屏幕大小失真 */

.el-carousel__container {
  position: relative;
}

.el-carousel__item.is-animating {
  width: 1920px;
  position: absolute;
  left: 50%;
  margin-left: -960px;
}

.main {
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
  border-top: 1px solid #eeeeee;
}

.managerlist {
  float: left;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
}

.manager-icon {
  width: 100px;
  height: 100px;
  float: left;
  border-radius: 50%;
}

.manager-msg {
  float: left;
  margin-left: 30px;
}

@media (max-width: 768px) {
  .manager-icon {
    width: 3rem;
    height: 3rem;
  }
  .manager-msg {
    margin-left: 1rem;
  }
}

.manager-name {
  margin: 10px 0;
  font-weight: bolder;
  color: #333333;
}

.manager-money {
  margin: 10px 0;
  font-size: 15px;
  color: #bbbbbb;
}

span.yellow {
  color: #ceaa70;
}

.tall {
  margin-left: 20px;
}

.manager-text {
  margin: 10px 0;
  font-size: 15px;
  color: #bbbbbb;
}

.manager-btn {
  float: right;
  margin-top: 33px;
}

.block {
  float: left;
  text-align: center;
  margin-top: 50px;
  padding-bottom: 80px;
  width: 100%;
}
</style>
