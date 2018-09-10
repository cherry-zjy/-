<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所在地：" prop="selectedOptions">
            <i v-if="!isshow" class="el-icon-loading"></i>
            <el-cascader :options="Address" v-model="ruleForm.selectedOptions" :change-on-select="true" :clearable="true" :filterable="true"
              @change="handleChange" v-if="isshow">
            </el-cascader>
            <!-- <span>所在地：{{form.city | myAddressCity}}{{form.erae|myAddressErae}}{{form.minerae|myAddressMinerae}}</span> -->
          </el-form-item>
          <el-form-item label="车牌" prop="cp">
            <el-input v-model="ruleForm.cp"></el-input>
            <el-checkbox-group v-model="ruleForm.type" class="switch">
              <el-checkbox label="未上牌" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="车主" prop="Name">
            <el-input v-model="ruleForm.Name"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center;padding-bottom: 300px;" class="type">
            <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
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
        isshow: false,
        Address: [],
        ruleForm: {
          city: '',
          erae: '',
          minerae: '',
          selectedOptions: [],
          Name: '',
          cp: '',
          type: true
        },
        rules: {
          cp: [{
            required: true,
            message: '请输入车牌',
            trigger: 'blur'
          }, ],
          Name: [{
            required: true,
            message: '请输入车主',
            trigger: 'blur'
          }, ],
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
      this.restaurants = this.loadAll();
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
                "api/Web_AutoInsuranceMarket/AddCarOrder",
                qs.stringify({
                  Token: getCookie("token"),
                  Province: this.myAddressErae(this.ruleForm.erae),
                  CarLicense: this.ruleForm.cp,
                  IsHaveLicense: this.ruleForm.type,
                  CarMaster: this.ruleForm.Name
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
                      message: "成功"
                    });
                    setTimeout(() => {
                      this.$router.push("/Finance/CarSupermarketDeatil/id=" + response.data.Result);
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
        // this.$router.push("/Finance/CarSupermarketDeatil/id=" + formName);
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
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    margin-top: 60px;
    background-color: #fff;
    margin-bottom: 60px;
    min-width: 100%;
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
    }
    form {
      padding: 100px 0 0 0;
      width: 60%;
      margin-left: 20%;
    }
    .switch {
      position: absolute;
      top: 0;
      right: -80px;
    }
  }

  @media (max-width:768px) {
    .type {
      margin-left: -100px;
    }
  }

  .el-cascader {
    width: 100%;
  }

</style>
