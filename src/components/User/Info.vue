<template>
  <div id="app">
    <h3>个人信息</h3>
    <div id="Infomsg" v-if="!cer">
      <div class="Infobox">
        <label class="info-title">头像：</label>
        <img :src="mainurl+Info.Image" class="info-icon" v-if="!edit">
        <el-upload v-if="edit" v-model="Info.Image" class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar info-icon">
          <img v-else src="../../../static/img/add.png" class="avatar info-icon">
        </el-upload>
      </div>
      <div class="Infobox">
        <label class="info-title">昵称：</label>
        <span v-if="!edit">{{Info.NickName}}</span>
        <el-input v-model="Info.NickName" v-if="edit"></el-input>
      </div>
      <div class="Infobox">
        <label class="info-title">性别：</label>
        <span v-if="!edit&&Info.Sex==0">男</span>
        <span v-if="!edit&&Info.Sex==1">女</span>
        <el-radio-group v-model="Info.Sex" v-if="edit">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </div>
      <div class="Infobox">
        <label class="info-title">所在地：</label>
        <i v-if="!isshow" class="el-icon-loading"></i>
        <span v-if="!edit&&isshow">{{InfoAddress}}</span>
        <el-cascader :options="Address" v-model="form.selectedOptions" :change-on-select="true" :clearable="true" :filterable="true"
          @change="handleChange" v-if="edit&&isshow">
        </el-cascader>
        <!-- <el-input v-model="Info.Address"></el-input> -->
      </div>
      <div class="Infobox">
        <label class="info-title">身份情况：</label>
        <span v-if="!edit">{{Info.IDType | IDType}}</span>
        <el-radio-group v-model="Info.IDType" v-if="edit">
          <el-radio :label="0">上班族</el-radio>
          <el-radio :label="1">个体户</el-radio>
          <el-radio :label="2">自由职业者</el-radio>
          <el-radio :label="3">企业主</el-radio>
        </el-radio-group>
      </div>
      <div class="Infobox">
        <label class="info-title">是否有信用卡：</label>
        <span v-if="!edit">{{Info.IsCreditCard | boolean}}</span>
        <el-radio-group v-model="Info.IsCreditCard" v-if="edit">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </div>
      <div class="Infobox">
        <label class="info-title">是否有车：</label>
        <span v-if="!edit">{{Info.IsHaveCar | boolean}}</span>
        <el-radio-group v-model="Info.IsHaveCar" v-if="edit">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </div>
      <div class="Infobox">
        <label class="info-title">微信号：</label>
        <span v-if="!edit">{{Info.Wxin}}</span>
        <el-input v-model="Info.Wxin" v-if="edit"></el-input>
      </div>
      <div class="Infobox">
        <label class="info-title">二维码：</label>
        <img :src="mainurl+Info.Logo" class="info-qrcode" v-if="!edit&&Info.Logo!==''">
        <label v-if="!edit&&Info.Logo==''">无</label>
        <el-upload v-if="edit" v-model="Info.Logo" class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload">
          <img v-if="LogoUrl" :src="LogoUrl" class="avatar info-icon">
          <img v-else src="../../../static/img/add.png" class="avatar info-icon">
        </el-upload>
      </div>
      <div class="Infobox">
        <label class="info-title">实名认证：</label>
        <span class="red" @click="iden()">{{Info.Authentication | boolean}}</span>
      </div>
      <div class="btnbox">
        <el-button type="primary" @click="handleEdit()" v-if="!edit">编辑</el-button>
        <el-button @click="edit=false" v-if="edit">取消</el-button>
        <el-button type="primary" @click="save()" v-if="edit">保存</el-button>
      </div>
    </div>
    <el-form ref="Info" :model="Info" label-width="80px" v-if="cer">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="姓名">
            <el-input v-model="Info.RealName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="身份证号">
            <el-input v-model="Info.IDCard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <p>身份证正面</p>
          <!-- <img src="../../../static/img/positive.png" class="card-img"> -->
          <el-upload v-model="Info.IDCardImage" class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload">
            <img v-if="IDCardImageUrl" :src="IDCardImageUrl" class="avatar idcard-img">
            <img v-else src="../../../static/img/positive.png" class="avatar">
          </el-upload>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <p>身份证反面</p>
          <!-- <img src="../../../static/img/reverse.png" class="card-img"> -->
          <el-upload v-model="Info.IDCardImageBack" class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload">
            <img v-if="IDCardImageBackUrl" :src="IDCardImageBackUrl" class="avatar idcard-img">
            <img v-else src="../../../static/img/reverse.png" class="avatar">
          </el-upload>
        </el-col>
      </el-row>
    </el-form>
    <div class="btnbox" v-if="cer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
  import qs from "qs";
  export default {
    props: ['Info.Image'],
    data() {
      return {
        Info: {
          Image: ''
        },
        edit: false,
        isshow: false,
        Address: [],
        InfoAddress: '',
        mainurl: '',
        Citylist: [],
        imageUrl: '',
        cer: false,
        LogoUrl: '',
        IDCardImageBackUrl: '',
        IDCardImageUrl: '',
        form: {
          city: '',
          erae: '',
          minerae: '',
          selectedOptions: [], //地区筛选数组
          address: '',
        },
      }
    },
    mounted: function () {
      this.mainurl = mainurl
      this.action = this.mainurl + "api/UploadPhoto/UpdateForImage?type=0",
        this.getInfo()
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {

    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.Info.Image = res.Result[0];
      },
      handleAvatarSuccess1(res, file) {
        this.LogoUrl = URL.createObjectURL(file.raw);
        this.Info.Logo = res.Result[0];
      },
      handleAvatarSuccess2(res, file) {
        this.IDCardImageUrl = URL.createObjectURL(file.raw);
        this.Info.IDCardImage = res.Result[0];
      },
      handleAvatarSuccess3(res, file) {
        this.IDCardImageBackUrl = URL.createObjectURL(file.raw);
        this.Info.IDCardImageBack = res.Result[0];
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isLt2M;
      },
      getInfo() {
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
                this.Info = response.data.Result;
                this.getAdd()
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
              console.log(error)
              loading.close();
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      },
      getAdd() {
        this.$http
          .get("api/Web_UserInfo/GetProvinceCityRegion", {})
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
                      children: []
                    }
                    this.Address[i].children.push(arr)
                    for (var z = 0; z < response.data.Result[i].City[y].Region.length; z++) {
                      var arr2 = {
                        label: response.data.Result[i].City[y].Region[z].RegionName,
                        value: response.data.Result[i].City[y].Region[z].RegionID,
                      }
                      this.Address[i].children[y].children.push(arr2)
                    }
                  }
                }
                this.form.selectedOptions = [this.Info.ProvinceID, this.Info.CityID,
                  this.Info.RegionID
                ]
                this.addfilters(this.Info.ProvinceID, this.Info.CityID,
                  this.Info.RegionID)

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
      iden() {
        this.cer = true
        if (this.Info.IDCardImageBack == '') {
          this.IDCardImageBackUrl = this.Info.IDCardImageBack
        } else {
          this.IDCardImageBackUrl = mainurl + this.Info.IDCardImageBack
        }
        if (this.Info.IDCardImage == '') {
          this.IDCardImageUrl = this.Info.IDCardImage
        } else {
          this.IDCardImageUrl = mainurl + this.Info.IDCardImage
        }
      },
      myAddressCity(value) {
        for (var y in this.Address) {
          if (this.Address[y].value == value) {
            return value = this.Address[y].value
          }
        }
      },
      myAddressErae(value) {
        for (var y in this.Address) {
          for (var z in this.Address[y].children) {
            if (this.Address[y].children[z].value == value && value != undefined) {
              return value = this.Address[y].children[z].value;
            }
          }
        }
      },
      myAddressMinerae(value) {
        for (var y in this.Address) {
          for (var z in this.Address[y].children) {
            for (var i in this.Address[y].children[z].children) {
              if (this.Address[y].children[z].children[i].value == value && value != undefined) {
                return value = this.Address[y].children[z].children[i].value
              }
            }
          }
        }
      },
      save() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .post(
            "api/Web_UserInfo/EditUserMessage",
            qs.stringify({
              Token: getCookie("token"),
              Image: this.Info.Image,
              NickName: this.Info.NickName,
              Phone: this.Info.Phone,
              IDType: this.Info.IDType,
              ProvinceID: this.myAddressCity(this.form.city),
              CityID: this.myAddressErae(this.form.erae),
              RegionID: this.myAddressMinerae(this.form.minerae),
              IsCreditCard: this.Info.IsCreditCard,
              IsHaveCar: this.Info.IsHaveCar,
              Wxin: this.Info.Wxin,
              Logo: this.Info.Logo,
              Name: this.Info.RealName,
              IDCard: this.Info.IDCard,
              IDCardImage: this.Info.IDCardImage,
              IDCardImageBack: this.Info.IDCardImageBack,
              Sex: this.Info.Sex,
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
                this.getInfo()
                this.edit = false
                this.cer = false
                this.$emit('changeicon', this.Info.Image);
                console.log(this.Info.Image)
                this.$emit('changename', this.Info.NickName);
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
      },
      back() {
        this.cer = false
      },
      handleChange(value) {
        this.form.city = this.form.selectedOptions[0];
        this.form.erae = this.form.selectedOptions[1]
        this.form.minerae = this.form.selectedOptions[2]
      },
      addfilters(Province, City, Region) {
        for (var y in this.Address) {
          for (var z in this.Address[y].children) {
            for (var i in this.Address[y].children[z].children) {
              if (this.Address[y].children[z].children[i].value == Region && Region != undefined) {
                this.InfoAddress = this.Address[y].label + this.Address[y].children[z].label + this.Address[y].children[
                  z].children[i].label
                this.Info.ProvinceID = this.Address[y].value
                this.Info.CityID = this.Address[y].children[z].value
                this.Info.RegionID = this.Address[y].children[z].children[i].value
              }
            }
          }
        }
        this.isshow = true
      },
      handleEdit() {
        this.edit = true
        if (this.Info.Image == '') {
          this.imageUrl = this.Info.Image
        } else {
          this.imageUrl = mainurl + this.Info.Image
        }
        if (this.Info.Logo == '') {
          this.LogoUrl = this.Info.Logo
        } else {
          this.LogoUrl = mainurl + this.Info.Logo
        }
        this.form.city = this.form.selectedOptions[0];
        this.form.erae = this.form.selectedOptions[1]
        this.form.minerae = this.form.selectedOptions[2]
      }
    },
    filters: {
      IDType(value) {
        if (value == 0) {
          return value = "上班族"
        } else if (value == 1) {
          return value = "个体户"
        } else if (value == 2) {
          return value = "自由职业者"
        } else if (value == 3) {
          return value = "企业主"
        }
      },
      boolean(value) {
        if (value) {
          return value = "是"
        } else {
          return value = "否"
        }
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

  .main p {
    line-height: 40px;
  }

  .Infobox {
    padding: 10px 30px;
  }

  .Infobox label.info-title {
    width: 120px;
    display: inline-block;
  }

  .info-icon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .Infobox img {
    vertical-align: middle;
  }

  .idcard-img {
    max-width: 100%;
  }

  .avatar-uploader {
    display: inline-block
  }

  .info-qrcode {
    width: 100px;
    height: 100px;
  }

  .Infobox .red {
    color: #FF2736;
    cursor: pointer;
  }

  .btnbox {
    text-align: center;
    margin-top: 20px;
    padding-bottom: 20px;
  }

  .Infobox .el-input {
    display: inline-block;
    width: auto;
  }

  @media (max-width:768px) {
    .Infobox .el-input {
      display: inherit;
      margin-top: 10px;
    }
    .el-radio-group{
      display: inherit;
      margin-top: 10px;
    }
    .el-cascader{
      width: 100%;
    }
  }

  .Infobox .el-input input {
    display: inline-block;
    width: auto;
  }

  .btnbox {
    text-align: center;
    margin-top: 20px;
    padding-bottom: 20px;
  }

  .el-form {
    padding: 20px 30px;
  }

  .card-img {
    max-width: 100%;
  }

</style>
