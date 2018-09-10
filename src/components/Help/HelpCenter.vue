<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>帮助中心</h3>
        <el-collapse v-model="activeName" accordion @change="handleChange">
          <el-collapse-item :title="item.Title" :name="index" v-for="(item,index) in list" :key="index">
            <div :class="'detail'+index" class="detail"></div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 0,
      list: []
    };
  },
  mounted: function() {
    this.getInfo();
    var tt = this;

    setTimeout(() => {
      tt.list.forEach((item, i) => {
        $(".detail"+i).html(decodeURIComponent(item.Content))
      });
    }, 500);

    document.getElementsByTagName("body")[0].className = "add_bg";
  },
  beforeDestroy: function() {
    document.body.removeAttribute("class", "add_bg");
  },
  computed: {},
  methods: {
    getInfo() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$http
        .get("api/Web_UserInfo/GetProcess", {
          params: {
            type: 1,
            pageIndex: 1,
            pageSize: 6
          }
        })
        .then(
          function(response) {
            loading.close();
            var status = response.data.Status;
            if (status === 1) {
              this.list = response.data.Result.data;
              // $("'detail'+index").html(decodeURIComponent(this.list.Content))
              $(".detail img").css("max-width", "100%");
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
          function(error) {
            console.log(error);
            loading.close();
            this.$notify.error({
              title: "错误",
              message: "错误：请检查网络"
            });
          }.bind(this)
        );
    },
    handleChange(val) {
      // console.log(val);
      // console.log(this.activeName)
    }
  }
};
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
}
.el-collapse-item {
  margin-top: 20px;
}
</style>
