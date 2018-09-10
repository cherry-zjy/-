<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <div class="step">
          <el-steps :active="3">
            <el-step></el-step>
            <el-step></el-step>
            <el-step></el-step>
          </el-steps>
        </div>
        <div class="dark">
          <div class="managerlist" v-for="(item,index) in 10" :key="index">
            <img src="../../../static/img/apxq_head_portrait@2x.png" class="manager-icon">
            <div class="manager-msg">
              <p class="manager-name">张三</p>
              <p class="manager-money">利率：
                <span class="yellow">5%</span>
                <span class="tall">最高：
                  <span class="yellow">80万</span>
                </span>
              </p>
              <p class="manager-text">微粒贷</p>
            </div>
            <el-button type="primary" class="manager-btn" size="small" @click="apply('1')">申请</el-button>
          </div>
        </div>
        <!-- 分页 -->
        <div class="block" v-if="pageCount>0">
          <el-pagination @current-change="handleCurrentChange" :page-count="pageCount" layout="prev, pager, next" :current-page="currentPage">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageIndex: 1,
        pageCount: 0,
      }
    },
    mounted: function() {
      document.getElementsByTagName("body")[0].className="add_bg"; 
    },
    beforeDestroy: function() {
        document.body.removeAttribute("class","add_bg");
    },
    computed: {
      currentPage: function () {
        return this.pageIndex
      }
    },
    methods: {
      // 分页
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getInfo();
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
  }

  .step {
    padding: 100px 0 0 0;
    width: 50%;
    margin-left: 25%;
  }

  #getcode {
    position: absolute;
    margin-left: 20px;
  }

  .dark {
    margin: 0 30px;
    color: #666666;
    margin-top: 50px;
    font-family: MicrosoftYaHei;
    border-top: 1px solid #EEEEEE;
  }

  .managerlist {
    display: inline-block;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #EEEEEE;
  }

  .manager-icon {
    width: 100px;
    height: 100px;
    float: left;
    border-radius: 50%;
  }

  .manager-msg {
    float: left;
    margin-left: 30px;
  }

  @media (max-width:768px) {
    .manager-icon {
      width: 3rem;
      height: 3rem;
    }
    .manager-msg {
      margin-left: 1rem;
    }
  }

  .manager-name {
    margin: 10px 0;
    font-weight: bolder;
    color: #333333;
  }

  .manager-money {
    margin: 10px 0;
    font-size: 15px;
    color: #BBBBBB;
  }

  span.yellow {
    color: #CEAA70;
  }

  .tall {
    margin-left: 20px;
  }

  .manager-text {
    margin: 10px 0;
    font-size: 15px;
    color: #BBBBBB;
  }

  .manager-btn {
    float: right;
    margin-top: 33px;
  }

  .block {
    text-align: center;
    margin-top: 50px;
    padding-bottom: 80px;
    width: 100%;
  }

  @media (max-width:768px) {
    .step{
      padding: 100px 0 0 0;
      width: 90%;
      margin-left: 5%;
    }
  }

</style>
