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
            <el-button type="primary" id="getcode">获取验证码</el-button>
          </el-form-item>
          <el-form-item label="所在地：" prop="selectedOptions">
            <i v-if="!isshow" class="el-icon-loading"></i>
            <el-cascader :options="Address" v-model="ruleForm.selectedOptions" :change-on-select="true" :clearable="true" :filterable="true"
              @change="handleChange" v-if="isshow">
            </el-cascader>
            <!-- <span>所在地：{{form.city | myAddressCity}}{{form.erae|myAddressErae}}{{form.minerae|myAddressMinerae}}</span> -->
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
      var checkselecte = (rule, value, callback) => {
        if (this.ruleForm.city == '' || this.ruleForm.city == undefined) {
          callback(new Error("请选择省"));
        } else if (this.ruleForm.erae == '' || this.ruleForm.erae == undefined) {
          callback(new Error("请选择市"));
        } else {
          callback();
        }
      };
      return {
        isshow:false,
        ruleForm: {
          Name: '',
          IDCard: '',
          Code: '',
          Phone: '',
          type:[],
          selectedOptions:[],
          city: '',
          erae: '',
          minerae: '',
        },
        Address:[],
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
          }, ],
          type: [{
            type: 'array',
            required: true,
            message: '请先阅读并同意《金融联盟服务协议》',
            trigger: 'change'
          }],
          selectedOptions: [{
            type: 'array',
            required: true,
            trigger: 'change',
            validator: checkselecte
          }],
        }
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
        this.$http
          .get("api/Web_UserInfo/GetProvinceCityRegion", {
            params: {
              pageIndex: 1,
              pageSize: 999
            }
          })
          .then(
            function (response) {
              var status = response.data.Status;
              if (status === 1) {
                for (var i = 0; i < response.data.Result.length; i++) {
                  this.Address[i] = {
                    label: response.data.Result[i].ProvinceName,
                    value: response.data.Result[i].ProvinceID,
                    children: []
                  }
                  for (var y = 0; y < response.data.Result[i].City.length; y++) {
                    var arr = {
                      label: response.data.Result[i].City[y].CityName,
                      value: response.data.Result[i].City[y].CityID,
                    }
                    this.Address[i].children.push(arr)
                  }
                }
                this.isshow = true
              } else if (status === -1) {
                this.$message({
                  showClose: true,
                  type: "warning",
                  message: response.data.Result
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/login"
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
              console.log(error)
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      },
      handleChange(value) {
        this.ruleForm.city = this.ruleForm.selectedOptions[0];
        this.ruleForm.erae = this.ruleForm.selectedOptions[1]
        this.ruleForm.minerae = this.ruleForm.selectedOptions[2]
      },
      myAddressErae(value) {
        for (var y in this.Address) {
          for (var z in this.Address[y].children) {
            if (this.Address[y].children[z].value == value && value != undefined) {
              return value = this.Address[y].children[z].label;
            }
          }
        }
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
                "api/Web_CreditCardMarket/CreditCardSq",
                qs.stringify({
                  Token: getCookie("token"),
                  Name: this.ruleForm.Name,
                  Phone: this.ruleForm.Phone,
                  IDcard: this.ruleForm.IDCard,
                  Code: this.ruleForm.Code,
                  Adress:this.myAddressErae(this.ruleForm.erae),
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
                      message: '提交成功'
                    });
                    setTimeout(() => {
                      this.$router.push("/Finance/CardSupermarketsecond/id=" + window.location.href.split("id=")[1]);
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
  }

  .dark {
    padding: 50px 20px 80px 20px;
    margin: 0 30px;
    color: #666666;
    font-family: MicrosoftYaHei;
    border-top: 1px solid #EEEEEE;
  }
  .el-cascader {
    width: 100%;
  }

</style>
