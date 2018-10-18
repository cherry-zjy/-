<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>
          <span class="product-title">业务产品</span>
        </h3>
        <div class="btnbox">
          <el-button type="info" size="medium" @click="$router.push('MortgageLoan');">按揭贷款</el-button>
          <el-button type="primary" size="medium">库融资金贷款</el-button>
          <el-button type="info" size="medium" @click="$router.push('FinanceLease');">融资租赁</el-button>
        </div>
        <div class="textbox">
          <p class="text-head">新车、二手车库融资金贷款</p>
          <p class="text-body">随着新汽车金融机构不断发展，并作为资本市场上最具有效率和活力的重要一环，直接性的为企业提供多样化的融资服务。汽车经销商、代理商、汽贸公司因经营周转需要，通过期在银行申办短期资金借款，车商以库存车辆作为质押物，借款人按月付息，到期还本并支付手续费。</p>
          <!-- <img src="../../../static/img/tp.png" class="tpimg"/> -->
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
      }
    },
    mounted: function () {
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {

    },
    methods: {
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

  .product-title{
    margin-top: 30px;
    border-bottom: 3px solid #EA5B2D  ;
    padding: 0 10px 10px;
  }

  .el-button--info{
    background-color: #ECEBEA;
    color: #888888;
    border-color: #ECEBEA;
  }

  .btnbox{
    text-align: center;
    margin-top: 50px;
  }

  .textbox{
    margin-top: 50px;
    width: 80%;
    padding-bottom: 50px;
    margin-left: 10%;
    text-align: center
  }

  .text-head{
    color: #333333;
    font-size: 22px;
    font-weight: 600;
    text-align: left
  }

  .text-body{
    color: #333333;
    text-indent:2em;
    text-align: left
  }

  .tpimg {
    margin-top: 20px;
    padding-bottom: 50px;
    max-width: 100%;
  }

  .tellus{
    position: fixed;
    right: 10%;
    top: 50%;
    width: 40px;
    height: 130px;
    white-space: inherit;
    padding: 10px;
    line-height: 1.5;
  }

  .icon{
    vertical-align: middle;
  }
  @media (max-width: 768px) {
    .btnbox button{
      margin-top: 10px;
    }
  }

</style>
