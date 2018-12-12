<template>
  <div id="app">
    <el-carousel arrow="always" id="banner">
      <el-carousel-item v-for="item in bannerlist" :key="item.url">
        <img :src="mainurl+item.Image" class="banner-img">
      </el-carousel-item>
    </el-carousel>
    <h3>
      <span class="product-title">关于我们</span>
    </h3>
    <div class="btnbox">
      <el-button type="primary" size="medium">SP招募</el-button>
      <el-button type="info" size="medium" @click="$router.push('AboutUs');">招贤纳士</el-button>
      <!-- <el-button type="info" size="medium" @click="$router.push('JoinUs');">招贤纳士</el-button> -->
      <el-button type="info" size="medium" @click="$router.push('Culture');">企业文化</el-button>
      <el-button type="info" size="medium" @click="$router.push('Address');">公司地址</el-button>
    </div>
    <div class="container">
      <div class="main">
        <el-form :model="getList" ref="getList" label-width="160px" class="demo-ruleForm" :rules="rules">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="公司名称" prop="Name">
                <el-input v-model="getList.Name"></el-input>
              </el-form-item>
              <!-- <el-form-item label="销售区域" prop="Adress">
                <el-select v-model="getList.Adress" placeholder="销售区域">
                  <el-option v-for="item in AdressList" :key="item.Name" :label="item.Name" :value="item.Name">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="所在地：" prop="Adress">
            <el-cascader :options="Address" v-model="getList.Adress" :change-on-select="true" :clearable="true" :filterable="true"
              @change="handleChange">
            </el-cascader>
            <!-- <span>所在地：{{form.city | myAddressCity}}{{form.erae|myAddressErae}}{{form.minerae|myAddressMinerae}}</span> -->
          </el-form-item>
              <el-form-item label="目前合作金融渠道" prop="Channel">
                <el-input v-model="getList.Channel"></el-input>
              </el-form-item>
              <el-form-item label="3月均放款量（单数）" prop="ThreeMonth">
                <el-select v-model="getList.ThreeMonth" placeholder="3月均放款量（单数）">
                  <el-option v-for="item in fangkuanList" :key="item.Name" :label="item.Name" :value="item.Name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系人" prop="Contact">
                <el-input v-model="getList.Contact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="主营业务" prop="Business">
                <el-select v-model="getList.Business" placeholder="主营业务">
                  <el-option v-for="item in yewuList" :key="item.Name" :label="item.Name" :value="item.Name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱" prop="Email">
                <el-input v-model="getList.Email"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="Phone">
                <el-input v-model="getList.Phone"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="Brif">
                <el-input v-model="getList.Brif"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="text-align: center;">
            <el-button type="info" @click="rest()">清空</el-button>
            <el-button type="primary" @click="submitForm('getList')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Call></Call>
    </div>
  </div>
</template>

