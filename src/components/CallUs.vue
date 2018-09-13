<template>
  <el-popover placement="left" width="400" trigger="hover">
    <p><img src="../../static/img/phone.png" class="icon" />电话：0574-87562316</p>
    <p><img src="../../static/img/fax.png" class="icon" />传真：0574-87562316</p>
    <p><img src="../../static/img/address.png" class="icon" />地址：宁波市鄞州区扬帆路 999号研发园B2幢901室 </p>
    <p><img src="../../static/img/url.png" class="icon" />网址：www.kuaizijinrong.com</p>
    <el-button slot="reference" type="primary" class="tellus"><img src="../../static/img/contace_us.png" style="width:100%" />联系我们</el-button>
  </el-popover>
</template>
<script>
  export default {
    props: {

    },
    data() {
      return {};
    },
    methods: {

    },
    mounted() {

    }
  };

</script>
<style>
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

</style>
