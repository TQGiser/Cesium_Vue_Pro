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
        terrainProvider: Cesium.createWorldTerrain({
          requestWaterMask: true,
          requestVertexNormals: true,
        }),
      });
      const promise = Cesium.GeoJsonDataSource.load("丁曲三维公里桩.json");
      promise.then(function (dataSource) {
        const entitys = dataSource.entities.values;
        for (let i = 0; i < entitys.length; i++) {
          const entity = dataSource.entities.values[i];
          const zb_c3 =
            state.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              entity.position._value
            );
          const zb_n = Cesium.Math.toDegrees(zb_c3.latitude);
          const zb_e = Cesium.Math.toDegrees(zb_c3.longitude);
          const zb_h = Number(zb_c3.height) + 100.0;                        /*提高点高度100米 */
          state.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(zb_e, zb_n, zb_h),
            point: {
              pixelSize: 10,
              color: Cesium.Color.RED,
              outlineColor: Cesium.Color.BLUE,
              outlineWidth: 2,
              // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,   /*贴地选项*/
            },
          });
        }
      });
      state.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          98.863125489952,
          31.40380633928,
          4700
        ),
        orientation: {
          heading: Cesium.Math.toRadians(2.0),
          pitch: Cesium.Math.toRadians(-80.0),
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
