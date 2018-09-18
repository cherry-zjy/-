<template>
  <div id="app">
    <el-carousel arrow="always">
      <el-carousel-item v-for="item in bannerlist" :key="item.Image">
        <img :src="item.Image" class="banner-img">
      </el-carousel-item>
    </el-carousel>
    <div class="container">
      <div class="main">
        <h3>
          <span class="product-title">关于我们</span>
        </h3>
        <div class="btnbox">
          <el-button type="primary" size="medium">公司简介</el-button>
          <el-button type="info" size="medium" @click="$router.push('JoinUs');">招贤纳士</el-button>
          <el-button type="info" size="medium" @click="$router.push('Culture');">企业文化</el-button>
          <el-button type="info" size="medium" @click="$router.push('Address');">公司地址</el-button>
        </div>
        <div class="textbox">
          <p class="text-head">公司简介</p>
          <p class="text-body">快子控股（浙江）集团有限公司，简称“快子金融”，是一家集融资担保、融资租赁、汽车租赁、汽车销售、数据科技、投资管理、资产
            管理为一体综合性汽车金融服务集团，目前业务已覆盖19个省。 </p>
          <p class="text-body">快子控股（浙江）集团有限公司紧跟国家金融政策，依托专业的金融服务团队、优质的金融科技技术支持，整合银行、担保、保险、股权
            投资同时为追求良好的资产质量和健康的商业模式，“快子金融”金融服务平台采取了共享模式，将传统金融服务与互联网分享精神相结合，
            充分利用合伙制的共享、共赢、同创的特点。</p>
        </div>
        <div class="textbox">
          <p class="text-head">控股公司</p>
          <p>浙江快子担保有限公司</p>
          <p>快子（浙江）融资租赁有限公司</p>
          <p>浙江快子汽车服务有限公司</p>
          <p>浙江快子数据科技有限公司</p>
          <p>上海金鼎金融信息有限公司</p>
        </div>
        <div class="textbox">
          <p class="text-head">战略合作伙伴</p>
          <p>中国人民财产保险股份有限公司宁波市分公司</p>
          <p>收吧收吧名车广场</p>
          <p>太原旧机动车交易中心有限公司</p>
        </div>
        <div class="textbox">
          <p class="text-head">合作银行</p>
          <p>上海银行股份有限公司宁波分行</p>
          <p>中国银行股份有限公司宁波市科技支行</p>
          <p>宁波鄞州农村商业银行股份有限公司高新区支行</p>
          <p>交通银行股份有限公司宁波分行</p>
        </div>
        <div class="textbox">
          <p class="text-head">业务区域</p>
          <p>浙江省、江西省、上海市、江苏省、广东省、广西省、四川省、重庆市、山西省、陕西省、贵州省、甘肃省、湖南省、湖北省、河南省、云南省、吉林省、宁夏自治区、内蒙古自治区......
          </p>
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
      }
    },
    mounted: function () {

    },
    computed: {

    },
    methods: {}
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
  @media (max-width: 768px) {
    .btnbox button{
      margin-top: 10px;
    }
  }

</style>
