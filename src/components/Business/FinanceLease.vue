<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>
          <span class="product-title">业务产品</span>
        </h3>
        <div class="btnbox">
          <el-button type="info" size="medium" @click="$router.push('MortgageLoan');">按揭贷款</el-button>
          <el-button type="info" size="medium" @click="$router.push('FinancingLoan');">融资金贷款</el-button>
          <el-button type="primary" size="medium">融资租赁</el-button>
        </div>
        <div class="textbox">
          <p class="text-head">新车二手车按揭贷款</p>
          <p class="text-body">购买人在购买新车、二手车时，通过其在银行申办的用于汽车按揭分期付款的专项贷款，以所购的车辆作为抵
押性物，向银行申请贷款。贷款发放后，购车人按月分期还款的方式偿还透支资金并支付分期手续费。</p>
          <img src="../../../static/img/tp.png" class="tpimg"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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

  .tpimg{
    margin-top: 20px;
    padding-bottom: 50px;
  }

</style>
