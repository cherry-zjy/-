<template>
  <div id="app">
    <h3>专属推荐人</h3>
    <div class="info" v-if="isshow">
      <img :src="list.Image" class="icon">
      <p>姓名：{{list.Name}}</p>
      <p>推荐码：{{list.InviteCode}}</p>
      <p>级别：{{list.Level}}</p>
      <p>电话：{{list.Phone}}</p>
      <p>微信号：{{list.Wxin}}</p>
    </div>
    <div class="tip" v-if="isshow">
      <p class="tip-tltle">温馨提示</p>
      <p class="tip-connect" v-html="decodeURIComponent(list.Tips)"></p>
    </div>
    <div class="text-center" v-if="!isshow">
      <img src="../../../static/img/kong.png">
      <p>您的上级不存在</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        mainurl: '',
        isshow:true
      }
    },
    mounted: function () {
      this.mainurl = mainurl
      this.getInfo()
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
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
          .get("api/Web_UserInfo/Referee", {
            params: {
              Token: getCookie("token")
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result;
              } else if (status === -1) {
                this.isshow = false
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

  .info {
    text-align: center;
  }

  .icon {
    width: 100px;
    height: 100px;
    border-radius: 50%
  }

  .tip {
    padding: 0 30px;
    /* font-size: 14px; */
    margin-top: 100px;
    border-top: 1px solid #EEEEEE;
    padding-bottom: 30px;
  }

  .tip-connect {
    color: #999999;
    line-height: 40px;
  }

</style>
