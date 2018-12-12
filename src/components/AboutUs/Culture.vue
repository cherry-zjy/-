<template>
  <div id="app">
    <el-carousel arrow="always" id="banner">
      <el-carousel-item v-for="item in bannerlist" :key="item.url">
        <img :src="mainurl+item.Image" class="banner-img">
      </el-carousel-item>
    </el-carousel>
    <div class="container">
      <div class="main">
        <h3>
          <span class="product-title">关于我们</span>
        </h3>
        <div class="btnbox">
          <el-button type="info" size="medium" @click="$router.push('SP');">SP招募</el-button>
          <el-button type="info" size="medium" @click="$router.push('AboutUs');">招贤纳士</el-button>
          <!-- <el-button type="info" size="medium" @click="$router.push('JoinUs');">招贤纳士</el-button> -->
          <el-button type="primary" size="medium">企业文化</el-button>
          <el-button type="info" size="medium" @click="$router.push('Address');">公司地址</el-button>
        </div>
        <div class="container">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="box-card" shadow="hover">
                <img src="../../../static/img/from.png"/>
                <p class="col-head">我们来自</p>
                <p class="col-body">银行、保险、担保公司的汽车金融者</p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="box-card" shadow="hover">
                <img src="../../../static/img/service.png"/>
                <p class="col-head">我们服务</p>
                <p class="col-body">让购车更简单，让金融更普惠</p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="box-card" shadow="hover">
                <img src="../../../static/img/core.png"/>
                <p class="col-head">我们核心</p>
                <p class="col-body">以风控为根本，以市场为引导，以共享为精神</p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="box-card" shadow="hover">
                <img src="../../../static/img/target.png"/>
                <p class="col-head">我们目标</p>
                <p class="col-body">汽车金融领域，有自己的争的一席之地</p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="box-card" shadow="hover">
                <img src="../../../static/img/challenge.png"/>
                <p class="col-head">我们挑战 </p>
                <p class="col-body">风险和业绩之间挑战极限平衡服务真正汽车人。</p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="box-card" shadow="hover">
                <img src="../../../static/img/culture.png"/>
                <p class="col-head">公司文化</p>
                <p class="col-body">规范创新求发展，共享自律引未来</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <Call></Call>
    </div>
  </div>
</template>

<script>
import Call from "../CallUs";
  export default {
    components: {
      Call
    },
    data() {
      return {
        bannerlist: [{
          Image: '../../../static/img/banner.png'
        }],
        mainurl:''
      }
    },
    mounted: function () {
      this.mainurl = mainurl
      this.getInfo()
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
    h3{
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

  .el-row{
    text-align: center;
    margin-top: 50px;
  }
  .box-card{
    margin-top: 30px;
  }
  .col-head{
    font-size: 20px;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    .btnbox button{
      margin-top: 10px;
    }
  }

</style>
