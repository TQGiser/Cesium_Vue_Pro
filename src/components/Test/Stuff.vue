<template>
  <div ref="test" id="map"></div>
</template>
  <script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive, ref } from "vue";
export default {
  setup() {
    const state = reactive({
      viewer: null,
      test:null
    });
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjczNDgzMy1hYzE1LTRjNWYtODZhMS01MjZkNWRiMDc2MmUiLCJpZCI6ODIxMzAsImlhdCI6MTY0NDU0ODc0M30.LpGXXWsbQXucV5MTeC2g8BCAQWiZp612gosWcK-7ocE";
    onMounted(() => {
      state.viewer = new Cesium.Viewer("map", {
        timeline: false,
        vrButton: false,
        animation: false,
      });

      state.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-100, 60, 0),
        cylinder: {
          length: 2000000,
          topRadius: 100000.0,
          bottomRadius: 100000.0,
          material: Cesium.Color.AQUA,
        },
      });
      const t = state.test
      console.log(t)
    });

    // Cesium.knockout.applyBindings(viewModel, slider)
    // changeHeight();

    // function changeHeight() {
    //   Cesium.knockout.getObservable(viewModel, heigtht).subscribe(function (value1) {
    //     viewModel[height] = value1
    //   })
    // };
    return {
      ...toRefs(state),
    };
  },
};
</script>
  <style>
#slider1 {
  width: 50%;
}
</style>
    -