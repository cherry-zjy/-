<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="姓名" prop="Name">
            <el-input v-model="ruleForm.Name"></el-input>
          </el-form-item>
          <el-form-item label="证件" prop="IDCard">
            <el-input v-model="ruleForm.IDCard"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="Phone">
            <el-input v-model="ruleForm.Phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="Code">
            <el-input v-model="ruleForm.Code"></el-input>
            <el-button type="primary" id="getcode" @click="sendcode()" :disabled="disabled">{{time}}</el-button>
          </el-form-item>
          <el-form-item prop="type" class="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="阅读并同意《金融联盟服务协议》" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item style="text-align: center;" class="type">
            <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
          </el-form-item>
        </el-form>
        <div class="dark">
          <p>选择添加申请人信息: </p>
          <p>请确保选择或添加的申请人信息与贷款申请表所填信息保持真实一致，以免影响信用贷款进度；本平台对此信息保密。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from "qs";
  export default {
    data() {
      return {
        ruleForm: {
          Name: '',
          IDCard: '',
          Code: '',
          Phone: '',
          type: []
        },
        rules: {
          Name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }, ],
          IDCard: [{
            required: true,
            message: '请输入证件',
            trigger: 'blur'
          }, ],
          Phone: [{
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          }, ],
          Code: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (/^\d+$/.test(value) == false) {
                callback(new Error("请输入数字"));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }],
          type: [{
            type: 'array',
            required: true,
            message: '请先阅读并同意《金融联盟服务协议》',
            trigger: 'change'
          }],
        },
        currentTime: 61,
        time: '获取验证码', //倒计时 
        disabled: false
      }
    },
    mounted: function () {
      this.mainurl = mainurl;
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {

    },
    methods: {
      sendcode() {
        if (this.time == "获取验证码" || this.time == "重新发送") {
          if (this.ruleForm.Phone == '') {
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
                  phone: this.ruleForm.Phone,
                }
              })
              .then(
                function (response) {
                  loading.close();
                  var status = response.data.Status;
                  if (status === 1) {
                    this.getCode();
                    this.disabled = true
                    this.$message({
                      showClose: true,
                      type: "success",
                      message: "发送验证码成功"
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
      },
      submitForm(formName) {
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            this.$http
              .post(
                "api/Web_SmailMarket/AmountSq",
                qs.stringify({
                  Token: getCookie("token"),
                  Name: this.ruleForm.Name,
                  Phone: this.ruleForm.Phone,
                  IDcard: this.ruleForm.IDCard,
                  Code: this.ruleForm.Code,
                  IDD: window.location.href.split("id=")[1]
                })
              )
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
                    setTimeout(() => {
                      this.$router.push("/Finance/SmallSupermarketApplyDetail/id=" + window.location.href.split(
                        "id=")[1]);
                    }, 1000);
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

  form {
    padding: 100px 0 0 0;
    width: 90%;
    margin-left: 5%;
  }

  @media (min-width:768px) {
    #getcode {
      position: absolute;
      margin-left: 20px;
      top: 0;
      right: -120px;
    }
    form {
      padding: 100px 0 0 0;
      width: 40%;
      margin-left: 30%;
    }
  }

  @media (max-width:768px) {
    .type {
      margin-left: -100px;
    }
    #getcode {
      margin-top: 20px;
    }
  }

  .dark {
    padding: 50px 20px 80px 20px;
    margin: 0 30px;
    color: #666666;
    font-family: MicrosoftYaHei;
    border-top: 1px solid #EEEEEE;
  }

</style>
