<template>
  <div>
    <el-carousel arrow="always">
      <el-carousel-item v-for="item in bannerlist" :key="item.url">
        <img :src="item.Image" class="banner-img">
      </el-carousel-item>
    </el-carousel>
    <div class="content_2">
      <div class="content_2_box">
        <h3>
          <span class="product-title">推荐产品</span>
        </h3>
        <div class="container">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(item,index) in list" :key="index">
              <el-card class="box-card" shadow="hover">
                <div class="header">
                  <img :src="item.Logo" class="header-icon row-img">
                  <span class="header-icon">{{item.Name}}</span>
                </div>
                <div class="body">
                  <p class="card-money">{{item.Price}}</p>
                  <p class="card-title">最高额度</p>
                  <div>
                    <el-tag v-for="item in item.tag" :key="item">
                      {{item}}
                    </el-tag>
                  </div>
                  <el-button type="primary" class="card-btn" @click="apply(item.ID)">免费申请</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="content_3">
      <div class="content_3_box">
        <div class="dark">
          <h3>
            <span class="product-title advantage">六大优势</span>
          </h3>
          <div class="container">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <el-card class="box-card" shadow="hover">
                  <div class="body">
                    <img src="../../static/img/rapid_loan.png" class="advantage-icon">
                    <p>急速贷款</p>
                    <p class="advantage-text">多家银行受理贷款，银行自动审批，更快拿钱</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <el-card class="box-card" shadow="hover">
                  <div class="body">
                    <img src="../../static/img/big_data_service.png" class="advantage-icon">
                    <p>大数据服务</p>
                    <p class="advantage-text">通过大数据分析技术智能匹配您的个人信息以及最适合属于您的银行</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <el-card class="box-card" shadow="hover">
                  <div class="body">
                    <img src="../../static/img/product_variety.png" class="advantage-icon">
                    <p>产品多样</p>
                    <p class="advantage-text">由宁波各大银行和金融机构提供的银行审贷、信用卡、小额贷、POS、、车险、信贷经理等等，方便、快捷、安心的信贷金融之选</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <el-card class="box-card" shadow="hover">
                  <div class="body">
                    <img src="../../static/img/elastic_limit.png" class="advantage-icon">
                    <p>弹性额度</p>
                    <p class="advantage-text">用户可自定义申请借款额度，期限灵活，10万起，最高可达40万</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <el-card class="box-card" shadow="hover">
                  <div class="body">
                    <img src="../../static/img/operation_simple.png" class="advantage-icon">
                    <p>操作简单</p>
                    <p class="advantage-text">小火金融超市APP操作简单，线上申请，一对一专业服务</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <el-card class="box-card" shadow="hover">
                  <div class="body">
                    <img src="../../static/img/service_guarantee.png" class="advantage-icon">
                    <p>服务保障</p>
                    <p class="advantage-text">7*24小时服务，用心服务每一次信任</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="content_4">
      <div class="content_4_box">
        <h3>
          <span class="product-title">关于我们</span>
        </h3>
        <div class="container">
          <p class="aboutus">
            金融 指货币的发行、流通和回笼，贷款的发放和收回，存款的存入和提取，汇兑的往来等经济活动。
            <br/> 金融（FINANCE）就是对现有资源进行重新整合之后，实现价值和利润的等效流通。（专业的说法是：实行从储蓄到投资的过程，狭义的可以理解为金融是动态的货币经济学。）
            <br/> 金融是人们在不确定环境中进行资源跨期的最优配置决策的
            <br/> 金融的本质是价值流通。金融产品的种类有很多，其中主要包括银行、证券、保险、信托等。金融所涉及的学术领域很广，其中主要包括：会计、财务、投资学、银行学、证券学、保险学、信托学等等。
            <br/> 金融是一种交易活动，金融交易本身并未创造价值，那为什么在金融交易中就有赚钱的呢？按照陈志武先生的说法，金融交易是一种将未来收入变现的方式，也就是明天的钱 今天来花。
            <br/> 简单地说金融交易的频繁程度就是反映一个地区、区域、乃至国家经济繁荣能力的重要指标。
          </p>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  export default {
    data() {
      return {
        bannerlist: [],
        list: [],
        mainurl: ''
      }
    },
    mounted() {
      this.mainurl = mainurl;
      this.getInfo();
      this.getsSmall()
      this.transition()
    },
    methods: {
      transition(){
        $('.content_2_box').css({
          position: 'relative',
          opacity: 0,
          top: '90px',
        });
        $('.content_3_box').css({
          position: 'relative',
          opacity: 0,
          top: '90px'
        });
        $('.content_4_box').css({
          position: 'relative',
          opacity: 0,
          top: '90px'
        });

        $(window).scroll(function () {
          var sTop = $(document).scrollTop();
          if ($('.content_2').offset().top - sTop < 400) {
            $('.content_2_box').animate({
              position: 'absolute',
              opacity: 1,
              top: '50px',
            }, 1200)
          }
          if ($('.content_3').offset().top - sTop < 400) {
            $('.content_3_box').animate({
              position: 'absolute',
              opacity: 1,
              top: '50px'
            }, 1200)
          }
          if ($('.content_4').offset().top - sTop < 400) {
            $('.content_4_box').animate({
              position: 'absolute',
              opacity: 1,
              top: '50px'
            }, 1200)
          }
        })
      },
      
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
      getsSmall() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_SmailMarket/AmountLis", {
            params: {
              pageIndex: 1,
              pageSize: 6,
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result.list;
                for (var i = 0; i < this.list.length; i++) {
                  this.list[i].tag = new Array()
                  this.list[i].tag = this.list[i].Condition.split(",");
                }
                // this.Imgresize()
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
      apply(id) {
        this.$router.push("/Finance/SmallSupermarketDetail/id=" + id);
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

  /* banner居中显示，不受屏幕大小失真 */

  .el-carousel__container {
    position: relative;
  }

  .el-carousel__item.is-animating {
    width: 1920px;
    position: absolute;
    left: 50%;
    margin-left: -960px;
  }

  /* 推荐产品 */

  h3 {
    text-align: center;
    margin-top: 50px;
  }

  .product-title {
    margin-top: 30px;
    border-bottom: 3px solid #CEAA70;
    padding: 0 10px 10px 10px;
  }

  .el-row {
    margin-top: 60px;
  }

  .el-card {
    width: 96%;
    margin-left: 2%;
    margin-top: 20px;
  }

  .item {
    margin-bottom: 18px;
  }

  .header {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .header-icon {
    vertical-align: middle;
  }

  .row-img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .body {
    text-align: center;
  }

  .card-money {
    font-size: 30px;
    font-weight: bold;
    margin: 30px 0 0 0 !important;
  }

  .card-title {
    color: #BBBBBB;
    font-size: 15px;
    margin: 0 !important;
  }

  .body .el-tag+.el-tag {
    margin-left: 10px;
  }

  .el-tag {
    margin-top: 20px;
    background-color: #fff;
    color: #CEAA70;
    border: 1px solid #CEAA70;
  }

  .card-btn {
    width: 80%;
    margin-top: 50px;
  }

  /* 优势 */

  .dark {
    background: url(../../static/img/sy_bj.png);
    color: #eee;
    background-size: 100% 100%;
    padding: 80px 0;
    margin-top: 50px;
  }

  .content_3_box .box-card:hover {
    transform: translate3d(0, -4px, 0);
  }

  .advantage-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .advantage-text {
    text-align: left;
    min-height: 65px;
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

  @media (min-width:768px) {
    .aboutus {
      padding-bottom: 200px;
      margin-top: 50px;
    }
  }

</style>
