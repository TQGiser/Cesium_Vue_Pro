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
      const promise = Cesium.GeoJsonDataSource.load("丁曲二维中线点.json");
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
          state.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(zb_e, zb_n),
            point: {
              pixelSize: 5,
              color: Cesium.Color.RED,
              outlineColor: Cesium.Color.BLUE,
              outlineWidth: 1,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
          });
          console.log(zb_e,zb_n)
        }
      });
      state.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          101.007,
          30.201,
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
