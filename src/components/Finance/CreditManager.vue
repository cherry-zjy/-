<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>信贷经理</h3>
        <div class="dark">
          <div class="managerlist" v-for="(item,index) in list" :key="index">
            <img :src="item.Logo" class="manager-icon">
            <div class="manager-msg">
              <p class="manager-name">{{item.Name}}</p>
              <p class="manager-money">利率：
                <span class="yellow">{{item.Rate}}</span>
                <span class="tall">最高：
                  <span class="yellow">{{item.MaxPrice}}</span>
                </span>
              </p>
              <p class="manager-text">{{item.LoanName}}</p>
            </div>
            <el-button type="primary" class="manager-btn" size="small" @click="apply(item.ID)">免费申请</el-button>
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
        pageIndex: 1,
        pageCount: 0,
        list:[]
      }
    },
    mounted: function() {
      this.mainurl = mainurl;
      this.getInfo();
      document.getElementsByTagName("body")[0].className="add_bg"; 
    },
    beforeDestroy: function() {
        document.body.removeAttribute("class","add_bg");
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
          .get("api/Web_CreditManager/BankManagerList", {
            params: {
              pageIndex: this.pageIndex,
              pageSize: 8,
            }
          })
          .then(
            function (response) {
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
            function (error) {
              loading.close();
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
      apply(id){
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
          .get("api/Web_CreditManager/BankManageLoanXq", {
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
                  this.$router.push("/Finance/CreditManagerApply/id=" + id);
                } else {
                  this.$router.push("/Finance/CreditManagerApplyDetail/id=" + id);
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

  @media (max-width:768px) {
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
    color: #BBBBBB;
  }

  span.yellow {
    color: #CEAA70;
  }

  .tall {
    margin-left: 20px;
  }

  .manager-text {
    margin: 10px 0;
    font-size: 15px;
    color: #BBBBBB;
  }

  .manager-btn {
    float: right;
    margin-top: 33px;
  }
  .block{
    float: left;
    text-align: center;
    margin-top: 50px;
    padding-bottom: 80px;
    width: 100%;
  }
  /* .el-pager li,.el-pagination .btn-next, .el-pagination .btn-prev，.el-pagination button:disabled{
    color: unset;
  } */

</style>
