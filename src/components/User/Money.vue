<template>
  <div id="app">
    <h3>我的钱包</h3>
    <div class="info">
      <p class="mymoney">
        <span class="bigtext">{{Integration}}</span>元</p>
      <el-button type="primary" @click="dialogFormVisible=true" class="withdraw" size="small">申请提现</el-button>
    </div>
    <div class="line"></div>
    <h3>历史明细</h3>
    <div class="list" v-for="(item,index) in list" :key="index">
      <p class="title">{{item.Brif}}</p>
      <p class="time">{{item.CreateTime}}</p>
      <span class="detail-money red" v-if="item.Type == 1">-{{item.Price}}</span>
      <span class="detail-money green" v-if="item.Type == 0">+{{item.Price}}</span>
    </div>
    <div class="block" v-if="pageCount>0">
      <el-pagination @current-change="handleCurrentChange" :page-count="pageCount" layout="prev, pager, next" :current-page="currentPage">
      </el-pagination>
    </div>
    <el-dialog title="申请提现" :visible.sync="dialogFormVisible" center>
      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <el-form-item label="提现金额（元）：" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="支付宝账号：" prop="aliAccount">
          <el-input v-model="form.aliAccount"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="realName">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        Integration:0,
        pageIndex: 1,
        pageCount: 0,
        list: [],
        form: {
          realName: '',
          aliAccount: '',
          price: ''
        },
        rules: {
          realName: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur'
          }, ],
          aliAccount: [{
            required: true,
            message: '请输入支付宝账号',
            trigger: 'blur'
          }, ],
          price: [{
            required: true,
            message: '请输入金额',
            trigger: 'blur'
          }, ],
        },
      }
    },
    mounted: function () {
      this.getInfo()
      this.getMoney()
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
          .get("api/Web_UserInfo/FundsList", {
            params: {
              Token: getCookie("token"),
              pageIndex: this.pageIndex,
              pageSize: 3
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result.data;
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
      getMoney() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_UserInfo/GetUserMessage", {
            params: {
              Token: getCookie("token"),
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.Integration = response.data.Result.Integration
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            this.$http
              .get("api/Web_UserInfo/ApplyWithdraw", {
                params: {
                  Token: getCookie("token"),
                  price: this.form.price,
                  aliAccount: this.form.aliAccount,
                  realName: this.form.realName,
                }
              })
              .then(
                function (response) {
                  loading.close();
                  var status = response.data.Status;
                  if (status === 1) {
                    this.$message({
                      showClose: true,
                      type: "success",
                      message: response.data.Result
                    });
                    this.dialogFormVisible = false
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getInfo()
      },
      gotodetail() {
        this.detail = true
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

  .mymoney {
    padding: 30px;

  }

  .line {
    height: 20px;
    background-color: #F5F5F5;
  }

  .info {
    position: relative;
  }

  .bigtext {
    font-size: 35px;
    font-weight: 600;
    margin-right: 20px;
  }

  .withdraw {
    position: absolute;
    right: 30px;
    top: 20px;
  }

  .title {
    color: #333333;
  }

  .time {
    font-size: 14px;
    color: #BBBBBB;
  }

  .list {
    position: relative;
    padding: 10px 30px;
    border-bottom: 1px solid #EEEEEE;
  }

  .detail-money {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .green {
    color: #5ED9BB
  }

  .red {
    color: #D9675E;
  }

  .block {
    text-align: center;
    margin-top: 50px;
    padding-bottom: 80px;
    width: 100%;
  }

</style>
