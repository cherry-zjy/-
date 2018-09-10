<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>收货地址</h3>
        <div class="dark" v-if="Default.length!==0&&addlist.length!==0">
          <div>收货地址：{{Default.Name}}</div>
          <div>联系方式：{{Default.Phone}}</div>
          <div>收货地址：{{Default.Province+Default.City+Default.Region+Default.Address}}</div>
          <div class="btnbox">
            <el-button size="small" @click="handleEdit()">修改地址</el-button>
            <br/>
            <el-button type="primary" size="small" @click="change()">更换地址</el-button>
          </div>
        </div>
        <div class="dark text-center" v-if="addlist.length!==0&&Default.length==0">
          <img src="../../../static/img/kong.png">
          <br/>
          <el-button type="primary" size="small" @click="change()">选择地址</el-button>
        </div>
        <div class="dark text-center" v-if="addlist.length==0">
          <img src="../../../static/img/kong.png">
          <br/>
          <el-button type="primary" size="small" @click="dialogFormVisible=true;form = []">新增地址</el-button>
        </div>
      </div>
      <div class="main">
        <h3>商品明细</h3>
        <div class="dark">
          <el-table :data="tableData" style="width: 100%" height="250">
            <el-table-column label="商品信息" width="300">
              <template slot-scope="scope">
                <img :src="scope.row.Image" class="pro-img" />
                <span>{{scope.row.ShopName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Subtotal" label="商品单价">
            </el-table-column>
            <el-table-column prop="Count" label="数量">
            </el-table-column>
            <el-table-column label="实付款">
              <template slot-scope="scope">
                <span style="color:#FF2736">{{scope.row.Total}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="right">
            <div>
              <label class="value">商品单价：</label>
              <div>￥{{tableData[0].Subtotal}}</div>
            </div>
            <div>
              <label class="value">商品件数：</label>
              <div>{{tableData[0].Count}}件</div>
            </div>
            <div>
              <label class="value pay">实付款：</label>
              <div class="pay">￥{{tableData[0].Total}}</div>
            </div>
            <el-button type="primary" size="small" @click="submit()">提交订单</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="更换地址" :visible.sync="dialogFormVisible1" center>
      <div v-for="(item,index) in addlist" :key="index" class="card">
        <P>收货人：{{item.Name}}</P>
        <P>联系方式：{{item.Phone}}</P>
        <P>收货地址：{{item.Province+item.City+item.Region}}</P>
        <img src="../../../static/img/tick.png" class="tick-img" v-if="tick == index">
        <img src="../../../static/img/tick_no.png" class="tick-img" v-if="tick !== index" @click="tick = index">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeadd()">确 定</el-button>
      </div>
    </el-dialog>
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
        <!-- <el-form-item prop="type">
          <el-checkbox-group v-model="form.Type">
            <el-checkbox label="设置默认地址" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
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
        console.log(this.form.erae)
        console.log(this.form.minerae)
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
        isshow:'',
        tick: '',
        tableData: [{
          
        }], //商品信息
        Default: [], //收货信息（默认）
        Address: [], //省市区数据源
        addlist: [], //收货地址（全部）
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        form: {
          city: '',
          erae: '',
          minerae: '',
          selectedOptions: [], //地区筛选数组
          Address: '',
          Name: '',
          Phone: '',
          Type: false
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
      }
    },
    mounted: function () {
      this.getMsg()
      this.getAdd()
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {

    },
    methods: {
      getMsg() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_POSMarket/GeneratingPosOrder", {
            params: {
              prodID: location.href.split("id=")[1].split("&")[0],
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.tableData = []
                this.tableData.push(response.data.Result)
                this.getInfo(response.data.Result.AddressID)
                // this.Default = response.data.Result
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
      getInfo(id) {
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
                this.addlist = response.data.Result.Data;
                for (let i = 0; i < response.data.Result.Data.length; i++) {
                  if (response.data.Result.Data[i].ID == id) {
                    this.Default = response.data.Result.Data[i]
                  }
                }
                console.log(this.Default)
                // this.getAdd()
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
      handleEdit() {
        this.dialogFormVisible2 = true
        this.form = this.Default
        this.form.city = this.Default.Province
        this.form.erae = this.Default.City
        this.form.minerae = this.Default.Region
        this.form.type = this.Default.IsDefault
        this.addfilters(this.Default.Province, this.Default.City,
          this.Default.Region)
      },
      addfilters(Province, City, Region) {
        for (var y in this.Address) {
          for (var z in this.Address[y].children) {
            for (var i in this.Address[y].children[z].children) {
              if (this.Address[y].children[z].children[i].label == Region && Region != undefined) {
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
        this.form.city = this.form.selectedOptions[0];
        this.form.erae = this.form.selectedOptions[1]
        this.form.minerae = this.form.selectedOptions[2]
        console.log(this.myAddressCity(this.form.city))
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
                  isDefaul: 0,
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
      // 新增地址
      addsubmitForm(formName) {
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
                "api/Web_UserAddress/Add",
                qs.stringify({
                  Token: getCookie("token"),
                  name: this.form.Name,
                  phone: this.form.Phone,
                  address: this.form.Address,
                  isDefaul: this.form.Type ? 1 : 0,
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
                    this.getMsg()
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
      change() {
        this.dialogFormVisible1 = true
      },
      // 更换地址
      changeadd() {
        console.log(this.tick)
        if (this.tick === "") {
          this.$message({
            showClose: true,
            type: "warning",
            message: "请选择收货地址"
          });
          return;
        }
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_POSMarket/AccordAddressChangeFreight", {
            params: {
              posOrderID: location.href.split("id=")[1].split("&")[0],
              addressID: this.addlist[this.tick].ID
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.dialogFormVisible1 = false
                this.getMsg()
              } else if (status === 40001) {
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
      submit() {
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
        if (this.Default.length == 0) {
          this.$message({
            showClose: true,
            type: "warning",
            message: '请选择收货地址'
          });
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
            "api/Web_POSMarket/PerfectPosOrder",
            qs.stringify({
              Token: getCookie("token"),
              PosOrderID: location.href.split("id=")[1].split("&")[0],
              Name: this.Default.Name,
              Phone: this.Default.Phone,
              Address: this.Default.Province + this.Default.City + this.Default.Region + this.Default.Address,
              Num: location.href.split("num=")[1]
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
                  this.$router.push({
                    path: "/Finance/POSSupermarketSubmitOrder/id=" + response.data.Result
                  });
                }, 1500);
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
      handleChange(value) {
        this.form.city = this.form.selectedOptions[0];
        this.form.erae = this.form.selectedOptions[1]
        this.form.minerae = this.form.selectedOptions[2]
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
  #app {
    background-color: #F5F5F5
  }

  .main {
    margin-top: 60px;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .form-input {
    width: 50%;
  }

  h3 {
    padding: 20px;
    margin: 0;
  }

  .dark {
    padding: 20px;
    color: #333333;
    font-family: MicrosoftYaHei;
    border-top: 1px solid #EEEEEE;
    position: relative;
    line-height: 30px;
  }

  .btnbox {
    position: absolute;
    right: 50px;
    top: 20px;
  }

  .btnbox button {
    margin-top: 10px;
  }

  .main+.main {
    margin-top: 0;
  }

  .pro-img {
    width: 100px;
    height: 100px;
    vertical-align: middle;
  }

  .right {
    text-align: right;
  }

  .value {
    width: 100px;
  }

  .right div div {
    width: 100px;
    display: inline-block;
  }

  label.pay {
    font-size: 17px;
    color: #333333;
    font-weight: 600;
  }

  div.pay {
    color: #FF2736;
    font-size: 17px;
    font-weight: 600;
  }

  .card {
    border-bottom: 1px solid #EEEEEE;
    margin-top: 10px;
    position: relative;
  }

  .tick-img {
    position: absolute;
    right: 20px;
    top: 30px;
    cursor: pointer;
  }

</style>
