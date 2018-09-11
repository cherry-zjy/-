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
          <span class="product-title">公司产品</span>
        </h3>
        <div class="container">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="box-card" shadow="hover">
                <img src="../../static/img/mortgage_loans.png"/>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="box-card" shadow="hover">
                <img src="../../static/img/financing_loan.png"/>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="box-card" shadow="hover">
                <img src="../../static/img/financing_lease.png"/>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="content_3">
      <div class="content_3_box">
        <div class="dark">
          <h3>
            <span class="product-title advantage">合作公司</span>
          </h3>
          <div class="container">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="cooperation">
                <p>&bull;&nbsp;上海银行股份有限公司宁波分行</p>
                <p>&bull;&nbsp;中国银行股份有限公司宁波市科技支行</p>
                <p>&bull;&nbsp;宁波鄞州农村商业银行股份有限公司高新区支行</p>
                <p>&bull;&nbsp;交通银行股份有限公司宁波分行</p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="cooperation">
                <p>&bull;&nbsp;中国人民财产保险股份有限公司杭州市分公司</p>
                <p>&bull;&nbsp;收吧收吧名车广场</p>
                <p>&bull;&nbsp;太原旧机动车交易中心有限公司</p>                
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  export default {
    data() {
      return {
        bannerlist: [{
          Image:'../../static/img/banner.png'
        }],
        list: [],
        mainurl: ''
      }
    },
    mounted() {
      this.mainurl = mainurl;
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

  .box-card{
    padding: 0
  }

  .box-card img{
    width: 100%;
  }

  .box-card:hover {
    transform: translate3d(0,-4px,0);
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }

  .product-title{
    margin-top: 30px;
    border-bottom: 3px solid #EA5B2D  ;
    padding: 0 10px 10px;
  }

  /* 优势 */

  .dark {
    background: url(../../static/img/cooperation_company.png);
    color: #eee;
    background-size: 100% 100%;
    padding: 80px 0;
    margin-top: 50px;
  }

  .content_3_box .box-card:hover {
    transform: translate3d(0, -4px, 0);
  }

  .advantage {
    color: #fff;
    border-bottom: 3px solid #fff;
  }

  .cooperation p{
    padding: 15px 0
  }

  .dark h3 {
    margin-top: 0;
  }

  .dark .el-card {
    background-color: unset;
    color: #fff;
  }


</style>
