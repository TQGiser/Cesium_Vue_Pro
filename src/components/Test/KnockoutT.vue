<template>
  <div id="map"></div>
  <input ref='slider' type="range" min="0" max="100000" step="100" v-model="length" data-bind="value: length, valueUpdate: 'input'">
  <input type="text" size="5" v-model="length">

  <!-- <el-slider ref="slider" v-model="length" :min="2000000" :max="20000000" :step="1000" /> -->
  <!-- <el-slider ref='slider' v-model="height" :min="2000000" :max="20000000" /> -->
  <!-- <div class="value" data-bind="html: gamma"></div> -->
  <!-- <div class="slider-demo-block" id="slider1">
      <span class="demonstration">洪水淹没高度</span>
      <el-slider id="slider" v-model="length" :min="2000000" :max="20000000" />
    </div> -->
</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      viewer: null,
      slider: null,
      length:null,
    });
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjczNDgzMy1hYzE1LTRjNWYtODZhMS01MjZkNWRiMDc2MmUiLCJpZCI6ODIxMzAsImlhdCI6MTY0NDU0ODc0M30.LpGXXWsbQXucV5MTeC2g8BCAQWiZp612gosWcK-7ocE";
    onMounted(() => {
      state.viewer = new Cesium.Viewer("map", {
        timeline: false,
        vrButton: false,
        animation: false,
      })

      let cylinder = state.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-100, 60, 0),
        cylinder: {
          length: 2000000,
          topRadius: 100000.0,
          bottomRadius: 100000.0,
          material: Cesium.Color.AQUA,
        },
      })
      const viewModel = {
        length: 0
      }
      Cesium.knockout.track(viewModel);
      const slider = state.slider
      Cesium.knockout.applyBindings(viewModel, slider)
      Cesium.knockout
        .getObservable(viewModel, "length")
        .subscribe(function (height) {
            cylinder.cylinder.length = Number(height)
            // console.log(state.viewer.scene.primitives.length);
            for(let i = 0;i < state.viewer.scene.primitives.length;i++){
              state.viewer.scene.primitives.get(i).show=false
            }
            state.viewer.scene.primitives.add(
                    new Cesium.Primitive({
                        geometryInstances: new Cesium.GeometryInstance({
                            geometry: new Cesium.PolygonGeometry({
                                polygonHierarchy: new Cesium.PolygonHierarchy(
                                    Cesium.Cartesian3.fromDegreesArray([-100,60,-102,60,102,50,100,50])
                                ),
                                height: height,
                                //   perPositionHeight:true,
                                // extrudedHeight: 4090,
                            }),
                        }),
                        appearance: new Cesium.EllipsoidSurfaceAppearance({
                            material: new Cesium.Material({
                                fabric: {
                                    type: "Water",
                                    uniforms: {
                                        baseWaterColor: new Cesium.Color(
                                            115 / 255.0,
                                            178 / 255.0,
                                            255 / 255.0,
                                            0.5
                                        ),
                                        normalMap: "\\水体\\waterNormals.jpg",
                                        frequency: 1000.0,
                                        animationSpeed: 0.001,
                                        amplitude: 10,
                                        specularIntensity: 2,
                                    },
                                },
                            }),
                        }),
                        id:"hsm"
                    })
                );
        });

    });



    // changeHeight();

    // function changeHeight() {
    //   Cesium.knockout.getObservable(viewModel, heigtht).subscribe(function (value1) {
    //     viewModel[height] = value1
    //   })
    // };
    return {
      // monitor,
      ...toRefs(state),
    };
  }

}
</script>
<style>
#slider1 {
  width: 50%;
}
</style>
  -