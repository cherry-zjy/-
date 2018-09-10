<template>
  <div id="app">
    <h3>
      收货地址
      <span>
        <i class="el-icon-circle-plus" @click="dialogFormVisible=true;form = []">新增地址</i>
      </span>
    </h3>
    <div class="box">
      <div class="list" v-for="(item,index) in list" :key="index" v-if="list.length>0">
        <p>收货人：{{item.Name}}</p>
        <p>联系方式：{{item.Phone}}</p>
        <p>收货地址：{{item.Province+item.City+item.Region+item.Address}}</p>
        <div class="btnbox">
          <span @click="handleEdit(index)">修改</span>|
          <span @click="del(item.ID)">删除</span>
          <el-button type="primary" size="small" v-if="!item.IsDefault" @click="moren(item.ID)">设为默认</el-button>
          <el-button size="small" v-if="item.IsDefault" disabled>默认地址</el-button>
        </div>
      </div>
      <div v-if="list.length==0" class="text-center">
          <img src="../../../static/img/kong.png">
        </div>
    </div>
    <div class="block" v-if="pageCount>0">
      <el-pagination @current-change="handleCurrentChange" :page-count="pageCount" layout="prev, pager, next" :current-page="currentPage">
      </el-pagination>
    </div>
    <el-dialog title="新增地址" :visible.sync="dialogFormVisible" center>
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="所在地：" prop="selectedOptions">
          <i v-if="!isshow" class="el-icon-loading"></i>
          <el-cascader :options="Address" v-model="form.selectedOptions" :change-on-select="true" :clearable="true" :filterable="true"
            @change="handleChange" v-if="isshow">
          </el-cascader>
          <!-- <span>所在地：{{form.city | myAddressCity}}{{form.erae|myAddressErae}}{{form.minerae|myAddressMinerae}}</span> -->
        </el-form-item>
        <el-form-item label="详细地址：" prop="Address">
          <el-input type="textarea" v-model="form.Address"></el-input>
        </el-form-item>
        <el-form-item label="收货人：" prop="Name">
          <el-input v-model="form.Name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="Phone">
          <el-input v-model="form.Phone"></el-input>
        </el-form-item>
        <el-form-item prop="type">
          <el-checkbox-group v-model="form.Type">
            <el-checkbox label="设置默认地址" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改地址" :visible.sync="dialogFormVisible2" center>
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="所在地：" prop="selectedOptions">
          <i v-if="!isshow" class="el-icon-loading"></i>
          <el-cascader :options="Address" v-model="form.selectedOptions" :change-on-select="true" :clearable="true" :filterable="true"
            @change="handleChange" v-if="isshow">
          </el-cascader>
          <!-- <span>所在地：{{form.city | myAddressCity}}{{form.erae|myAddressErae}}{{form.minerae|myAddressMinerae}}</span> -->
        </el-form-item>
        <el-form-item label="详细地址：" prop="Address">
          <el-input type="textarea" v-model="form.Address"></el-input>
        </el-form-item>
        <el-form-item label="收货人：" prop="Name">
          <el-input v-model="form.Name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="Phone">
          <el-input v-model="form.Phone"></el-input>
        </el-form-item>
        <el-form-item prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="设置默认地址" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from "qs";
  export default {
    data() {
      var checkselecte = (rule, value, callback) => {
        console.log(this.form.city)
        if (this.form.city == '' || this.form.city == undefined) {
          callback(new Error("请选择省"));
        } else if (this.form.erae == '' || this.form.erae == undefined) {
          callback(new Error("请选择市"));
        } else if (this.form.minerae == '' || this.form.minerae == undefined) {
          callback(new Error("请选择区"));
        } else {
          callback();
        }
      };
      return {
        isshow:false,
        list: [],
        form: {
          city: '',
          erae: '',
          minerae: '',
          selectedOptions: [], //地区筛选数组
          Address: '',
          Name: '',
          Phone: '',
          type: false
        },
        editform: {},
        rules: {
          Name: [{
            required: true,
            message: '请输入收货人',
            trigger: 'blur'
          }, ],
          Phone: [{
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          }, ],
          Address: [{
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }, ],
          selectedOptions: [{
            type: 'array',
            required: true,
            // trigger: 'change',
            validator: checkselecte
          }],
        },
        pageIndex: 1,
        pageCount: 0,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        Address: [],
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
      currentPage: function () {
        return this.pageIndex
      }
    },
    methods: {
      getInfo() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_UserAddress/GetListByPage", {
            params: {
              Token: getCookie("token"),
              pageIndex: this.pageIndex
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result.Data;
                this.pageCount = response.data.Result.page
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
      handleEdit(index) {
        this.dialogFormVisible2 = true
        this.form = this.list[index]
        this.form.city = this.list[index].Province
        this.form.erae = this.list[index].City
        this.form.minerae = this.list[index].Region
        this.form.type = this.list[index].IsDefault
        this.addfilters(this.list[index].Province, this.list[index].City,
          this.list[index].Region)
      },
      addfilters(Province, City, Region) {
        for (var y in this.Address) {
          for (var z in this.Address[y].children) {
            for (var i in this.Address[y].children[z].children) {
              if (this.Address[y].children[z].children[i].label == Region && Region != undefined) {
                // this.InfoAddress = this.Address[y].label + this.Address[y].children[z].label + this.Address[y].children[
                //   z].children[i].label
                this.editform.ProvinceID = this.Address[y].value
                this.editform.CityID = this.Address[y].children[z].value
                this.editform.RegionID = this.Address[y].children[z].children[i].value
              }
            }
          }
        }
        this.form.selectedOptions = [this.editform.ProvinceID, this.editform.CityID,
          this.editform.RegionID
        ]
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getInfo()
      },
      handleChange(value) {
        this.form.city = this.form.selectedOptions[0];
        this.form.erae = this.form.selectedOptions[1]
        this.form.minerae = this.form.selectedOptions[2]
      },
      addsubmitForm(formName) {
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
                "api/Web_UserAddress/Add",
                qs.stringify({
                  Token: getCookie("token"),
                  name: this.form.Name,
                  phone: this.form.Phone,
                  address: this.form.Address,
                  isDefault: this.form.type ? 1 : 0,
                  provice: this.myAddressCity(this.form.city),
                  city: this.myAddressErae(this.form.erae),
                  region: this.myAddressMinerae(this.form.minerae),
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
                    this.dialogFormVisible = false
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
      submitForm(formName) {
        this.form.city = this.form.selectedOptions[0];
        this.form.erae = this.form.selectedOptions[1]
        this.form.minerae = this.form.selectedOptions[2]
        // console.log(this.myAddressCity(this.form.city))
        console.log(this.form.Type)
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
                "api/Web_UserAddress/Edit",
                qs.stringify({
                  Token: getCookie("token"),
                  AddressID: this.form.ID,
                  name: this.form.Name,
                  phone: this.form.Phone,
                  address: this.form.Address,
                  IsDefault: this.form.type ? 1 : 0,
                  provice: this.myAddressCity(this.form.city),
                  city: this.myAddressErae(this.form.erae),
                  region: this.myAddressMinerae(this.form.minerae),
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
                    this.dialogFormVisible2 = false
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
      moren(id) {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_UserAddress/SetDefault", {
            params: {
              Token: getCookie("token"),
              ID: id
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
                this.getInfo()
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
      del(id){
        this.$confirm('确认删除该地址?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_UserAddress/Del", {
            params: {
              Token: getCookie("token"),
              ID: id
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
                this.getInfo()
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      myAddressCity(value) {
        for (var y in this.Address) {
          if (this.Address[y].value == value) {
            return value = this.Address[y].label
          }
        }
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
      myAddressMinerae(value) {
        for (var y in this.Address) {
          for (var z in this.Address[y].children) {
            for (var i in this.Address[y].children[z].children) {
              if (this.Address[y].children[z].children[i].value == value && value != undefined) {
                return value = this.Address[y].children[z].children[i].label
              }
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
    padding: 30px 10%;
    width: 80%;
    position: relative;
  }

  h3 {
    padding: 20px 30px;
    border-bottom: 1px solid #EEEEEE;
  }

  .box {
    padding: 0 30px;
  }

  .el-icon-circle-plus:before {
    color: #CEAA70;
  }

  h3 span {
    color: #CEAA70;
    float: right;
    font-size: 15px;
    cursor: pointer;
  }

  .list {
    border: 1px solid #EEEEEE;
    padding: 20px;
    font-size: 15px;
    position: relative;
  }

  .btnbox {
    color: #CEAA70;
  }

  @media (min-width:768px) {
    .btnbox {
      position: absolute;
      right: 50px;
      top: 65px;
    }
  }

  .btnbox button {
    margin-left: 20px;
  }

  .btnbox span {
    cursor: pointer;
  }

  .block {
    text-align: center;
    margin-top: 50px;
    padding-bottom: 80px;
    width: 100%;
  }

</style>