<script>
  import Call from "../CallUs";
  import expresss from "../../assets/address.js";
  export default {
    components: {
      Call
    },
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
        bannerlist: [{
          Image: '../../../static/img/banner.png'
        }],
        mainurl: '',
        getList: {},
        Address:[],
        fangkuanList: [{
          ID: 1,
          Name: '10-50'
        }, {
          ID: 2,
          Name: '50-100'
        }, {
          ID: 3,
          Name: '100单以上'
        }],
        yewuList: [{
          ID: 1,
          Name: '新车'
        }, {
          ID: 2,
          Name: '二手车'
        }, {
          ID: 3,
          Name: '车抵贷'
        }, {
          ID: 4,
          Name: '商用车'
        }],
        rules: {
          Adress: [{
            required: true,
            message: '请选择销售区域',
            trigger: 'change'
          }],
          Business: [{
            required: true,
            message: '请选择主营业务',
            trigger: 'change'
          }],
          ThreeMonth: [{
            required: true,
            message: '请选择3月均放款量（单数）',
            trigger: 'change'
          }],
          Name: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }, ],
          Channel: [{
            required: true,
            message: '请输入目前合作金融渠道',
            trigger: 'blur'
          }, ],
          Brif: [{
            required: true,
            message: '请输入备注',
            trigger: 'blur'
          }, ],
          Phone: [{
            required: true,
            message: '请输入手机',
            trigger: 'blur'
          }, ],
          Email: [{
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }, ],
          Contact: [{
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          }, ],
        },
      }
    },
    mounted: function () {
      this.getInfo()
      this.Address = expresss
      this.mainurl = mainurl
      const that = this;
      that.clientWight = `${window.innerWidth}`;
      console.log(that.clientWight * 0.4)
      document.getElementById('banner').setAttribute('style', 'height: ' + that.clientWight * 0.4 + 'px');
      window.onresize = function temp() {
        that.clientWight = `${window.innerWidth}`;
        console.log(that.clientWight * 0.4)
        document.getElementById('banner').setAttribute('style', 'height: ' + that.clientWight * 0.4 + 'px');
      };
    },
    computed: {

    },
    methods: {
      rest() {
        this.$refs["getList"].resetFields();
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
              .get("api/Homepage/AddBusiness", {
                params: {
                  Name: this.getList.Name,
                  Phone: this.getList.Phone,
                  Contact: this.getList.Contact,
                  Adress: this.myAddressErae(this.getList.Adress[1]),
                  Brif: this.getList.Brif,
                  Email: this.getList.Email,
                  Business: this.getList.Business,
                  Channel: this.getList.Channel,
                  ThreeMonth: this.getList.ThreeMonth,
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
                    this.rest()
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
                  console.log(error)
                  loading.close();
                  this.$notify.error({
                    title: "错误",
                    message: "错误：请检查网络"
                  });
                }.bind(this)
              );
          } else {
            this.$message({
              showClose: true,
              type: "warning",
              message: '请完善信息'
            });
            return false;
          }
        });
      },
      handleChange(value) {
        console.log(this.getList.Adress)
        // this.getList.Adress = this.getList.Adress[1]
      },
      myAddressErae(value) {
        for (var y in this.Address) {
          for (var z in this.Address[y].children) {
            if (this.Address[y].children[z].value == value && value != undefined) {
              return value = this.Address[y].label + this.Address[y].children[z].label;
            }
          }
        }
      },
      getInfo() {
        this.$http
          .get("api/Homepage/HomepageList", {
            params: {
              type: 2,
            }
          })
          .then(
            function (response) {
              var status = response.data.Status;
              if (status === 1) {
                this.bannerlist = response.data.Result.list;
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
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
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

  h3 {
    padding-top: 50px;
    text-align: center;
    margin-top: 50px;
    font-size: 28px;
  }

  @media (max-width: 768px) {
    h3 {
      padding-top: 0
    }
  }

  .banner-img {
    width: 100%;
    height: 100%;
  }

  .product-title {
    margin-top: 30px;
    border-bottom: 3px solid #EA5B2D;
    padding: 0 10px 10px;
  }

  .el-button--info {
    background-color: #ECEBEA;
    color: #888888;
    border-color: #ECEBEA;
  }

  .btnbox {
    text-align: center;
    margin-top: 50px;
  }

  .textbox {
    margin-top: 50px;
  }

  .text-head {
    color: #333333;
    font-size: 22px;
    font-weight: 600;
    text-align: left
  }

  .text-body {
    color: #333333;
    text-indent: 2em;
    text-align: left
  }

  .tpimg {
    margin-top: 20px;
    padding-bottom: 50px;
    max-width: 100%;
  }

  .tellus {
    position: fixed;
    right: 10%;
    top: 50%;
    width: 40px;
    height: 130px;
    white-space: inherit;
    padding: 10px;
    line-height: 1.5;
    z-index: 99;
  }

  .icon {
    vertical-align: middle;
  }

  @media (max-width: 768px) {
    .btnbox button {
      margin-top: 10px;
    }
  }

</style>
