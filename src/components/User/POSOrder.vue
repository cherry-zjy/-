<template>
  <div id="app">
    <h3>POS超市订单</h3>
    <div class="box">
      <div v-for="(item,index) in list" :key="index" class="list" v-if="!detail&&list.length>0" @click="listdetail(item.ID)">
        <div class="header">
          <span>订单号：{{item.OrderNO}}</span>
          <span class="list-status yellow" v-if="item.Type=='0'">申请中</span>
          <span class="list-status green" v-if="item.Type=='1'">已通过</span>
          <span class="list-status red" v-if="item.Type=='2'">未通过</span>
        </div>
        <div class="body">
          <img :src="item.Image" class="body-img">
          <div class="body-text">
            <span>{{item.Name}}</span>
            <br/>
            <span class="grey">￥{{item.Prcie}}</span>
          </div>
        </div>
      </div>
      <div class="block" v-if="!detail&&list.length>0">
        <el-pagination @current-change="handleCurrentChange" :page-count="pageCount" layout="prev, pager, next" :current-page="currentPage">
        </el-pagination>
      </div>
      <div v-if="!detail&&list.length==0" class="text-center">
          <img src="../../../static/img/kong.png">
        </div>
      <div v-if="detail">
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p class="detail-title">订单信息</p>
            <div class="Infobox">
              <label class="info-title">订单编号：</label>
              <span>{{Info.OrderNO}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">用户昵称：</label>
              <span>{{Info.NicName}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">手机号：</label>
              <span>{{Info.Phone}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">商品名：</label>
              <span>{{Info.PosName}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">购买数量：</label>
              <span>{{Info.Num}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">实付款:</label>
              <span>{{Info.Prcie}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">创建时间:</label>
              <span>{{Info.CreateTime}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">支付时间: </label>
              <span>{{Info.ApplyTime}}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p class="detail-title">收货信息</p>
            <div class="Infobox">
              <label class="info-title">订单状态：</label>
              <span>{{Info.Type |Type}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">收货人：</label>
              <span>{{Info.Name}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">收货联系电话：</label>
              <span>{{Info.DeliveryPhone}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">收货地址：</label>
              <span>{{Info.Adress}}</span>
            </div>
            <div class="Infobox">
              <label class="info-title">物流订单：</label>
              <span>{{Info.LogisticsNo}}</span>
            </div>
          </el-col>
        </el-row>
        <div class="btnbox">
          <el-button type="primary" @click="detail=false">上一步</el-button>
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
        Info: {
          Name: '1111'
        },
        mainurl:'',
        detail: false,
        pageIndex: 1,
        pageCount: 0,
      }
    },
    mounted: function () {
      this.getInfo()
      this.mainurl = mainurl
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
          .get("api/Web_UserInfo/GRPOSDD", {
            params: {
              Token: getCookie("token"),
              pageIndex: this.pageIndex,
              pageSize: 3,
              type: 0
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result.list;
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
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getInfo()
      },
      listdetail(id) {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_UserInfo/GRPODListXq", {
            params: {
              ID: id
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.Info = response.data.Result;
                this.detail = true
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
    },
    filters: {
      Type(value) {
        if (value == 0) {
          return value = "申请中"
        } else if (value == 1) {
          return value = "待发货"
        } else if (value == 2) {
          return value = "待收货"
        }
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
    padding: 30px 10%;
    width: 80%;
    position: relative;
  }

  h3 {
    padding: 20px 30px;
    border-bottom: 1px solid #EEEEEE;
  }

  .box {
    padding: 0 30px;
  }

  .list {
    margin-bottom: 20px;
    border: 1px solid #EEEEEE;
    cursor: pointer;
  }

  .header {
    background-color: #F5F5F5;
    padding: 10px;
    font-size: 16px;
  }

  .list-status {
    float: right;
    margin-right: 20px;
  }

  .body {
    padding: 10px;
  }

  .body-img {
    width: 100px;
    height: 100px;
    vertical-align: middle;
  }

  .body span {
    vertical-align: middle;
  }

  .body-text {
    display: inline-block;
    margin-left: 20px;
  }

  .grey {
    color: #FF2736;
    margin-top: 10px;
  }

  .block {
    text-align: center;
    margin-top: 50px;
    padding-bottom: 80px;
    width: 100%;
  }

  /* 详情 */

  .Infobox {
    padding: 10px 0;
  }

  .Infobox label.info-title {
    width: 120px;
    display: inline-block;
  }

  .btnbox {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .detail-title {
    color: #CEAA70;
  }
  .yellow {
    color: #CEAA70
  }

  .green {
    color: #4EC424
  }

  .red {
    color: #FF2736
  }

</style>
