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
        // homeButton: false,
        timeline: false,
        vrButton: false,
        animation: false,
        terrainProvider: Cesium.createWorldTerrain({
          requestWaterMask: true,
          requestVertexNormals: true,
        }),
      });
      // state.viewer.scene.primitives.add(Cesium.createOsmBuildings());
      // state.viewer.dataSources.add(
      //   Cesium.GeoJsonDataSource.load(
      //     "boua.geojson"
      //   )
      // )
      const promise = Cesium.GeoJsonDataSource.load("boua_elev.json");
      promise.then(function (dataSource) {
        state.viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        for (let i = 0; i < entities.length; i++) {
          const entity = dataSource.entities.values[i]
          const h_top =
            Number(entity.properties._EL.valueOf()) +
            100.0;
          // dataSource.entities.values[i].polygon.extrudedHeight = 100.0;
          const color = Cesium.Color.fromRandom({
            alpha: 0.4,
          });
          entity.polygon.material = color;
          entity.polygon.outline = false;
          entity.polygon.height = h_top,
          entity.polygon.extrudedHeight =h_top - 100.0,
          state.viewer.entities.add(
            {
              position: Cesium.Cartesian3.fromDegrees(
                entity.properties._E.valueOf(),                             /*经度*/
                entity.properties._N.valueOf(),                             /*纬度*/
                h_top + 100.0                                               /*大地高*/
              ),
              label: {
                text: entity.properties._河湖名称.valueOf(),              /*注记名称 */
                fillColor : Cesium.Color.GREEN,
                outlineColor : Cesium.Color.WHITE,
                outlineWidth : 5.0,
                showBackground :true,
                backgroundColor : Cesium.Color.DARKGREY,
                backgroundPadding : Cesium.Cartesian2(30, 30),
                style : Cesium.LabelStyle.FILL_AND_OUTLINE,
                // pixelOffset : Cesium.Cartesian2.ZERO,
                // eyeOffset : Cesium.Cartesian3.ZERO,
                // horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
                // verticalOrigin : Cesium.VerticalOrigin.BASELINE,
                // scale : 1.0,
              },
            }
          );
         
        }
        console.log( entities[177]);
      });
      // .catch(function (error) {
      //   window.alert(error);
      // });
      state.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          99.54914582,
          30.47131388,
          4700
        ),
        orientation: {
          heading: Cesium.Math.toRadians(2.0),
          pitch: Cesium.Math.toRadians(-10.0),
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
