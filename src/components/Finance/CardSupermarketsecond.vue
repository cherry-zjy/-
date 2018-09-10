<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>填写信息详情</h3>
        <div class="dark">
          <el-row>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(item,index) in list" :key="index">
              <el-card class="box-card">
                <div @click="choosethis(index,item.ID)">
                  <div class="text item">
                    姓名：{{item.Name}}
                    <img src="../../../static/img/tick.png" class="tick-icon" v-if="choose==index">
                    <img src="../../../static/img/tick_no.png" class="tick-icon" v-if="choose!==index">
                  </div>
                  <div class="text item">
                    证件：{{item.IDcard}}
                  </div>
                  <div class="text item">
                    电话：{{item.Phone}}
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-checkbox v-model="checked">阅读并同意《金融联盟服务协议》</el-checkbox>
        </div>
        <div class="btnbox">
          <el-button @click="back()">添加申请人信息</el-button>
          <el-button type="primary" @click="next()">下一步</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="交通银行" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <p>正在给{{Name}}手机号{{Phone}}办理信用卡,请认真核对信息</p>
        <el-form-item>
          <el-input v-model="form.code" placeholder="请输入验证码" class="form-input"></el-input>
          <el-button type="primary" id="getcode" @click="code()" :disabled="disabled">{{time}}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      choose: 0,
      checked: false,
      dialogFormVisible: false,
      form: {
        code: ""
      },
      list: [],
      LoanOrderID: "",
      Name: "",
      Phone: "",
      currentTime: 61,
      time: "获取验证码", //倒计时
      disabled: false
    };
  },
  mounted: function() {
    this.mainurl = mainurl;
    this.getInfo();
    document.getElementsByTagName("body")[0].className = "add_bg";
  },
  beforeDestroy: function() {
    document.body.removeAttribute("class", "add_bg");
  },
  computed: {},
  methods: {
    getInfo() {
      if (getCookie("token") == undefined || getCookie("token") == null) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请先登录"
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
            pageIndex: 1,
            pageSize: 999,
            CardID:window.location.href.split("id=")[1],
            Token: getCookie("token")
          }
        })
        .then(
          function(response) {
            loading.close();
            var status = response.data.Status;
            if (status === 1) {
              this.list = response.data.Result.list;
              this.LoanOrderID = response.data.Result.list[0].ID;
              this.Name = this.list[0].Name;
              this.Phone = this.list[0].Phone;
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
    back() {
      this.$router.push(
        "/Finance/CardSupermarketfirst/id=" +
          window.location.href.split("id=")[1]
      );
    },
    choosethis(index, id) {
      console.log(this.choose);
      this.choose = index;
      this.LoanOrderID = id;
      this.Name = this.list[index].Name;
      this.Phone = this.list[index].Phone;
    },
    next() {
      if (!this.checked) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请阅读并同意《金融联盟服务协议》"
        });
        return;
      }
      this.dialogFormVisible = true;
    },
    save() {
      if (getCookie("token") == undefined || getCookie("token") == null) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请先登录"
        });
        setTimeout(() => {
          this.$router.push("/Login");
        }, 1000);
        return;
      }
      if (this.form.code == "") {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请输入验证码"
        });
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$http
        .get("api/Web_CreditCardMarket/EditCreditCardSq", {
          params: {
            AgreeProtocol: true,
            CreditCardID: this.LoanOrderID,
            Code: this.form.code,
            Token: getCookie("token")
          }
        })
        .then(
          function(response) {
            loading.close();
            var status = response.data.Status;
            if (status === 1) {
              this.$message({
                showClose: true,
                type: "success",
                message: "申请成功"
              });
              this.dialogFormVisible = false;

              setTimeout(() => {
                window.location.href = response.data.Result;
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
          function(error) {
            console.log(error);
            loading.close();
            this.$notify.error({
              title: "错误",
              message: "错误：请检查网络"
            });
          }.bind(this)
        );
    },
    code() {
      if (this.time == "获取验证码" || this.time == "重新发送") {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/VerifyCode/Send", {
            params: {
              phone: this.Phone
            }
          })
          .then(
            function(response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.getCode();
                this.disabled = true;
                wx.showToast({
                  title: "发送验证码成功"
                });
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
      }
    },
    getCode() {
      var that = this;
      var currentTime = that.currentTime;
      var interval = setInterval(function() {
        currentTime--;
        that.time = currentTime + "秒";
        if (currentTime <= 0) {
          clearInterval(interval);
          (that.time = "重新发送"),
            (that.currentTime = 61),
            (that.disabled = false);
        }
      }, 1000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  margin-top: 60px;
  background-color: #fff;
  margin-bottom: 60px;
}

h3 {
  padding: 20px 30px;
}

.dark {
  padding: 30px 0 80px 0;
  margin: 0 30px;
  color: #666666;
  font-family: MicrosoftYaHei;
  border-top: 1px solid #eeeeee;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-card {
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  background-color: #f5f5f5;
  color: #666666;
  position: relative;
  margin-top: 20px;
  cursor: pointer;
}

.tick-icon {
  position: absolute;
  right: 10px;
  top: 15px;
}

.el-checkbox {
  padding: 30px 10px;
}

.btnbox {
  text-align: center;
  margin-top: 30px;
  padding-bottom: 50px;
}

.form-input {
  width: 50%;
}

#getcode {
  margin-left: 10px;
}
</style>
