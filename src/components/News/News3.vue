<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <h3>
          <span class="product-title">新闻资讯</span>
        </h3>
        <div class="btnbox">
          <el-button type="info" size="medium" @click="navto('/News/News')">公司动态</el-button>
          <el-button type="info" size="medium" @click="navto('/News/News2')">行业动态</el-button>
          <el-button type="primary" size="medium" @click="navto('/News/News3')">媒体聚焦</el-button>
        </div>
        <div class="dark">
          <!-- <div class="managerlist" v-for="(item,index) in list" :key="index">
            <a class="news-item" @click="apply(item.ID)">
              <img class="news-item-avatar" :src="item.Image">
              <div class="news-item-right">
                <p class="news-item-caption">{{item.Tital}}</p>
                <p class="news-item-brief">{{item.CreateTime}}</p>
                <p class="news-item-con">{{item.Conteat}}</p>
                <el-tag class="pctag" type="danger" v-for="(items,index) in item.tag" :key="index">{{items}}</el-tag>
              </div>
            </a>
            <el-tag class="phonetag" type="danger" v-for="(items,index) in item.tag" :key="index">{{items}}</el-tag>
          </div> -->
          <!-- <div class="col-xs-12"> -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <li>
              <a class="news-item">  
                <img class="news-item-avatar" src="../../../static/img/1920x896.jpg">

                <p id="pc-time" class="news-item-time">2018.02.01</p>
                <div class="news-item-right">
                  <p class="news-item-caption">日出姚江红似火 栖息鸟儿觅食忙</p>
                  <p class="news-item-brief">出，指太阳初升出地平线或最初看到的太阳的出现。一般是指太阳由东方的地平线徐徐升起的时间，而确实的定义为日面刚从地平线出现的一刹那，而非整个日面离开地平线。</p>
                  <p id="phone-time" class="news-item-time">2018.02.01</p>

                </div>
              </a>
            </li>
            </el-col>
          <!-- </div> -->
        </div>
        <Call></Call>
        <!-- 分页 -->
        <div class="block" v-if="pageCount>0">
          <el-pagination :page-count="pageCount" layout="prev, pager, next" :current-page="currentPage">
          </el-pagination>
        </div>
      </div>

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
        type: 1,
        pageIndex: 1,
        pageCount: 1,
        list: [{
          ID: 1,
          Image: '../../../static/img/1920x896.jpg',
          Tital: '日出姚江红似火 栖息鸟儿觅食忙',
          CreateTime: '2018年8月29日',
          Conteat: '出，指太阳初升出地平线或最初看到的太阳的出现。一般是指太阳由东方的地平线徐徐升起的时间，而确实的定义为日面刚从地平线出现的一刹那，而非整个日面离开地平线。',
          tag: ['标签一', '标签二', '标签三']
        }, {
          ID: 1,
          Image: '../../../static/img/1920x896.jpg',
          Tital: '日出姚江红似火 栖息鸟儿觅食忙',
          CreateTime: '2018年8月29日',
          tag: ['标签一', '标签二', '标签三'],
          Conteat: '出，指太阳初升出地平线或最初看到的太阳的出现。一般是指太阳由东方的地平线徐徐升起的时间，而确实的定义为日面刚从地平线出现的一刹那，而非整个日面离开地平线。'
        }, {
          ID: 1,
          Image: '../../../static/img/1920x896.jpg',
          Tital: '日出姚江红似火 栖息鸟儿觅食忙',
          CreateTime: '2018年8月29日',
          tag: ['标签一', '标签二', '标签三'],
          Conteat: '出，指太阳初升出地平线或最初看到的太阳的出现。一般是指太阳由东方的地平线徐徐升起的时间，而确实的定义为日面刚从地平线出现的一刹那，而非整个日面离开地平线。'
        }, {
          ID: 1,
          Image: '../../../static/img/1920x896.jpg',
          Tital: '日出姚江红似火 栖息鸟儿觅食忙',
          CreateTime: '2018年8月29日',
          tag: ['标签一', '标签二', '标签三'],
          Conteat: '出，指太阳初升出地平线或最初看到的太阳的出现。一般是指太阳由东方的地平线徐徐升起的时间，而确实的定义为日面刚从地平线出现的一刹那，而非整个日面离开地平线。'
        }, {
          ID: 1,
          Image: '../../../static/img/1920x896.jpg',
          Tital: '日出姚江红似火 栖息鸟儿觅食忙',
          CreateTime: '2018年8月29日',
          tag: ['标签一', '标签二', '标签三'],
          Conteat: '出，指太阳初升出地平线或最初看到的太阳的出现。一般是指太阳由东方的地平线徐徐升起的时间，而确实的定义为日面刚从地平线出现的一刹那，而非整个日面离开地平线。'
        }]
      }
    },
    mounted: function () {
      this.mainurl = mainurl;
      // this.getInfo()
      document.getElementsByTagName("body")[0].className = "add_bg";
    },
    beforeDestroy: function () {
      document.body.removeAttribute("class", "add_bg");
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
        // this.getInfo();
      },
      navto(path) {
        this.$router.push(path);
      },
      apply(id) {
        this.$router.push('/News/NewsDetail/id=' + id);
      },
      // getInfo() {
      //   const loading = this.$loading({
      //     lock: true,
      //     text: "Loading",
      //     spinner: "el-icon-loading",
      //     background: "rgba(0, 0, 0, 0.7)"
      //   });
      //   this.$http
      //     .get("api/Web_NewsList/findList", {
      //       params: {
      //         pageIndex: this.pageIndex,
      //         pageSize: 12
      //       }
      //     })
      //     .then(
      //       function (response) {
      //         loading.close();
      //         var status = response.data.Status;
      //         if (status === 1) {
      //           this.list = response.data.Result.data
      //           this.pageCount = response.data.Result.page
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
      //         loading.close();
      //         this.$notify.error({
      //           title: "错误",
      //           message: "错误：请检查网络"
      //         });
      //       }.bind(this)
      //     );
      // }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    margin-top: 60px;
    background-color: #fff;
    margin-bottom: 60px;
    float: left;
    min-width: 100%;
  }

  h3 {
    padding-top: 50px;
    text-align: center;
    margin-top: 50px;
    font-size: 28px;
  }

  .product-title {
    margin-top: 30px;
    border-bottom: 3px solid #EA5B2D;
    padding: 0 10px 10px;
  }

  .btnbox {
    text-align: center;
    margin-top: 50px;
    padding-bottom: 30px;
  }

  .el-button--info {
    background-color: #ECEBEA;
    color: #888888;
    border-color: #ECEBEA;
  }

  .dark {
    margin: 0 30px;
    color: #666666;
    font-family: MicrosoftYaHei;
    border-top: 1px solid #EEEEEE;
  }

  .managerlist {
    /* float: left; */
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #EEEEEE;
    cursor: pointer;
  }

  .news-item-caption {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    .dark {
      margin: 0 8px;
    }
  }

  .block {
    float: left;
    text-align: center;
    margin-top: 50px;
    padding-bottom: 80px;
    width: 100%;
  }

  .el-tag {
    margin: 0 20px 0 0;
  }

  @media (max-width: 768px) {
    .el-tag {
      margin: 10px 10px 0 0;
    }

    .pctag {
      display: none
    }

    .phonetag {
      display: -webkit-inline-box
    }
  }

  @media (min-width: 768px) {
    .pctag {
      display: -webkit-inline-box
    }

    .phonetag {
      display: none
    }
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
  }

  .icon {
    vertical-align: middle;
  }

  @media (max-width: 768px) {
    h3 {
      padding-top: 0
    }
  }

  .news-item {
	padding-top: 29px;
	display: flex;
	padding-bottom: 29px;
	border-bottom: 1px solid rgba(100, 100, 100, 0.2);
	color: #2f353f;
}
.news-item-avatar {
    height: 180px;
    width: 270px;
    overflow: hidden;
    background-color: black;
    flex-shrink: 0;
}

