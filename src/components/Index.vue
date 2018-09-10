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
            <a class="navbar-brand page-scroll" href="/">
              <img src="../../static/img/logo_big.png" class="img-responsive">
            </a>
          </div>
          <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li :class="{active:linum=='Home'}">
                <a @click="navto('/')">首页 </a>
              </li>
              <li class="dropdown" :class="{active:linum=='Finance'}">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">金融服务
                  <i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a @click="navto('/Finance/SmallSupermarket')">小额超市</a>
                  </li>
                  <li>
                    <a @click="navto('/Finance/CreditManager')">信贷经理</a>
                  </li>
                  <li>
                    <a @click="navto('/Finance/BankLoan')">银行信贷</a>
                  </li>
                  <li>
                    <a @click="navto('/Finance/CardSupermarket')">信用卡超市</a>
                  </li>
                  <li>
                    <a @click="navto('/Finance/CarSupermarket')">车险超市</a>
                  </li>
                  <li>
                    <a @click="navto('/Finance/POSSupermarket')">POS超市</a>
                  </li>
                </ul>
              </li>
              <li class="dropdown" :class="{active:linum=='Help'}">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">帮助说明
                  <i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a @click="navto('/Help/Flow')">流程说明</a>
                  </li>
                  <li>
                    <a @click="navto('/Help/Formmanual')">平台手册</a>
                  </li>
                  <li>
                    <a @click="navto('/Help/HelpCenter')">帮助中心</a>
                  </li>
                </ul>
              </li>
              <li class="dropdown" :class="{active:linum=='Select'}">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">查询服务
                  <i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a>信用卡查询</a>
                  </li>
                  <li>
                    <a>贷款查询</a>
                  </li>
                </ul>
              </li>
              <li :class="{active:linum=='Find'}">
                <a @click="navto('/Find')">发现</a>
              </li>
              <li class="menu-btn">
                <img :src="Info.Image" class="menu-icon" @click="navto('/User')" v-if="login">
                <el-button size="small" @click="logout()" v-if="login">退出</el-button>
                <el-button type="primary" size="small" @click="gotologin()" v-if="!login">登录</el-button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div class="shelter"></div>
    <router-view @changehomeicon="icon"></router-view>
    <div class="foot ">
      <!-- <div class="container"> -->
        <el-row >
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <img src="../../static/img/customer_service_hotline.png" class="foot-icon">客服热线：0574-278900601 周一至周六（9:00-18:00）</el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <img src="../../static/img/place.png" class="foot-icon">公司地址：浙江省宁波市</el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <span style="font-family:Arial;">©</span>2002-2017. 宁波掌众金融外包服务有限公司. 版权所有.</el-col>
        </el-row>
      <!-- </div> -->
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
        Info: []
      };
    },
    mounted: function () {
      this.mainurl = mainurl

      var path = window.location.href;
      if (path.indexOf('Find') > 0) {
        this.linum = 'Find'
      } else if (path.indexOf('Finance') > 0) {
        this.linum = 'Finance'
      } else if (path.indexOf('Help') > 0) {
        this.linum = 'Help'
      } else if (path.indexOf('/User') > 0) {
        this.linum = ''
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
      gotologin() {
        this.$router.push("/Login");
      },
      // getInfo() {
      //   this.$http
      //     .get("api/Web_UserInfo/Center", {
      //       params: {
      //         Token: getCookie("token"),
      //       }
      //     })
      //     .then(
      //       function (response) {
      //         var status = response.data.Status;
      //         if (status === 1) {
      //           this.Info = response.data.Result;
      //         } else if (status === -1) {
      //           this.$message({
      //             showClose: true,
      //             type: "warning",
      //             message: response.data.Result
      //           });
      //           setTimeout(() => {
      //             this.$router.push({
      //               path: "/login"
      //             });
      //           }, 1500);
      //         } else {
      //           this.$message({
      //             showClose: true,
      //             type: "warning",
      //             message: response.data.Result
      //           });
      //         }
      //       }.bind(this)
      //     )
      //     // 请求error
      //     .catch(
      //       function (error) {
      //         this.$notify.error({
      //           title: "错误",
      //           message: "错误：请检查网络"
      //         });
      //       }.bind(this)
      //     );
      // },
      icon(data) {
        this.Info.Image = data;
        this.login = true
      },
      navto(path) {
        $(".collapse.in").removeClass("in")
        this.$router.push(path);
        if (path == '/Home' || path == '/') {
          this.linum = 'Home'
        } else if (path == '/Find') {
          this.linum = 'Find'
        } else if (path.indexOf('Finance') > 0) {
          this.linum = 'Finance'
        } else if (path.indexOf('Help') > 0) {
          this.linum = 'Help'
        }
      },
      // 退出
      logout() {
        let that = this;
        this.$confirm("确认退出吗?", "提示", {
            confirmButtonClass: "el-button--warning"
          })
          .then(() => {
            //确认
            that.loading = true;
            delCookie("token");
            this.$router.push("/Login");
          })
          .catch(() => {});
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
    /* .menu-btn button {
      position: absolute;
    } */
    .foot {
      font-size: 14px;
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
      margin-top: 40px;
    }
  }

  .foot {
    background-color: #3B3B3B;
    color: #fff;
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    text-align: center
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
    width: 25px;
    height: 25px;
  }

</style>
