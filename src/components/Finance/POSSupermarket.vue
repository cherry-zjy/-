<template>
  <div id="app">

    <div class="container">
      <h3>POS超市</h3>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(item,index) in list" :key="index">
          <div class="card" @click="apply(item.ID)">
            <img class="row-img" :src="item.Image">
            <div class="row-name">{{item.Name}}</div>
            <div class="row-price">￥{{item.Price}}</div>
          </div>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <div class="block" v-if="pageCount>0">
        <el-pagination @current-change="handleCurrentChange" :page-count="pageCount" layout="prev, pager, next" :current-page="currentPage">
        </el-pagination>
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
        list: []
      }
    },
    computed: {
      currentPage: function () {
        return this.pageIndex
      }
    },
    mounted() {
      this.mainurl = mainurl;
      this.getInfo();
    },
    updated() {
      this.Imgresize()
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
          .get("api/Web_POSMarket/POSList", {
            params: {
              pageIndex: this.pageIndex,
              pageSize: 6,
            }
          })
          .then(
            function (response) {
              loading.close();
              var status = response.data.Status;
              if (status === 1) {
                this.list = response.data.Result.list;
                this.pageCount = response.data.Result.page;

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
      },
      Imgresize() {
        window.onresize = function () {
          $(".row-img").css("height", $(".row-img").width())
        }
        $(".row-img").css("height", $(".row-img").width())
      },
      apply(id) {
        this.$router.push("/Finance/POSSupermarketDetail/id=" + id);
      },
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
  h3 {
    text-align: center;
    margin-top: 90px;
    font-family: MicrosoftYaHei;
    color: rgba(43, 43, 43, 1);
  }

  .product-title {
    border-bottom: 3px solid #CEAA70;
    padding: 0 10px 10px 10px;
  }

  .el-row {
    margin-top: 60px;
  }

  .card {
    background-color: #EEEEEE;
    margin-top: 20px;
    cursor: pointer;
  }

  .row-img {
    width: 100%;
  }

  .row-name {
    color: #2B2B2B;
    padding: 10px 40px;
    line-height: 21px;
  }

  .row-price {
    color: #FF2736;
    padding: 0 40px 20px 40px;
    font-size: 25px;
  }

  .el-pagination {
    margin-top: 50px;
    text-align: center;
    margin-bottom: 100px;
  }

</style>
