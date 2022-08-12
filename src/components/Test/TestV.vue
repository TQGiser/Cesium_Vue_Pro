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
        // terrainProvider: Cesium.createWorldTerrain({
        //   requestWaterMask: true,
        //   requestVertexNormals: true,
        // }),
      });
//       var controls = []
//       controls.push(Cesium.Cartesian3.fromDegrees(-100.11551237582385,25.97934910503657))  
//       controls.push(Cesium.Cartesian3.fromDegrees(-101.1367529, 25.9629172))
//       controls.push(Cesium.Cartesian3.fromDegrees(-102.1367529, 26.9629172))   
//       controls.push(Cesium.Cartesian3.fromDegrees(-103.8632471,26.9629172))
//       controls.push(Cesium.Cartesian3.fromDegrees(-104.1367529, 25.9629172))
      
//       for (var i = 0; i < controls.length; i++) {
//        state.viewer.entities.add({
//           position: controls[i],
//           point: {
//             color: Cesium.Color.RED,
//             pixelSize: 10,
//           },
//         });}
  
// // CatmullRomSpline
//      var spline = new Cesium.CatmullRomSpline({
//         points: controls,
//         times: [0.0, 0.25, 0.5, 0.75, 1],
//       });
 
//       var positions = [];
//       for (var i = 0; i <= 50; i++) {
//         var cartesian3 = spline.evaluate(i / 50);
//         positions.push(cartesian3);
//         state.viewer.entities.add({
//           position: cartesian3,
//           point: {
//             color: Cesium.Color.BLUE,
//             pixelSize: 6,
//           },
//         });
//       }
 
//       state.viewer.entities.add({
//         name: "CatmullRomSpline",
//         polyline: {
//           positions: positions,
//           width: 3,
//           material: Cesium.Color.WHITE,
//         },
//       });

// // HermiteSpline
//       var spline = Cesium.HermiteSpline.createNaturalCubic({
//         times: [0.0, 0.25, 0.5, 0.75, 1],
//         points: controls,
//       });
 
//       var positions = [];
//       for (var i = 0; i <= 50; i++) {
//         var cartesian3 = spline.evaluate(i / 50);
//         positions.push(cartesian3);
//         state.viewer.entities.add({
//           position: cartesian3,
//           point: {
//             color: Cesium.Color.WHITE,
//             pixelSize: 6,
//           },
//         });
//       }
 
//       state.viewer.entities.add({
//         name: "HermiteSpline",
//         polyline: {
//           positions: positions,
//           width: 3,
//           material: Cesium.Color.RED,
//         },
//       });

      state.viewer.entities.add({
        name:"testLine",
        polyline:{
          positions:new Cesium.Cartesian3.fromDegreesArray(
            [
              -135,25,-60,25
            ]
          ),
           clampToGround: true,
              width: 20,
              material: new Cesium.PolylineGlowMaterialProperty({
                color: Cesium.Color.DODGERBLUE,
                glowPower: 0.25,
                // taperPower:0.5                      /扩散渲染
              }),
        }
      })
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