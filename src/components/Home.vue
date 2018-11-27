<template>
  <div>
    <el-carousel arrow="always" id="banner">
      <el-carousel-item v-for="item in bannerlist" :key="item.url">
        <img :src="item.Image" class="banner-img">
      </el-carousel-item>
    </el-carousel>
    <h3>
      <span class="product-title">公司产品</span>
    </h3>
    <div class="container">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="scrollimation scale-in d1">
          <div class="box-card" shadow="hover">
            <img src="../../static/img/mortgage_loans.png" @click="$router.push('Business/MortgageLoan');" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="scrollimation scale-in d1">
          <div class="box-card" shadow="hover">
            <img src="../../static/img/financing_loan.png" @click="$router.push('Business/FinancingLoan');" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="scrollimation scale-in d1">
          <div class="box-card" shadow="hover">
            <img src="../../static/img/financing_lease.png" @click="$router.push('Business/FinanceLease');" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dark">
      <h3>
        <span class="product-title advantage">合作公司</span>
      </h3>
      <div class="container">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="cooperation scrollimation fade-right">
            <p>&bull;&nbsp;上海银行股份有限公司宁波分行</p>
            <p>&bull;&nbsp;中国银行股份有限公司宁波市科技支行</p>
            <p>&bull;&nbsp;宁波鄞州农村商业银行股份有限公司高新区支行</p>
            <p>&bull;&nbsp;交通银行股份有限公司宁波分行</p>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="cooperation scrollimation fade-right">
            <p>&bull;&nbsp;中国人民财产保险股份有限公司杭州市分公司</p>
            <p>&bull;&nbsp;收吧收吧名车广场</p>
            <p>&bull;&nbsp;太原旧机动车交易中心有限公司</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <h3>
      <span class="product-title">关于我们</span>
    </h3>
    <div class="container">
      <div class="aboutus scrollimation fade-right">
        <p>快子控股（浙江）集团有限公司，简称“快子金融”，是一家集融资担保、融资租赁、汽车租赁、汽车销售、数据科技、投资管理、资产管理为一体综合性汽车金融服务集团，目前业务已覆盖19个省。</p>
        <p>快子控股（浙江）集团有限公司紧跟国家金融政策，依托专业的金融服务团队、优质的金融科技技术支持，整合银行、担保、保险、股权投资同时为追求良好的资产质量和健康的商业模式，“快子金融”金融服务平台采取了共享模式，将传统金融服务与互联网分享精神相结合，充分利用合伙制的共享、共赢、同创的特点。</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bannerlist: [{
          Image: '../../static/img/banner.png'
        }],
        list: [],
        mainurl: '',
        clientWight: ''
      }
    },
    mounted() {
      this.mainurl = mainurl;
      this.waypoint()
      // 动态设置背景图的高度为浏览器可视区域高度
      // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
      // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
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
    updated() {

    },
    methods: {
      getInfo() {
        this.$http
          .get("api/Web_Home/HomeBanner", {
            params: {
              pageIndex: 1,
              pageSize: 999,
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
      waypoint() {
        console.log($('.scrollimation'))
        $('.scrollimation').waypoint(function () {
          $(this).addClass('in');
          // console.log($(this))
        }, {
          offset: '90%'
        });
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* banner */

  .banner-img {
    width: 100%;
    height: 100%;
  }

  /* 推荐产品 */

  h3 {
    text-align: center;
    margin-top: 50px;
  }

  .el-row {
    margin-top: 60px;
  }

  .el-card {
    width: 96%;
    margin-left: 2%;
    margin-top: 20px;
  }

  .box-card {
    padding: 0
  }

  .box-card img {
    width: 100%;
    cursor: pointer;
  }

  .box-card:hover {
    transform: translate3d(0, -4px, 0);
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .product-title {
    margin-top: 30px;
    border-bottom: 3px solid #EA5B2D;
    padding: 0 10px 10px;
  }

  /* 优势 */

  .dark {
    background: url(../../static/img/cooperation_company.png);
    color: #eee;
    background-size: 100% 100%;
    padding: 60px 0;
    margin-top: 50px;
  }

  .content_3_box .box-card:hover {
    transform: translate3d(0, -4px, 0);
  }

  .advantage {
    color: #fff;
    border-bottom: 3px solid #fff;
  }



  .dark h3 {
    margin-top: 0;
  }

  .dark .el-card {
    background-color: unset;
    color: #fff;
  }

  .aboutus {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 25px;
  }

  .aboutus p {
    text-indent: 2em;
  }

  @media (min-width:768px) {
    .aboutus {
      padding-bottom: 200px;
      margin-top: 50px;
    }

    .container .el-row {
      margin-top: 60px;
    }

    .cooperation p {
      padding: 15px 0
    }
  }

  @media (max-width:768px) {
    .container .el-row {
      margin-top: 0;
    }
  }

</style>
