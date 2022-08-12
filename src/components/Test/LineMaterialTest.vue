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
        shouldAnimate: true,
        terrainProvider: new Cesium.CesiumTerrainProvider({
            // url: "http://localhost:8083/terrain/甘孜地形切片/理塘县",
            url: "http://192.168.0.211:8083/terrain/甘孜地形切片/甘孜县",
            minimumLevel: 0,
            maximumLevel: 15,
          }),
      });
      state.viewer.entities.add({
        name: "testLine",
        polyline: {
          positions: new Cesium.Cartesian3.fromDegreesArray([
            -135, 65, -60, 65,
          ]),
          clampToGround: true,
          width: 20,
          material: new Cesium.PolylineGlowMaterialProperty({
            color: Cesium.Color.DODGERBLUE,
            glowPower: 0.25,
          }),
        },
      });
      state.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          100.34,
          31.888,
          14400
        ),
      });
      state.viewer.dataSources.add(Cesium.CzmlDataSource.load("\\CZML\\XSH2.json"));
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style>
</style>
-