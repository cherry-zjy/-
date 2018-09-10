<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <div class="dark">
          <h4>
            <img :src="list.Logo" class="logo">{{list.Name}}</h4>
          <p>申请人数：{{list.NumOfPeople}}人</p>
          <p>可借贷款：{{list.Quota}}</p>
          <p>借款期限：{{list.LoanTime}}天</p>
          <p>平均办理时间：{{list.AverageTime}}天</p>
        </div>
        <div class="dark">
          <h4>申请条件</h4>
          <div v-for="(item,index) in rule" :key="index">
          <p>{{item.Content}}：{{item.Title}}</p>
          </div>
          <h4>费用说明</h4>
          <p>贷款金额：{{list.LoanPrice}}元</p>
          <p>贷款期限：{{list.Day}}天</p>
          <p>总还款：{{list.SumPrice}}元</p>
          <p>利率：{{list.Rate}}</p>
        </div>
        <div class="dark bottom">
          <h4>如何快速申请</h4>
          <!-- <div class="detail" v-html="decodeURIComponent(ApplyIntroduce)"></div> -->
          <div class="detail"></div><!-- v-html的css无效 -->
          <el-button type="primary" size="small" @click="apply()">立即申请</el-button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        rule:[],
        ApplyIntroduce:''
      }
    },
    mounted: function () {
      this.mainurl = mainurl;
      this.getInfo();
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
      getInfo() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_SmailMarket/AmountListXq", {
            params: {
              ID: window.location.href.split("id=")[1],
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result;
                this.pageCount = response.data.Result.page;
                this.rule = response.data.Result.Requirt;
                this.ApplyIntroduce = response.data.Result.ApplyIntroduce
                $(".detail").html(decodeURIComponent(this.ApplyIntroduce))
                $(".detail img").css("max-width","100%")
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
              console.log(error)
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      },
      // 分页
      handleCurrentChange(val) {
        this.filters.pageIndex = val;
        // this.getInfo();
      },
      apply() {
        if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$message({
            showClose: true,
            type: "warning",
            message: "请先登录"
          });
          setTimeout(() => {
            this.$router.push({
              path: "/Login"
            });
          }, 1500);
          return;
        }
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_SmailMarket/AmountSqXq", {
            params: {
              pageIndex: 1,
              pageSize: 99,
              Token: getCookie("token")
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                if (response.data.Result.list.length < 1) {
                  this.$router.push("/Finance/SmallSupermarketApply/id=" + window.location.href.split("id=")[1]);
                } else {
                  this.$router.push("/Finance/SmallSupermarketApplyDetail/id=" + window.location.href.split("id=")[1]);
                }
              } else if (status === -1) {
                this.$message({
                  showClose: true,
                  type: "warning",
                  message: response.data.Result
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/Login"
                  });
                }, 1500);
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
              console.log(error)
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
  }

  .dark {
    padding: 5% 2% 3% 2%;
    margin: 0 3%;
    color: #666666;
    font-family: MicrosoftYaHei;
  }

  .dark+.dark {
    padding-top: 10px;
    border-top: 1px solid #EEEEEE;
  }

  .dark.bottom {
    padding-bottom: 80px;
  }

  .dark.bottom button {
    margin-top: 20px;
  }

  h3 {
    font-weight: 400;
  }

  .logo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }
  .detail img{
    max-width: 100%;
  }

</style>
