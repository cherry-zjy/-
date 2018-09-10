<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <div class="dark">
          <el-row :gutter="20" style="position: relative;">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <img :src="Info.Logo" class="card-img">
            </el-col>
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
              <p class="big-text">{{Info.BankName}}-{{Info.Name}}</p>
              <p class="small-text">单位名称：{{Info.Center}}</p>
              <p class="small-text">{{Info.BeiZhu}}</p>
              <el-button type="primary" class="applybtn" size="small" @click="dialogFormVisible = true">免费申请</el-button>
            </el-col>
          </el-row>
          <div class="dark">
            <p style="font-weight: 600">告知说明</p>
            <p>本人向交通银行申请信用卡，承诺填写的各项信息均真实、完整、业务申请是否获批及信用卡额度以交通银行信用卡最终审核为准</p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="交通银行申请提醒" :visible.sync="dialogFormVisible" center>
      <el-form>
        <p>如果您目前持有交通银行信用卡，或在其他平台机构同时申请信用卡， 将会影响你的征 信记录影响下卡率以及卡片额度
        </p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消申请</el-button>
        <el-button type="primary" @click="apply()">继续申请</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        Info:[]
      }
    },
    mounted: function () {
      this.getInfo()
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {

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
          .get("api/Web_CreditCardMarket/CreditIntroduce", {
            params: {
              ID: window.location.href.split("id=")[1],
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.Info = response.data.Result;
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
      apply(){
        if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$message({
            showClose: true,
            type: "warning",
            message: '请先登录'
          });
          setTimeout(() => {
            this.$router.push("/Login");
          }, 1000);
          return;
        }
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_CreditCardMarket/CreditCardSqXq", {
            params: {
              Token:getCookie("token"),
              pageIndex:1,
              CardID:window.location.href.split("id=")[1],
              pageSize:999
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                if(response.data.Result.list.length>0){
                  this.$router.push("/Finance/CardSupermarketsecond/id=" + window.location.href.split("id=")[1]);
                }else{
                  this.$router.push("/Finance/CardSupermarketfirst/id=" + window.location.href.split("id=")[1]);
                }
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
  #app {
    background-color: #F5F5F5
  }

  .main {
    margin-top: 60px;
    background-color: #fff;
    margin-bottom: 60px;
  }

  .form-input {
    width: 50%;
  }

  #getcode {
    margin-left: 10px;
  }

  .card-img {
    max-width: 100%;
    width: 300px;
    height: 200px;
  }

  .big-text {
    font-size: 20px;
    color: #333333;
  }

  .small-text {
    color: #BBBBBB;
    font-size: 15px;
  }

  @media (min-width:768px) {
    .applybtn {
      position: absolute;
      bottom: 70px;
    }
  }

  .el-row {
    padding: 50px 20px;
  }

  .dark {
    padding: 20px 20px 80px 20px;
    color: #666666;
    font-family: MicrosoftYaHei;
    border-top: 1px solid #EEEEEE;

  }

</style>