.news-item-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.news-item-time {
	text-align: left;
	margin-left: 20px;
	width: 62px;
	font-size: 10px;
	font-weight: 300;
	padding-top: 0;
	flex-shrink: 0;
	margin-top: 0;
}
.news-item-right {
	text-align: left;
	margin-left: 20px;
}
.news-item-caption {
	font-size: 22px;
	font-weight: 500;
	line-height: 33px;
	margin-bottom: 10px;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.news-item-brief {
    font-size: 16px;
    font-weight: 300;
    line-height: 33px;
    display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
/*手机版本*/
@media (max-width: 768px) {
	#pc-time {
		display: none;
	}
	.news {
		margin-top: 202px;
	}
	.news-container {
		padding: 14px 28px 0 28px;
	}
	.news-item {
		padding-top: 14px;
		padding-bottom: 11px;
	}
	.news-item-avatar {
		width: 150px;
		height: 100px;
	}
	.news-item-right {
		margin-left: 10px;
	}
	.news-item-caption {
		font-size: 18px;
		line-height: 20px;
		height: 20px;
		color: #646464;
	}
	.news-item-brief {
		font-size: 10px;
		line-height: 20px;
		max-height: 40px;
	}
	.news-item-time {
		margin-left: 0;
		margin-top: 10px;
	}
	.news-more {
		margin-top: 24px;
		padding-bottom: 33px;
		color: #646464;	
		font-size: 10px;	
		line-height: 10px;
	}
	
}

/*pc版本*/
@media (min-width: 769px) {
	.news-item-brief {
		margin-top: 37px;
	}
	/*.news-item-right , .news-item-time{
	    margin-top: 37px;
	}*/
	#phone-time {
		display: none;
	}
}
li{
  list-style: none;
}

</style>
