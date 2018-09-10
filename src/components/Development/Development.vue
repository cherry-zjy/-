<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6" class="picture">
            <div @click="one(0)">
              <img src="../../../static/img/credit_card.png">
              <div class="step-text">{{list[0].Title}}</div>
            </div>
          </el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="jiantou">
            <img src="../../../static/img/jiantou.png" class="right">
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6" class="picture">
            <div @click="one(1)">
              <img src="../../../static/img/illegal.png">
              <div class="step-text">{{list[1].Title}}</div>
            </div>
          </el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="jiantou">
            <img src="../../../static/img/jiantou.png" class="right">
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6" @click="one(2)" class="picture">
            <div @click="one(2)">
              <img src="../../../static/img/merchants_gathering.png">
              <div class="step-text">{{list[2].Title}}</div>
            </div>
          </el-col>
        </el-row>

        <!-- <div class="step flex" @click="one(0)">
          <div class="step-main">
            <img src="../../../static/img/credit_card.png">
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="step-text">{{list[0].Title}}</div>
        </div>
        <div class="step flex" @click="one(1)">
          <div class="step-main">
            <img src="../../../static/img/illegal.png">
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="step-text">{{list[1].Title}}</div>
        </div>
        <div class="step" @click="one(2)">
          <img src="../../../static/img/merchants_gathering.png">
          <div class="step-text">{{list[2].Title}}</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
          Title: ''
        }, {
          Title: ''
        }, {
          Title: ''
        }]
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
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_UserInfo/GetProcess", {
            params: {
              type: 0,
              pageIndex: 1,
              pageSize: 6,
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result.data;
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
              loading.close();
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      },
      one(index) {
        this.$router.push("/Help/Flowone/id=" + index);
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
    display: flex;
  }

  .step {
    display: inline-block;
    cursor: pointer;
  }

  .el-row {
    width: 100%
  }

  .el-col {
    text-align: center
  }

  .right {
    margin-top: 40px;
  }

  @media (max-width:1200px) {
    .jiantou {
      display: none
    }
  }

  @media (min-width:768px) {
    .main {
      width: 70%;
      padding: 25% 15%;
    }
  }

  @media (max-width:768px) {
    .main {
      width: 100%;
      padding: 25% 0;
    }
  }

  .step-text {
    text-align: center;
    margin-top: 20px;
  }

  .picture {
    cursor: pointer;
  }

</style>
