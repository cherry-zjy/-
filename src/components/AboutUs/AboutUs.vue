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
          <el-button type="primary" size="medium">招贤纳士</el-button>
          <!-- <el-button type="info" size="medium" @click="$router.push('JoinUs');">招贤纳士</el-button> -->
          <el-button type="info" size="medium" @click="$router.push('Culture');">企业文化</el-button>
          <el-button type="info" size="medium" @click="$router.push('Address');">公司地址</el-button>
        </div>
        <div class="textbox">
          <p class="text-head">全国区域经理</p>
          <p>岗位职责：</p>
          <p>1、根据分管老总分配的任务指标，积极开拓市场，努力达成考核指标。</p>
          <p>2、负责贯彻实施公司批准的区域内各项市场政策，在区域内进行渠道的开拓。</p>
          <p>3、负责区域内汽车按揭、汽车租赁市场的调研，撰写可行性分析报告。</p>
          <p>4、负责指导、协助下属市场专员开拓渠道。</p>
          <p>5、负责维护区域内各合作经销商的关系，辅助、指导各营销网点业务上单流程，监控、跟踪各项运营数据。</p>
          <p>6、负责区域内团队的组建及管理。</p>
          <p>7、定期向分管老总汇报工作情况及区域市场开拓建议。</p>
          <div class="twoline">
            <p>任职要求</p>
            <p>1、本科及以上学历，市场营销专业，具有三年以上汽车金融行业的工作经验，两年以上团队管理工作经验，有一定的SP渠道资源。</p>
            <p>2、熟悉当地汽车金融产品，对区域市场的开拓有明确的实施措施。</p>
            <p>3、能熟练操作办公软件：WORD、EXCEL、PPT等。</p>
            <p>3、头脑灵活，具有良好语言表达能力和沟通协调能力。</p>
            <p>4、能吃苦耐劳，适应省内出差。</p>
          </div>
        </div>
        <div class="textbox">
          <p class="text-head">全国SP招募</p>
          <p class="text-body"> 浙江快子集团是一家专注于银行卡分期的汽车消费金融公司，以下简称快子集团。快子集团位于江南水乡兼海港城市的美丽宁波，快子集
            团已开通汽车银行卡分期业务，汽车库融业务和汽车租赁分期业务，现面向全国招聘SP。
          </p>
          <div class="twoline">
            <p>SP准入标准：</p>
            <p>1、合法设立的主体，拥有自已的经营团队。</p>
            <p>2、在行业内和当地口碑良好，具有一定的市场占有量有经济实力。</p>
            <p>3、热爱汽车金融，并有信心将业务做大，做精，拥有和公司一起长远发展的目标。</p>
          </div>
          <div class="twoline">
            <p>全国区域联系人：</p>
            <p>市地部总监   董新华   18067308050</p>
            <p>副总裁  徐帅   18658289866</p>
          </div>
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
