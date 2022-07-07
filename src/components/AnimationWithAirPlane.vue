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
    });
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjczNDgzMy1hYzE1LTRjNWYtODZhMS01MjZkNWRiMDc2MmUiLCJpZCI6ODIxMzAsImlhdCI6MTY0NDU0ODc0M30.LpGXXWsbQXucV5MTeC2g8BCAQWiZp612gosWcK-7ocE";
    onMounted(() => {
      state.viewer = new Cesium.Viewer("map", {
        // timeline: false,
        // vrButton: false,
        // animation: false,
        terrainProvider: Cesium.createWorldTerrain({
          requestWaterMask: true,
          requestVertexNormals: true,
        }),
      });
      var JSONLength;
      const positionProperty = new Cesium.SampledPositionProperty();
      const promise = Cesium.GeoJsonDataSource.load("仁达沟三维公里桩.json");
      promise.then(function (dataSource) {
        const entitys = dataSource.entities.values;
        JSONLength = dataSource.entities.values.length;
        for (let i = 0; i < entitys.length; i++) {
          const entity = dataSource.entities.values[i];
          const zb_c3 =
            state.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              entity.position._value
            );
          const zb_n = Cesium.Math.toDegrees(zb_c3.latitude);
          const zb_e = Cesium.Math.toDegrees(zb_c3.longitude);
          const zb_h = Number(zb_c3.height);
          const zb_h2 = Number(zb_c3.height)+100 /*提高点高度100米 */
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
          console.log(zb_e, zb_n, zb_h)
          const time = Cesium.JulianDate.addSeconds(
            start,
            i * timeStepInSeconds,
            new Cesium.JulianDate()
          );
          const position = Cesium.Cartesian3.fromDegrees(zb_e, zb_n, zb_h2);
          positionProperty.addSample(time, position);
        }
      });



      const timeStepInSeconds = 60;
      const start = Cesium.JulianDate.fromDate(new Date(2021, 6, 27, 16));
      const stop = Cesium.JulianDate.addSeconds(
        start,
        3600,
        new Cesium.JulianDate()
      );
      state.viewer.clock.startTime = start.clone();
      state.viewer.clock.stopTime = stop.clone();
      state.viewer.clock.currentTime = start.clone();
      state.viewer.timeline.zoomTo(start, stop);
      state.viewer.clock.multiplier = 0.5;
      state.viewer.clock.shouldAnimate = true;
      state.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
      const airplaneEntity = state.viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({ start: start, stop: stop }),
        ]),
        position: positionProperty,
        model: { 
          // uri: 'three官网glb模型\\Stork.glb',
          uri: 'wrj2.glb',
          minimumPixelSize: 3
           },
        orientation: new Cesium.VelocityOrientationProperty(positionProperty),    

        path: new Cesium.PathGraphics({ width: 2 }),
      });
      // console.log(airplaneEntity);
      // Make the camera track this moving entity.
      state.viewer.trackedEntity = airplaneEntity;
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style>
</style>
