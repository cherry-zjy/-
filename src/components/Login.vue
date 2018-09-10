<template>
  <div class="background">
    <div class="loginbox">
      <div class="main">
        <img src="../../static/img/logo.png">
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入验证码" v-model="loginForm.password" class="psw"></el-input>
            <span class="sendcode" @click="code()" :disabled="disabled">{{time}}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from "qs";
  export default {
    data() {
      return {
        loginForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [{
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }]
        },
        currentTime: 61,
        time: '获取验证码', //倒计时 
        disabled: false
      }
    },
    mounted: function () {
      document.getElementsByTagName("body")[0].className = "login";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "login");
    },
    methods: {
      submitForm(formName) {
        var tt = this;
        this.$refs[formName].validate(async valid => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            this.$http
              .post(
                "api/User/Register",
                qs.stringify({
                  Phone: this.loginForm.username,
                  Code: this.loginForm.password,
                  RegType: 1
                })
              )
              .then(
                function (response) {
                  loading.close();
                  var status = response.data.Status;
                  if (status === 1) {
                    setCookie("token", response.data.Result.WebToken);
                    this.$message({
                      showClose: true,
                      type: "success",
                      message: "登陆成功"
                    });
                    setTimeout(() => {
                      this.$router.back(-1)
                    }, 1000);
                  } else {
                    this.$message({
                      showClose: true,
                      type: "warning",
                      message: response.data.Result
                    });
                  }
                }.bind(this)
              )
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
            this.$notify.error({
              title: "错误",
              message: "请输入手机号和验证码",
              offset: 100
            });
            return false;
          }
        });
      },
      code() {
        if (this.time == "获取验证码" || this.time == "重新发送") {
          if (this.loginForm.username == '') {
            this.$notify.error({
              title: "错误",
              message: "手机号不能为空！",
              offset: 100
            });
            this.Phone = ''
            this.code = ''
            return false;
          } else {
            const loading = this.$loading({
              lock: true,
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            this.$http
              .get("api/VerifyCode/Send", {
                params: {
                  phone: this.loginForm.username,
                }
              })
              .then(
                function (response) {
                  loading.close();
                  var status = response.data.Status;
                  if (status === 1) {
                    this.getCode();
                    this.disabled = true
                    wx.showToast({
                      title: "发送验证码成功"
                    })
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
      },
      getCode() {
        var that = this
        var currentTime = that.currentTime
        var interval = setInterval(function () {
          currentTime--;
          that.time = currentTime + '秒'
          if (currentTime <= 0) {
            clearInterval(interval)
            that.time = '重新发送',
              that.currentTime = 61,
              that.disabled = false
          }
        }, 1000)
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .background {
    width: 100%;
    height: 100%;
    background-image: url("../../static/img/dl.png");
    background-size: 100% 100%;
    position: relative;
  }

  .loginbox {
    background-color: #fff;
    position: absolute;
    height: 70.5%;
    width: 31%;
    top: 14.6%;
    left: 49.5%;
    text-align: center;
  }

  .main {
    padding: 20%;
  }

  .el-form {
    margin-top: 20%;
  }

  .submit_btn {
    width: 100%;
    margin-top: 10%;
  }

  .psw {
    position: relative;
  }

  .sendcode {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 12px;
    color: #CEAA70;
    cursor: pointer;
  }

  @media (max-width:1024px) {
    .loginbox {
      height: 72.5%;
      width: 62%;
      top: 13.6%;
      left: 18.5%;
      text-align: center;
    }
    .main {
      padding: 10%;
    }
    .el-form {
      margin-top: 10%;
    }
  }

  @media (max-width:768px) {
    .loginbox {
      height: 72.5%;
      width: 80%;
      top: 13.6%;
      left: 10%;
      text-align: center;
    }
    .main {
      padding: 5%;
    }
    .el-form {
      margin-top: 5%;
    }
  }

</style>
