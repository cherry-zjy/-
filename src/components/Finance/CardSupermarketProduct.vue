<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>信用卡列表</h3>
        <div class="dark" v-if="list.length>0">
          <div class="managerlist" v-for="(item,index) in list" :key="index">
            <img :src="item.Logo" class="manager-icon">
            <div class="manager-msg">
              <p class="manager-name">{{item.Name}}</p>
              <p class="manager-money">信用卡额度范围：
                <span class="yellow">{{item.Money}}</span>
              </p>
              <p class="manager-money">
                {{item.BeiZhu}}
              </p>
            </div>
            <el-button type="primary" class="manager-btn" size="small" @click="apply(item.ID)">申请</el-button>
          </div>
        </div>
        <div v-if="list.length==0" class="text-center">
          <img src="../../../static/img/kong.png">
        </div>
        <!-- 分页 -->
        <!-- <div class="block" v-if="list.length>0">
          <el-pagination :page-count="pageCount" layout="prev, pager, next" :current-page="currentPage">
          </el-pagination>
        </div> -->

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // pageIndex: 1,
        // pageCount: 10,
        list: []
      }
    },
    mounted: function () {
      this.mainurl = mainurl;
      this.getInfo();
    },
    computed: {
      // currentPage: function () {
      //   return this.pageIndex
      // }
    },
    methods: {
      // 分页
      // handleCurrentChange(val) {
      //   this.filters.pageIndex = val;
      //   this.getInfo();
      // },
      getInfo() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_CreditCardMarket/CreditCardXq", {
            params: {
              ID: window.location.href.split("id=")[1],
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result.list;
                // this.pageCount = response.data.Result.page;
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
      apply(id) {
        this.$router.push("/Finance/CardSupermarketDetail/id=" + id);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    text-align: center;
    padding: 30px 0;
  }

  .main {
    margin-top: 60px;
    background-color: #fff;
    margin-bottom: 60px;
  }

  .step {
    padding: 100px 0 0 0;
    width: 50%;
    margin-left: 25%;
  }

  #getcode {
    position: absolute;
    margin-left: 20px;
  }

  .dark {
    margin: 0 30px;
    color: #666666;
    margin-top: 50px;
    font-family: MicrosoftYaHei;
    border-top: 1px solid #EEEEEE;
  }

  .managerlist {
    display: inline-block;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #EEEEEE;
  }

  .manager-icon {
    width: 300px;
    height: 200px;
    float: left;
  }

  .manager-msg {
    float: left;
    margin-left: 30px;
    width: 60%
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

  .block {
    text-align: center;
    margin-top: 50px;
    padding-bottom: 80px;
    width: 100%;
  }

</style>
