<template>
  <div class="box">
    <div id="l-map" style="height:350px;margin:20px 0;"></div>
    <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
  </div>
</template>
<script>
// import bus from "../utils/bus.js"
export default {
  props: {
    mapmsg: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    // 地图js
    // loadmap
    loadmap() {
      // 百度地图API功能
      var map = new BMap.Map("l-map");
      map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用

        var point = new BMap.Point(
          121.64681,29.890903
        );
        map.centerAndZoom(point, 20); // 初始化地图,设置城市和地图级别。
        // 给原定位点添加定位图标
        map.addOverlay(new BMap.Marker(point));
    }
  },
  mounted() {
    this.loadmap(); //加载地图和相关组件
  }
};
</script>
<style>
.box {
  width: 100%;
  height: 100%;
}
</style>
