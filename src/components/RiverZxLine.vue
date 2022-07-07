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
      const b = new Array();
      const promise = Cesium.GeoJsonDataSource.load("\\丁曲\\丁曲中线.json");
      promise.then(function (dataSource) {
        const entitys = dataSource.entities.values;
        for (let i = 0; i < entitys.length; i++) {
          const entity = dataSource.entities.values[i];
          console.log(entity);
          const zb_c3 =
            state.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              entity.position._valueW
            );
          const zb_e = Cesium.Math.toDegrees(zb_c3.latitude);
          const zb_n = Cesium.Math.toDegrees(zb_c3.longitude);
          b.push(Number(zb_n));
          b.push(Number(zb_e));
        }
        state.viewer.entities.add({
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(b),
            clampToGround: true,
            width: 5,

            material: new Cesium.PolylineOutlineMaterialProperty({
              color: Cesium.Color.ORANGE,
              outlineWidth: 2,
              outlineColor: Cesium.Color.BLACK,
            }),
          },
        });

        console.log(b);
      });

    // const promise =  Cesium.GeoJsonDataSource.load("\\鲜水河\\dmal0.json");
    // promise.then(function (dataSource) {
    //   state.viewer.dataSources.add(dataSource)
    // })
    // console.log(state.viewer)

    state.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        98.86342,
        31.37668,
        4700),
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
