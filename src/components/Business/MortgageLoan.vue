<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <div class="step">
          <el-steps :active="1">
            <el-step></el-step>
            <el-step></el-step>
            <el-step></el-step>
          </el-steps>
        </div>
        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="Name">
            <el-input v-model="ruleForm.Name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="Phone">
            <el-input v-model="ruleForm.Phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="Code">
            <el-input v-model="ruleForm.Code"></el-input>
            <el-button type="primary" id="getcode">获取验证码</el-button>
          </el-form-item>
          <el-form-item prop="type" class="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="阅读并同意《金融联盟服务协议》" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item style="text-align: center;padding-bottom: 80px;" class="type">
            <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          Name: '',
          Phone: '',
          Code: '',
          type: [],
        },
        rules: {
          Name: [{
            required: true,
            message: '请输入姓名',
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
        }
      }
    },
    mounted: function () {
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {

    },
    methods: {
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
              .get("api/Web_BankLoan/Verification", {
                params: {
                  Token: getCookie("token"),
                  Name: this.ruleForm.Name,
                  Phone: this.ruleForm.Phone,
                  Code: this.ruleForm.Code,
                  IsChecked: true,
                  status:window.location.href.split("id=")[1]
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
                      message: "提交成功"
                    });
                    setTimeout(() => {
                      this.$router.push("/Finance/BankLoanApplysecond/id=" + response.data.Result);
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
      top:0;
      right: -120px;
    }
    form {
      padding: 100px 0 0 0;
      width: 40%;
      margin-left: 30%;
    }
    .step {
      padding: 100px 0 0 0;
      width: 50%;
      margin-left: 30%;
    }
  }

  @media (max-width:768px) {
    .type {
      margin-left: -100px;
    }
    .step {
      padding: 100px 0 0 0;
      width: 90%;
      margin-left: 5%;
    }
    #getcode {
      margin-top: 20px;
    }
  }

</style>
