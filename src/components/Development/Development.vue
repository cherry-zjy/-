<template>
  <div id="app">
    <el-carousel arrow="always">
      <el-carousel-item v-for="item in bannerlist" :key="item.Image">
        <img :src="item.Image" class="banner-img">
      </el-carousel-item>
    </el-carousel>
    <h3>
      <span class="product-title">企业分布及发展</span>
    </h3>
    <div class="textbox">
      <p class="text-head">经营机构分部</p>
      <p class="text-body">现目前公司业务已拓展至全部18个省市：浙江省、江西省、上海市、江苏省、广东省、广西省、四川省、重庆市、山西省、陕西省、贵州省、甘肃省、湖南省
        湖北省、河南省、云南省、吉林省、内蒙古自治区......</p>
    </div>
    <div class="textbox">
      <p class="text-head">公司战略目标</p>
      <p class="text-body">未来二年内，公司将实现在全国各地市进行全面业务覆盖，建立不少于600家营业网点，将实现年投贷金额规模超50亿，成为国内汽车行业的标杆。</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bannerlist: [{
          Image: '../../../static/img/banner.png'
        }],
      }
    },
    mounted: function () {
      // this.getInfo()
    },
    beforeDestroy: function () {},
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
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    padding-bottom: 80px;
    background: url(../../../static/img/bj.png);
    background-size: 100% 100%;
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

  .product-title {
    margin-top: 30px;
    border-bottom: 3px solid #EA5B2D;
    padding: 0 10px 10px;
  }

  .banner-img {
    width: 100%;
    height: 100%;
  }

  .textbox {
    margin-top: 50px;
    width: 80%;
    margin-left: 10%;
    text-align: center
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

</style>
