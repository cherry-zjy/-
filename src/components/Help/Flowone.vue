<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>{{Title}}</h3>
        <p class="detail"></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // Info:"",
        Title:''
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
      getInfo(){
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http
          .get("api/Web_UserInfo/GetProcess", {
            params: {
              type:0,
              pageIndex: 1,
              pageSize: 6,
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                $(".detail").html(decodeURIComponent(response.data.Result.data[window.location.href.split("id=")[1]].Content))
                $(".detail img").css("max-width","100%")
                this.Title = response.data.Result.data[window.location.href.split("id=")[1]].Title;
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
              console.log(error)
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

  h3{
    text-align: center;
  }
  .main p{
    line-height: 40px;
  }
  

</style>
