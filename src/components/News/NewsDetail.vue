<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>{{list.Title}}</h3>
        <div class="time">发布时间：{{list.CreateTime}}</div>
        <p v-html="decodeURIComponent(list.Content)"></p>
      </div>
    </div>
    <Call></Call>
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
        list:{
          Title:'',
          CreateTime:'',
          Content:''
        }
      }
    },
    mounted: function () {
      this.getInfo()
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
    },
    computed: {

    },
    methods: {
      getInfo() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Homepage/NewDetail", {
            params: {
              ID: window.location.href.split("id=")[1],
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result
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
              loading.close();
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      }
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
