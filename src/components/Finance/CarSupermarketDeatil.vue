<template>
  <div id="app">
    <div class="container" v-if="!success">
      <div class="main">
        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-row :gutter="80">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="证件类型" prop="LicenseType">
                <el-select v-model="ruleForm.LicenseType" placeholder="请选择证件类型">
                  <el-option label="身份证" value="1"></el-option>
                  <el-option label="户口本驾驶证" value="2"></el-option>
                  <el-option label="军官证/士兵证" value="3"></el-option>
                  <el-option label="护照" value="4"></el-option>
                  <el-option label="港澳回乡证/台胞证" value="5"></el-option>
                  <el-option label="组织代码证" value="6"></el-option>
                  <el-option label="其他证件" value="7"></el-option>
                  <el-option label="社会信用代码" value="8"></el-option>
                  <el-option label="税务登记证" value="9"></el-option>
                  <el-option label="营业执照" value="10"></el-option>
                  <el-option label="香港身份证" value="11"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码" prop="CertificatesNumber">
                <el-input v-model="ruleForm.CertificatesNumber"></el-input>
              </el-form-item>
              <el-form-item label="车辆初登日期" prop="CarTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.CarTime"></el-date-picker>
                <div class="circle">1</div>
              </el-form-item>
              <el-form-item label="车辆识别代号" prop="TrueLicense">
                <el-input v-model="ruleForm.TrueLicense"></el-input>
                <div class="circle">2</div>
              </el-form-item>
              <el-form-item label="品牌类型" prop="Carbrand">
                <el-input v-model="ruleForm.Carbrand"></el-input>
                <div class="circle">3</div>
              </el-form-item>
              <el-form-item label="核定载人数" prop="PeopleNumber">
                <el-input v-model="ruleForm.PeopleNumber"></el-input>
                <div class="circle">4</div>
              </el-form-item>
              <el-form-item label="新车发票价" prop="Price">
                <el-input v-model="ruleForm.Price"></el-input>
              </el-form-item>
              <el-form-item label="发动机号码" prop="EngineNumber">
                <el-input v-model="ruleForm.EngineNumber"></el-input>
              </el-form-item>
              <el-form-item label="车辆所属性质" prop="CarType">
                <el-select v-model="ruleForm.CarType" placeholder="请选择车辆所属性质">
                  <el-option label="个人用车" value="1"></el-option>
                  <el-option label="企业用车" value="2"></el-option>
                  <el-option label="企业团队用车" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车辆使用性质" prop="UserCarType">
                <el-select v-model="ruleForm.UserCarType" placeholder="请选择车辆使用性质">
                  <el-option label="出租租凭营业客车" value="1"></el-option>
                  <el-option label="城市公交营业客车" value="2"></el-option>
                  <el-option label="公路客运营业客车" value="3"></el-option>
                  <el-option label="旅游营业客车" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否过户车">
                <el-switch v-model="ruleForm.IsPass"></el-switch>
              </el-form-item>
              <el-form-item prop="type" style="margin-left: -150px">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="阅读并同意《金融联盟服务协议》" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item prop="Image" style="margin-left:-150px;">
                <el-upload v-model="ruleForm.Image" class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <img v-else src="../../../static/img/yoload.png" class="avatar">
                </el-upload>
              </el-form-item>
              <div class="el-upload el-upload--text">
                <img src="../../../static/img/vehicle_license.png" class="avatar" @click="handlePictureCardPreview()">
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div class="text-center">
          <el-button @click="back()">返回</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        </div>
      </div>
    </div>
    <div class="container success" v-if="success">
      <div class="main">
        <img src="../../../static/img/order_submitted_successfully.png" class="successi-icon">
        <p>投保成功</p>
        <p class="grey-text">请等待工作人员回复</p>
        <div class="succecc-btn">
          <el-button @click="look()">查看订单</el-button>
          <el-button type="primary" @click="home()">进入首页</el-button>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import qs from "qs";
  export default {
    data() {
      var checkLogo = (rule, value, callback) => {
        if (this.imageUrl == '') {
          callback(new Error("请上传驾驶证"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          LicenseType: '',
          type: [],
          CertificatesNumber: '',
          CarTime: '',
          TrueLicense: '',
          Carbrand: '',
          PeopleNumber: '',
          Price: '',
          CarType: '',
          UserCarType: '',
          IsPass: false,
          Image: '',
          name: ''
        },
        imageUrl: "",
        dialogVisible: false,
        dialogImageUrl: '',
        action: "",
        success: false,
        rules: {
          name: [{
            required: true,
            message: '请填写活动形式',
            trigger: 'blur'
          }],
          type: [{
            type: 'array',
            required: true,
            message: '请先阅读并同意《金融联盟服务协议》',
            trigger: 'change'
          }],
          LicenseType: [{
            required: true,
            message: '请选择证件类型',
            trigger: 'change'
          }],
          UserCarType: [{
            required: true,
            message: '请选择车辆使用性质',
            trigger: 'change'
          }],
          CarType: [{
            required: true,
            message: '请选择车辆所属类型',
            trigger: 'change'
          }],
          CertificatesNumber: [{
            required: true,
            message: '请输入证件号码',
            trigger: 'blur'
          }, ],
          TrueLicense: [{
            required: true,
            message: '请输入车辆识别代号',
            trigger: 'blur'
          }, ],
          Carbrand: [{
            required: true,
            message: '请输入品牌类型',
            trigger: 'blur'
          }, ],
          PeopleNumber: [{
            required: true,
            message: '请输入核定在人数',
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
          EngineNumber: [{
            required: true,
            message: '请输入发动机号码',
            trigger: 'blur'
          }],
          Price: [{
            required: true,
            message: '请输入新车发票价',
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
          CarTime: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          Image: [{
            required: true,
            validator: checkLogo
          }],
          IsPass: [{
            required: true,
          }],
        }
      }
    },
    mounted: function () {
      this.mainurl = mainurl;
      this.action = this.mainurl + "api/UploadPhoto/UpdateForImage?type=0",
        document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {

    },
    methods: {
      back() {
        this.$router.push("/Finance/CarSupermarket");
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.ruleForm.Image = res.Result[0];
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isLt2M;
      },
      //图片放大
      handlePictureCardPreview() {
        this.dialogImageUrl = '../../../static/img/vehicle_license.png';
        this.dialogVisible = true;
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
                "api/Web_AutoInsuranceMarket/CarInformation",
                qs.stringify({
                  Token: getCookie("token"),
                  carID: window.location.href.split("id=")[1],
                  CarImage1: this.ruleForm.Image,
                  LicenseType: this.ruleForm.LicenseType,
                  CertificatesNumber: this.ruleForm.CertificatesNumber,
                  CarTime: this.ruleForm.CarTime,
                  TrueLicense: this.ruleForm.TrueLicense,
                  Carbrand: this.ruleForm.Carbrand,
                  PeopleNumber: this.ruleForm.PeopleNumber,
                  Price: this.ruleForm.Price,
                  CarType: this.ruleForm.CarType,
                  UserCarType: this.ruleForm.UserCarType,
                  IsPass: this.ruleForm.IsPass,
                  EngineNumber: this.ruleForm.EngineNumber,
                  OrderNo: -1,
                  Province: -1,
                  CarLicense: -1,
                  IsHaveLicense: true,
                  CarMaster: -1,
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
                      this.success = true
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
        // this.success = true;
      },
      home() {
        this.$router.push("/");
      },
      look() {
        this.$router.push("/User/Order");
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
  }

  .text-center {
    padding: 20px 0;
  }

  @media (max-width:768px) {
    .step {
      padding: 100px 0 0 0;
      width: 90%;
      margin-left: 5%;
    }
  }

  .avatar {
    width: 100%;
  }

  .circle {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: -30px;
    color: #EA2828;
    border: 1px solid #EA2828;
  }

  .container.success {
    text-align: center;

  }

  .successi-icon {
    padding: 80px 0 0 0;
    width: 100px;
    height: 100px;
  }

  .grey-text {
    font-size: 16px;
    color: #BBBBBB;
  }

  .succecc-btn {
    padding-bottom: 80px;
  }

</style>
