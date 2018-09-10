<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <div class="dark">
          <el-row :gutter="20" style="position: relative;">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <img :src="list.Image" class="card-img" @click="handlePictureCardPreview(list.Image)">
            </el-col>
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
              <p class="big-text">{{list.Name}}</p>
              <p class="small-text">库存：{{list.stock}}</p>
              <el-input-number v-model="num1" @change="handleChange" :min="1" label="描述文字"></el-input-number>
              <p class="small-price">￥{{list.Price}}</p>
              <el-button type="primary" class="applybtn" size="small" @click="apply()">立刻购买</el-button>
            </el-col>
          </el-row>
          <div class="dark">
            <p class="title">
              <img src="../../../static/img/left.png" class="detail-img"> 商品详情
              <img src="../../../static/img/right.png" class="detail-img">
            </p>
            <div id="detail"></div>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        num1: 1,
        dialogVisible: false,
        dialogImageUrl: ''
      }
    },
    mounted: function () {
      document.getElementsByTagName("body")[0].className = "add_bg";
      this.getInfo()
    },
    updated() {
      this.Imgresize()
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {

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
          .get("api/Web_POSMarket/POSListDetails", {
            params: {
              ID: window.location.href.split("id=")[1],
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result;
                $("#detail").html(decodeURIComponent(response.data.Result.Detail))
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
      },
      //图片放大
      handlePictureCardPreview(url) {
        this.dialogImageUrl = url;
        this.dialogVisible = true;
      },
      Imgresize() {
        window.onresize = function () {
          $(".card-img").css("height", $(".card-img").width())
        }
        $(".card-img").css("height", $(".card-img").width())
      },
      handleChange(index) {},
      apply(id) {
        if (getCookie("token")) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.$http
            .get("api/Web_POSMarket/POSDD", {
              params: {
                Token: getCookie("token"),
                prodID: window.location.href.split("id=")[1],
                count: this.num1
              }
            })
            .then(
              function (response) {
                loading.close();
                var status = response.data.Status;
                if (status === 1) {
                  this.$router.push({
                    path: "/Finance/POSSupermarketOrder/id=" + response.data.Result + "&num=" + this.num1
                  });
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
        } else {
          this.$message({
            showClose: true,
            type: "warning",
            message: "请先登陆"
          });
          setTimeout(() => {
            this.$router.push({
              path: "/Login"
            });
          }, 1500);
        }
      },
    }
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
    margin-bottom: 60px;
  }

  .form-input {
    width: 50%;
  }

  #getcode {
    margin-left: 10px;
  }

  .card-img {
    width: 100%;
    cursor: pointer;
  }

  .big-text {
    font-size: 20px;
    color: #333333;
  }

  .small-text {
    color: #BBBBBB;
    font-size: 15px;
  }

  @media (min-width:768px) {
    .applybtn {
      position: absolute;
      bottom: 70px;
    }
  }

  .el-row {
    padding: 50px 20px;
  }

  .small-price {
    font-size: 25px;
    color: #FF2736
  }

  .dark {
    padding: 20px 20px 80px 20px;
    color: #333333;
    font-family: MicrosoftYaHei;
    border-top: 1px solid #EEEEEE;

  }

  .dark img {
    max-width: 100%;
  }

  .dark .detail-img {
    vertical-align: middle;
  }

  .dark .title {
    font-size: 20px;
    text-align: center;
    font-weight: 400;
    vertical-align: middle;
  }

</style>
