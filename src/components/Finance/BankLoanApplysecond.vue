<template>
  <div id="app">
    <div class="container">
      <div class="main" v-if="seconed">
        <div class="step">
          <el-steps :active="2">
            <el-step></el-step>
            <el-step></el-step>
            <el-step></el-step>
          </el-steps>
        </div>
        <p class="tip">*温馨提示：填写的资料越多，通过申请的机率越高</p>
        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
          <el-row :gutter="50">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="金额（万元）" prop="Price">
                <el-input v-model="ruleForm.Price" type="number"></el-input>
                <!-- <el-select v-model="ruleForm.Price" placeholder="请选择金额">
                  <el-option label="5—20万" value="1"></el-option>
                  <el-option label="20万以上" value="2"></el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="身份证号" prop="IDCard">
                <el-input v-model="ruleForm.IDCard"></el-input>
              </el-form-item>
              <el-form-item label="职业身份">
                <el-select v-model="ruleForm.Professional" placeholder="请选择职业身份">
                  <el-option label="民营" value="1"></el-option>
                  <el-option label="国企" value="2"></el-option>
                  <el-option label="机关" value="3"></el-option>
                  <el-option label="事业" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="月收入范围">
                <el-select v-model="ruleForm.SalaryType" placeholder="请选择月收入范围">
                  <el-option label="六千到一万" value="1"></el-option>
                  <el-option label="一万以上" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名下房产类型">
                <el-select v-model="ruleForm.HouseType" placeholder="请选择名下房产类型">
                  <el-option label="商品房" value="1"></el-option>
                  <el-option label="拆迁房" value="2"></el-option>
                  <el-option label="自建房" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房产所在位置">
                <el-select v-model="ruleForm.HousePlace" placeholder="请选择房产所在位置">
                  <el-option label="户口当地" value="1"></el-option>
                  <el-option label="现工作地" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否主贷人">
                <el-select v-model="ruleForm.IsSelf" placeholder="请选择是否主贷人">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房产月供时间">
                <el-select v-model="ruleForm.MonthHouse" placeholder="请选择房产月供时间">
                  <el-option label="10年" value="1"></el-option>
                  <el-option label="15年" value="2"></el-option>
                  <el-option label="20年" value="3"></el-option>
                  <el-option label="30年" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房产月供金额">
                <el-select v-model="ruleForm.MonthHousePrice" placeholder="请选择房产月供金额">
                  <el-option label="3千到7千" value="1"></el-option>
                  <el-option label="7千以上" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="名下是否有车">
                <el-select v-model="ruleForm.IshaveCar" placeholder="请选择名下是否有车">
                  <el-option label="有" value="1"></el-option>
                  <el-option label="无" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车辆所在地">
                <el-select v-model="ruleForm.CarPlace" placeholder="请选择活动区域">
                  <el-option label="本地" value="1"></el-option>
                  <el-option label="外地" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车辆使用年限（年）" prop="CarAge">
                <el-input v-model="ruleForm.CarAge"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="50">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="有无本地社保">
                <el-select v-model="ruleForm.socialsecurity" placeholder="请选择有无本地社保">
                  <el-option label="有" value="1"></el-option>
                  <el-option label="无" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="有无公积金">
                <el-select v-model="ruleForm.Accumulationfund" placeholder="请选择有无公积金">
                  <el-option label="有" value="1"></el-option>
                  <el-option label="无" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="芝麻信用分">
                <el-select v-model="ruleForm.ZhiM" placeholder="请选择芝麻信用分">
                  <el-option label="600以下" value="1"></el-option>
                  <el-option label="600以上" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="微粒贷款度">
                <el-select v-model="ruleForm.WeiL" placeholder="请选择芝麻信用分">
                  <el-option label="3-5W" value="1"></el-option>
                  <el-option label="5W以上" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否有商业险">
                <el-select v-model="ruleForm.Businessinsurance" placeholder="请选择是否有商业险">
                  <el-option label="有" value="1"></el-option>
                  <el-option label="无" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="type" class="type" style="margin-left:-140px">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="阅读并同意《金融联盟服务协议》" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="text-center">
          <el-button @click="back()">上一步</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
        </div>
      </div>
      <div class="main" v-if="!seconed">
        <div class="step">
          <el-steps :active="3">
            <el-step></el-step>
            <el-step></el-step>
            <el-step></el-step>
          </el-steps>
        </div>
        <div class="dark two">
          <div class="managerlist" v-for="(item,index) in list" :key="index">
            <img :src="item.Image" class="manager-icon">
            <div class="manager-msg">
              <p class="manager-name">{{item.BankName}}</p>
              <p class="manager-money">利率：
                <span class="yellow">{{item.Rate}}</span>
                <span class="tall">成功率：
                  <span class="yellow">{{item.SuccRate}}</span>
                </span>
              </p>
              <p class="manager-text">放贷时间：{{item.Days}}</p>
            </div>
            <el-button type="primary" v-if="item.IsApply" class="manager-btn" size="small">已申请</el-button>
            <el-button type="primary" v-else class="manager-btn" size="small" @click="apply(item.BankID)">申请</el-button>
          </div>
        </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :page-count="pageCount" layout="prev, pager, next"
            :current-page="currentPage">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import qs from "qs";
  export default {
    data() {
      // var checkIDCard = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error("身份证号不能为空"));
      //   }
      //   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      //   setTimeout(() => {
      //     if (reg.test(value) == false) {
      //       callback(new Error("请输入正确的身份证号码"));
      //     } else {
      //       callback();
      //     }
      //   }, 100);
      // };
      return {
        seconed: true,
        ruleForm: {
          Price: '',
          IDCard: '',
          HouseType: "",
          HousePlace: "",
          IsSelf: "",
          MonthHouse: "",
          MonthHousePrice: "",
          IshaveCar: "",
          CarPlace: "",
          CarAge: "",
          socialsecurity: "",
          Accumulationfund: "",
          ZhiM: "",
          WeiL: "",
          Businessinsurance: "",
          type: []
        },
        rules: {
          IDCard: [{
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
              if (reg.test(value) == false) {
                callback(new Error("请输入正确的身份证号码"));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }],
          type: [{
            type: "array",
            required: true,
            message: "请先阅读并同意《金融联盟服务协议》",
            trigger: "change"
          }],
          CarAge: [{
            validator: (rule, value, callback) => {
              if (value == "") {
                callback();
              } else if (/^\d+$/.test(value) == false) {
                callback(new Error("请输入数字"));
              } else {
                callback();
              }
            },
            required: false,
            trigger: "blur"
          }],
          Price: [{
            validator: (rule, value, callback) => {
              if (value == "") {
                callback();
              } else if (/^\d+$/.test(value) == false) {
                callback(new Error("请输入数字"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }],
          // 必填项身份验证
          // IDCard:[
          //  {
          //     validator: checkIDCard,
          //     trigger: "blur"
          //   }
          // ]
        },
        pageIndex: 1,
        pageCount: 10,
        list: {}
      };
    },
    mounted: function () {
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {
      currentPage: function () {
        return this.pageIndex;
      }
    },
    methods: {
      back() {
        this.$router.push(
          "/Finance/BankLoanApplyfirst/id=" + window.location.href.split("id=")[1]
        );
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getInfo();
      },
      submitForm(formName) {
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
        this.$refs[formName].validate(valid => {
          console.log(this.ruleForm)
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            this.$http
              .post(
                "api/Web_BankLoan/BankApply",
                qs.stringify({
                  Token: getCookie("token"),
                  Price: this.ruleForm.Price == "" ? 0 : this.ruleForm.Price,
                  IDCard: this.ruleForm.IDCard == "" ? "" : this.ruleForm.IDCard,
                  Professional: this.ruleForm.Professional == "" ?
                    0 :
                    this.ruleForm.Professional,
                  SalaryType: this.ruleForm.SalaryType == "" ? 0 : this.ruleForm.SalaryType,
                  HouseType: this.ruleForm.HouseType == "" ? 0 : this.ruleForm.HouseType,
                  HousePlace: this.ruleForm.HousePlace == "" ? 0 : this.ruleForm.HousePlace,
                  IsSelf: this.ruleForm.IsSelf == "" ? 0 : this.ruleForm.IsSelf,
                  MonthHouse: this.ruleForm.MonthHouse == "" ? 0 : this.ruleForm.MonthHouse,
                  MonthHousePrice: this.ruleForm.MonthHousePrice == "" ?
                    0 :
                    this.ruleForm.MonthHousePrice,
                  IshaveCar: this.ruleForm.IshaveCar == "" ? 0 : this.ruleForm.IshaveCar,
                  CarPlace: this.ruleForm.CarPlace == "" ? 0 : this.ruleForm.CarPlace,
                  CarAge: this.ruleForm.CarAge == "" ? 0 : this.ruleForm.CarAge,
                  socialsecurity: this.ruleForm.socialsecurity == "" ?
                    0 :
                    this.ruleForm.socialsecurity,
                  Accumulationfund: this.ruleForm.Accumulationfund == 0 ?
                    0 :
                    this.ruleForm.Accumulationfund,
                  ZhiM: this.ruleForm.ZhiM == "" ? 0 : this.ruleForm.ZhiM,
                  WeiL: this.ruleForm.WeiL == "" ? 0 : this.ruleForm.WeiL,
                  Businessinsurance: this.ruleForm.Businessinsurance == "" ?
                    0 :
                    this.ruleForm.Businessinsurance,
                  BankLoanID: window.location.href.split("id=")[1],
                  BankID: ""
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
                    this.getInfo();
                    this.seconed = false;
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
            return false;
          }
        });
        // this.$router.push("/Finance/BankLoanApplythird/id=" + window.location.href.split("id=")[1]);
      },
      getInfo() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_BankLoan/GetBankList", {
            params: {
              bankApplyID: window.location.href.split("id=")[1],
              pageIndex: this.pageIndex,
              pageSize: 8
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result.bank;
                this.pageCount = response.data.Result.page;
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
                loading.close();
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
              console.log(error);
              loading.close();
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      },
      apply(id) {
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
          .post(
            "api/Web_BankLoan/BankApply",
            qs.stringify({
              Token: getCookie("token"),
              Price: this.ruleForm.Price == "" ? 0 : this.ruleForm.Price,
              IDCard: this.ruleForm.IDCard == "" ? "" : this.ruleForm.IDCard,
              Professional: this.ruleForm.Professional == "" ? 0 : this.ruleForm.Professional,
              SalaryType: this.ruleForm.SalaryType == "" ? 0 : this.ruleForm.SalaryType,
              HouseType: this.ruleForm.HouseType == "" ? 0 : this.ruleForm.HouseType,
              HousePlace: this.ruleForm.HousePlace == "" ? 0 : this.ruleForm.HousePlace,
              IsSelf: this.ruleForm.IsSelf == "" ? 0 : this.ruleForm.IsSelf,
              MonthHouse: this.ruleForm.MonthHouse == "" ? 0 : this.ruleForm.MonthHouse,
              MonthHousePrice: this.ruleForm.MonthHousePrice == "" ?
                0 :
                this.ruleForm.MonthHousePrice,
              IshaveCar: this.ruleForm.IshaveCar == "" ? 0 : this.ruleForm.IshaveCar,
              CarPlace: this.ruleForm.CarPlace == "" ? 0 : this.ruleForm.CarPlace,
              CarAge: this.ruleForm.CarAge == "" ? 0 : this.ruleForm.CarAge,
              socialsecurity: this.ruleForm.socialsecurity == "" ?
                0 :
                this.ruleForm.socialsecurity,
              Accumulationfund: this.ruleForm.Accumulationfund == 0 ?
                0 :
                this.ruleForm.Accumulationfund,
              ZhiM: this.ruleForm.ZhiM == "" ? 0 : this.ruleForm.ZhiM,
              WeiL: this.ruleForm.WeiL == "" ? 0 : this.ruleForm.WeiL,
              Businessinsurance: this.ruleForm.Businessinsurance == "" ?
                0 :
                this.ruleForm.Businessinsurance,
              BankLoanID: window.location.href.split("id=")[1],
              BankID: id
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

  form {
    padding: 50px 0 0 0;
    width: 80%;
    margin-left: 10%;
  }

  .two {
    padding-top: 20px;
  }

  .step {
    padding: 100px 0 0 0;
    width: 50%;
    margin-left: 25%;
    padding-bottom: 50px;
  }

  .tip {
    width: 50%;
    margin-left: 25%;
    padding-bottom: 50px;
  }

  .text-center {
    padding: 20px 0;
  }

  @media (max-width: 768px) {
    .step {
      padding: 100px 0 0 0;
      width: 90%;
      margin-left: 5%;
    }

    .tip {
      width: 90%;
      margin-left: 5%;
    }
  }

  .tip {
    text-align: center;
    color: #f9183d;
  }

  /* 第三步 */

  .dark.two {
    margin: 0 30px;
  }

  .managerlist {
    display: inline-block;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
  }

  .manager-icon {
    width: 100px;
    height: 100px;
    float: left;
    border-radius: 50%;
  }

  .manager-msg {
    float: left;
    margin-left: 30px;
  }

  @media (max-width: 768px) {
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
    color: #bbbbbb;
  }

  span.yellow {
    color: #ceaa70;
  }

  .tall {
    margin-left: 20px;
  }

  .manager-text {
    margin: 10px 0;
    font-size: 15px;
    color: #bbbbbb;
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
