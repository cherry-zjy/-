<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <!-- <a class="navbar-brand page-scroll" href="/">
              <img src="../../static/img/logo.png" class="img-responsive">
            </a> -->
          </div>
          <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav" v-if="phone">
              <li :class="{active:linum=='Home'}">
                <a @click="navto('/')">首页 </a>
              </li>
              <li :class="{active:linum=='JoinUs'}">
                <a @click="navto('/JoinUs/JoinUs')">公司简介</a>
              </li>
              <li class="dropdown" :class="{active:linum=='Business'}">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                  aria-expanded="false">业务产品
                  <i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a @click="navto('/Business/MortgageLoan')">按揭贷款</a>
                  </li>
                  <li>
                    <a @click="navto('/Business/FinancingLoan')">融资金贷款</a>
                  </li>
                  <li>
                    <a @click="navto('/Business/FinanceLease')">融资租赁</a>
                  </li>
                </ul>
              </li>
              <li :class="{active:linum=='Development'}">
                <a @click="navto('/Development/Development')">企业发展</a>
              </li>
              <li :class="{active:linum=='News'}">
                <a @click="navto('/News/News')">新闻资讯
                </a>
              </li>
              <li :class="{active:linum=='AboutUs'}">
                <a @click="navto('/AboutUs/AboutUs')">关于我们</a>
              </li>
            </ul>
            <div class="menu" v-if="!phone">
              <div class="navi_body">
                <div class="navi_head">
                  <div>
                    <span @click="navto('/')">
                      <p class="navi_title">首页</p>
                    </span>
                    <span @click="navto('/JoinUs/JoinUs')">
                      <p class="navi_title">公司简介</p>
                    </span>
                    <span>
                      <p class="navi_title">业务产品</p>
                      <p><a href="/#/Business/MortgageLoan">按揭贷款</a></p>
                      <p><a href="/#/Business/FinancingLoan">融资金贷款</a></p>
                      <p><a href="/#/Business/FinanceLease">融资租赁</a></p>
                    </span>
                    <a href="/" class="logo">
                      <img src="../../static/img/logo.png">
                    </a>
                    <span style="margin-left:220px;" @click="navto('/Development/Development')">
                      <p class="navi_title">企业发展</p>
                    </span>
                    <span @click="navto('/News/News')">
                      <p class="navi_title">新闻资讯</p>
                      <p><a href="/#/News/News">公司动态</a></p>
                      <p><a href="/#/News/News2">行业动态</a></p>
                      <p><a href="/#/News/News3">媒体聚焦</a></p>
                    </span>
                    <span @click="navto('/AboutUs/AboutUs')">
                      <p class="navi_title">关于我们</p>
                      <p><a href="/#/AboutUs/AboutUs">招贤纳士</a></p>
                      <p><a href="/#/AboutUs/Culture">文化企业</a></p>
                      <p><a href="/#/AboutUs/Address">公司地址</a></p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <router-view></router-view>
    <div class="foot">
      <div class="container">
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-row>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <p class="foot-head">关于我们</p>
                <p>公司简介</p>
                <p>企业发展</p>
                <p>新闻资讯</p>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <p class="foot-head">业务产品</p>
                <p>按揭贷款</p>
                <p>融资金贷款</p>
                <p>融资租赁</p>
              </el-col>
              <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <p class="foot-head">加入我们</p>
                <p>招贤纳士</p>
                <p>企业文化</p>
              </el-col>
            </el-row>
            <!-- <p class="foot-head">超链接</p> -->
            <!-- <p>连接1 | 连接2 | 连接3 | 连接4 | 连接5</p> -->
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="right-foot">
            <div class="float-right">
              <img src="../../static/img/kong.jpg" class="foot-icon">
              <p>关注快子金融微信公众号</p>
            </div>
          </el-col>
        </el-row>
        <p class="copyright">Copyright<span style="font-family:Arial;">©</span> 2015快子集团 浙ICP备15057000号</p>
        <p>联系电话：0574-87562316&nbsp;&nbsp;&nbsp;公司地址：宁波市鄞州区扬帆路999号研发园B2幢901室</p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        linum: 'Home',
        login: false,
        mainurl: '',
        Info: [],
        phone: false
      };
    },
    mounted: function () {
      this.mainurl = mainurl
      if (window.innerWidth >= 1200) {
        this.phone = false
      } else {
        this.phone = true
      }
      window.onresize = function temp() {
        if (window.innerWidth >= 1200) {
          this.phone = false
        } else {
          this.phone = true
        }
        console.log(this.phone)
      };
      var path = window.location.href;
      if (path.indexOf('AboutUs') > 0) {
        this.linum = 'AboutUs'
      } else if (path.indexOf('Business') > 0) {
        this.linum = 'Business'
      } else if (path.indexOf('News') > 0) {
        this.linum = 'News'
      } else if (path.indexOf('Development') > 0) {
        this.linum = 'Development'
      } else if (path.indexOf('JoinUs') > 0) {
        this.linum = 'JoinUs'
      } else {
        this.linum = 'Home'
      }
      if (getCookie("token") !== undefined && getCookie("token") !== null) {
        this.login = true
        // this.getInfo()
      } else {
        this.login = false
      }
    },
    methods: {
      navto(path) {
        $(".collapse.in").removeClass("in")
        this.$router.push(path);
        if (path == '/Home' || path == '/') {
          this.linum = 'Home'
        } else if (path.indexOf('Development') > 0) {
          this.linum = 'Development'
        } else if (path.indexOf('News') > 0) {
          this.linum = 'News'
        } else if (path.indexOf('AboutUs') > 0) {
          this.linum = 'AboutUs'
        } else if (path.indexOf('JoinUs') > 0) {
          this.linum = 'JoinUs'
        } else if (path.indexOf('Business') > 0) {
          this.linum = 'Business'
        }
      },
    }
  }

</script>

<style>
  .text-center {
    text-align: center;
  }

  .menu-logo {
    height: 60px;
    line-height: 60px;
    margin: 0;
    float: left;
  }

  .menu-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
  }

  .menu-btn button {
    margin: 13px 0;
    padding: 5px 20px;
  }

  .nav li a {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .foot {
      font-size: 14px;
    }

    .float-right {
      margin-top: 20px
    }
  }

  @media (min-width: 768px) {
    .menu-btn {
      float: right;
    }

    .menu-btn button {
      float: right;
    }

    .foot .el-row {
      margin-top: 20px;
    }
  }

  .foot {
    background-color: #333333;
    color: #BEBEBE;
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 360px;
  }

  .foot-head {
    color: #888888;
    margin: 10px 0;
  }

  .foot .foot-text+.foot-text {
    margin-left: 120px;
  }

  .el-submenu__icon-arrow {
    position: unset;
  }

  .shelter {
    height: 60px;
  }

  .foot-icon {
    vertical-align: middle;
    width: 65%;
  }

  .float-right {
    text-align: center;
    float: right
  }

  .copyright {
    border-top: 1px solid #444444;
    padding-top: 10px;
  }

</style>
