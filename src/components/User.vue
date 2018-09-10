<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <div class="user-nav">
          <img :src="Info.Image" class="user-icon">
          <P class="user-name">{{Info.NickName}}</P>
          <div v-for="(item,index) in menulist" :key="index">
            <a @click.stop='navtourl(index,item.path)' :class="{active:current==index}">{{item.name}}</a>
          </div>
        </div>
        <!-- 右侧路由信息 -->
        <div class="right">
          <router-view @changeicon="icon" @changename="name"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Info:[],
        iscloseNav: false,
        mainurl:'',
        current:0,
        menulist:[{
          name:"个人信息",
          path:"/User"
        },{
          name:"我的订单",
          path:"/User/Order"
        },{
          name:"POS超市订单",
          path:"/User/POSOrder"
        },{
          name:"收货地址",
          path:"/User/Address"
        },{
          name:"推广管理",
          path:"/User/Spread"
        },{
          name:"专属推荐人",
          path:"/User/Recommend"
        },{
          name:"我的钱包",
          path:"/User/Money"
        }]
      }
    },
    mounted() {
      if (getCookie("token") == undefined || getCookie("token") == null) {
          this.$message({
            showClose: true,
            type: "warning",
            message: "请先登录"
          });
          setTimeout(() => {
            this.$router.push({
              path: "/Login"
            });
          }, 1500);
          return;
        }
      this.mainurl = mainurl
      this.getInfo()
      var path = window.location.href;
       if(path.indexOf('User/Order')>0){
          this.current = 1
        }else if(path.indexOf('User/POSOrder')>0){
          this.current = 2
        }else if(path.indexOf('User/Address')>0){
          this.current = 3
        }else if(path.indexOf('User/Spread')>0){
          this.current = 4
        }else if(path.indexOf('User/Recommend')>0){
          this.current = 5
        }else if(path.indexOf('User/Money')>0){
          this.current = 6
        }else{
          this.current = 0
          // this.$router.push("/User/Info");
        }
      document.getElementsByTagName("body")[0].className = "add_bg";
      var tt = this;
      if (getCookie("token")) {
        console.log()
      } else {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请先登陆"
        });
        // setTimeout(() => {
        //   this.$router.push({
        //     path: "/login"
        //   });
        // }, 1500);
      }
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {

    },
    methods: {
      getInfo() {
        this.$http
          .get("api/Web_UserInfo/Center", {
            params: {
              Token: getCookie("token"),
            }
          })
          .then(
            function (response) {
              var status = response.data.Status;
              if (status === 1) {
                this.Info = response.data.Result;
              } else if (status === -1) {
                this.$message({
                  showClose: true,
                  type: "warning",
                  message: response.data.Result
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/login"
                  });
                }, 1500);
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
      icon(data){//触发子组件修改头像的事件
        this.Info.Image = mainurl+data;//改变了父组件的值
        this.$emit('changehomeicon',mainurl+data);
      },
      name(data){
        this.Info.NickName = data;//改变了父组件的值
      },
      // 个人中心  修改密码
      navtourl(index,path){
        this.current=index;
        this.$router.push(path);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    margin-top: 60px;
    margin-bottom: 60px;
    position: relative;
  }

  .main p {
    line-height: 40px;
  }

  .right {
    margin-left: 270px;
    box-sizing: border-box;
    background-color: #fff;
  }

  .user-nav {
    width: 240px;
    position: absolute;
    top: 0;
    bottom: 0;
    transition: padding-top .3s;
    background-color: #fff;
    text-align: center;
  }

  @media (min-width: 768px) {
    .user-nav {
      min-height: 750px;
    }
    .right {
      min-height: 750px;
    }
  }

  @media (max-width: 768px) {
    .user-nav {
      width: 100%;
      position: static;
      margin-top: 0;

    }
    .right {
      margin-left: 0;
      margin-top: 20px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  @media (max-width: 1140px) {
    .container {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 20px;
    }
  }

  .container {
    padding: 0;
  }
  .user-icon{
    margin-top: 30px;
    width: 100px;
    height: 100px;
    border-radius: 50%
  }
  .user-name{
    font-size: 16px;
    margin-bottom: 30px;
  }
  .user-nav div{
    line-height: 40px;
    
  }
  .user-nav div a{
    color: #333333;
    cursor: pointer;
  }
  .user-nav div a.active{
    color: #CEAA70;
  }

</style>
