<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>日出姚江红似火 栖息鸟儿觅食忙</h3>
        <div class="time">发布时间：2018-7-19</div>
        <p>     12月20日,蚂蚁金服宣布全面开启农村金融战略并发布“谷雨计划”:未来三年,将面向国内所有“三农”用户,拉动合作伙伴
        </p>
        <p>1、办理信用卡的条件：年满18周岁的成年人。如果没有信用卡，则要求提供本公司的财务证明你的收入状况等相关证明，要是已经拥有一张信用卡，则可以以卡办卡方便了 不少的步骤。必须提供本人的身份证。
        </p>
        <p>1、办理信用卡的条件：年满18周岁的成年人。如果没有信用卡，则要求提供本公司的财务证明你的收入状况等相关证明，要是已经拥有一张信用卡，则可以以卡办卡方便了 不少的步骤。必须提供本人的身份证。
        </p>
        <p>1、办理信用卡的条件：年满18周岁的成年人。如果没有信用卡，则要求提供本公司的财务证明你的收入状况等相关证明，要是已经拥有一张信用卡，则可以以卡办卡方便了 不少的步骤。必须提供本人的身份证。
        </p>
        <p>1、办理信用卡的条件：年满18周岁的成年人。如果没有信用卡，则要求提供本公司的财务证明你的收入状况等相关证明，要是已经拥有一张信用卡，则可以以卡办卡方便了 不少的步骤。必须提供本人的身份证。
        </p>
      </div>
    </div>
    <el-popover placement="left" width="400" trigger="hover">
          <p><img src="../../../static/img/phone.png" class="icon"/>电话：0574-87562316</p>
          <p><img src="../../../static/img/fax.png" class="icon"/>传真：0574-87562316</p>
          <p><img src="../../../static/img/address.png" class="icon"/>地址：宁波市鄞州区扬帆路 999号研发园B2幢901室 </p>
          <p><img src="../../../static/img/url.png" class="icon"/>网址：www.kuaizijinrong.com</p>
          <el-button slot="reference" type="primary" class="tellus"><img src="../../../static/img/contace_us.png" style="width:100%"/>联系我们</el-button>
        </el-popover>
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
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
        this.$router.push("/Finance/BankLoanApplysecond/id=" + window.location.href.split("id=")[1]);
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
    padding: 30px 10%;
    width: 80%;
  }

  h3 {
    text-align: center;
    font-size: 28px;
  }

  .main p {
    line-height: 40px;
  }
  .time{
    text-align: center;
    color: #999999;
    font-size: 14px;
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

</style>
