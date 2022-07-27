<template>
  <div id="map"></div>
</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      viewer: null,
      scene: null,
      msg: null,
    });
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjczNDgzMy1hYzE1LTRjNWYtODZhMS01MjZkNWRiMDc2MmUiLCJpZCI6ODIxMzAsImlhdCI6MTY0NDU0ODc0M30.LpGXXWsbQXucV5MTeC2g8BCAQWiZp612gosWcK-7ocE";
    onMounted(() => {
      state.viewer = new Cesium.Viewer("map", {
        timeline: false,
        vrButton: false,
        animation: false,
       terrainProvider: new Cesium.CesiumTerrainProvider({
            url: "http://localhost:8083/terrain/甘孜地形切片/理塘县",
            minimumLevel: 0,
            maximumLevel: 15,
          }),
      });
      const b  = new Array();
      const promise = Cesium.GeoJsonDataSource.load("\\理塘数据\\dmx_lt_M25.json");
      promise.then(function (dataSource) {
        state.viewer.dataSources.add(dataSource);
      });
      state.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          98.914,
          31.697,
          4700
        ),
        orientation: {
          heading: Cesium.Math.toRadians(2.0),
          pitch: Cesium.Math.toRadians(-25.0),
        },
      });
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style>
</style>
