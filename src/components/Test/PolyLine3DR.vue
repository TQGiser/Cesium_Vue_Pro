<template>
  <div id="map">
  </div>
</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive, ref } from "vue";
export default {
  setup() {
    const state = reactive({
      viewer: null,
    });
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjczNDgzMy1hYzE1LTRjNWYtODZhMS01MjZkNWRiMDc2MmUiLCJpZCI6ODIxMzAsImlhdCI6MTY0NDU0ODc0M30.LpGXXWsbQXucV5MTeC2g8BCAQWiZp612gosWcK-7ocE";
    onMounted(() => {
        state.viewer = new Cesium.Viewer("map", {
          timeline: false,
          vrButton: false,
          animation: false,
          terrainProvider: new Cesium.CesiumTerrainProvider({
            url: "http://192.168.0.211:8083/terrain/甘孜地形切片/巴塘县",
            minimumLevel: 0,
            maximumLevel: 15,
          }),
        });

        state.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(100.05147,32.251133,4400),
        orientation: {
          heading: Cesium.Math.toRadians(2.0),
          pitch: Cesium.Math.toRadians(-20.0),
        },
      });

      /*加载hyda，生成湖面 */
      const b = new Array();
      const promise3 = Cesium.GeoJsonDataSource.load("\\鲜水河\\hyda.json");
      promise3.then(function (dataSource) {
        // state.viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        // const color = Cesium.Color.GREEN.withAlpha(0.1);
        // entities[0].polygon.material = color;
        const len = entities[0].polygon.hierarchy._value.positions.length;
        for (let i = 0; i < len; i++) {
          const zb_c3 =
            state.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              entities[0].polygon.hierarchy._value.positions[i]
            );
          const zb_n = Cesium.Math.toDegrees(zb_c3.latitude);
          const zb_e = Cesium.Math.toDegrees(zb_c3.longitude);
          b.push(Number(zb_e));
          b.push(Number(zb_n));
        }
        state.viewer.entities.add({
            polygon:{
                hierarchy: new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray(b)
                ),
               classificationType: Cesium.ClassificationType.TERRAIN,
               material : new Cesium.Color.fromBytes(0,191,255,100)
            }
        })
      });
    })

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style>
</style>
