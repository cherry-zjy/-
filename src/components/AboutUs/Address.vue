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
          <el-button type="info" size="medium" @click="$router.push('AboutUs');">公司简介</el-button>
          <el-button type="info" size="medium" @click="$router.push('JoinUs');">招贤纳士</el-button>
          <el-button type="info" size="medium" @click="$router.push('Culture');">企业文化</el-button>
          <el-button type="primary" size="medium">公司地址</el-button>
        </div>
        <div class="container map">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
               <img src="../../../static/img/phone.png" class="address-icon"/>电话：0574-87562316
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16">
               <img src="../../../static/img/address.png" class="address-icon"/>地址：宁波市鄞州区扬帆路999号研发园B2幢901室 
            </el-col>
          </el-row>
           <BaiDuMap :mapmsg="locationMsg" ref="map"></BaiDuMap>
        </div>
      </div>
      <el-popover placement="left" width="400" trigger="hover">
        <p><img src="../../../static/img/phone.png" class="icon" />电话：0574-87562316</p>
        <p><img src="../../../static/img/fax.png" class="icon" />传真：0574-87562316</p>
        <p><img src="../../../static/img/address.png" class="icon" />地址：宁波市鄞州区扬帆路 999号研发园B2幢901室 </p>
        <p><img src="../../../static/img/url.png" class="icon" />网址：www.kuaizijinrong.com</p>
        <el-button slot="reference" type="primary" class="tellus"><img src="../../../static/img/contace_us.png" style="width:100%" />联系我们</el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
import BaiDuMap from "../BaiDuMap.vue"; //在页面中引入地图
  export default {
    components: {
      BaiDuMap
    },
    data() {
      return {
        bannerlist: [{
          Image: '../../../static/img/banner.png'
        }],
        locationMsg: {
          keyword: "",
          lnglat: "",
          address: "研发园"
        }
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
    width: 80%;
    margin-left: 10%;
    /* text-align: center */
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
  .address-icon{
    vertical-align: middle
  }
  .map{
    margin-top: 50px;
  }
  @media (max-width: 768px) {
    .btnbox button{
      margin-top: 10px;
    }
  }

</style>
