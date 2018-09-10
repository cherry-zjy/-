<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <div class="dark">
          <div class="text">订单提交成功，请尽快完成支付</div>
          <div class="greytext">交易号：1234564546</div>
          <div class="right">￥68</div>
        </div>
        <div class="dark">
          <div class="payway-text">付款方式</div>
          <div class="payway">
            <img src="../../../static/img/wechat.png" class="wechat-img">
            <span>微信支付</span>
          </div>
          <div class="right-img">
            <img src="../../../static/img/tick.png" />
          </div>
          <div class="paybtn">
            <el-button type="primary" size="small" class="paynow">立即付款</el-button>
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
        choose: 0,
        checked: true,
        num1: 1,
        tableData: [{
          price: '￥68',
          number: 1,
          pay: '￥68',
        }]
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
      handleChange(index) {}
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #app {
    background-color: #F5F5F5
  }

  .main {
    margin-top: 60px;
    background-color: #fff;
    margin-bottom: 20px;
    border-bottom: 1px solid #EEEEEE;
  }

  .form-input {
    width: 50%;
  }

  .dark {
    padding: 20px;
    color: #333333;
    font-family: MicrosoftYaHei;
    border-top: 1px solid #EEEEEE;
    position: relative;
    line-height: 30px;
  }

  .text {
    color: #333333;
    margin-top: 20px;
  }

  .payway-text {
    color: #333333;
  }

  .greytext {
    font-size: 15px;
    color: #999999;
    margin-top: 20px;
  }

  .right {
    position: absolute;
    color: #FF2736;
    font-size: 23px;
    right: 20px;
    top: 50px;
  }

  .payway {
    margin-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #EEEEEE;
  }

  .wechat-img {
    width: 60px;
    height: 60px;
    vertical-align: middle;
  }

  .right-img {
    position: absolute;
    right: 20px;
    top: 95px;
  }

  .paybtn {
    margin-top: 20px;
    text-align: right;
  }

</style>
