<template>
        
    <div id="map">
        <input type="text" size="5" v-model="e">
        <input type="text" size="5" v-model="n">
        <el-button type="warning" plain @click="viewTO">至</el-button>
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
            e:null,
            n:null
        });
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjczNDgzMy1hYzE1LTRjNWYtODZhMS01MjZkNWRiMDc2MmUiLCJpZCI6ODIxMzAsImlhdCI6MTY0NDU0ODc0M30.LpGXXWsbQXucV5MTeC2g8BCAQWiZp612gosWcK-7ocE";
        onMounted(() => {
            /*选择列表*/
            state.viewer = new Cesium.Viewer("map", {
                timeline: false,
                vrButton: false,
                animation: true,
                shouldAnimate: true,
                terrainProvider: new Cesium.CesiumTerrainProvider({
                    url: "http://192.168.0.211:8083/terrain/甘孜地形切片/鲜水河",
                    minimumLevel: 0,
                    maximumLevel: 15,
                }),
            });

            state.viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(
                    101.02082271,
                    30.73508266,
                    6400
                ),
                orientation: {
                    heading: Cesium.Math.toRadians(2.0),
                    pitch: Cesium.Math.toRadians(-70.0),
                },
            });

        });

        const viewTO = ()=>{
            console.log(state.e,state.n)
            state.viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(
                    Number(state.e),
                    Number(state.n),
                    6400
                ),
                orientation: {
                    heading: Cesium.Math.toRadians(2.0),
                    pitch: Cesium.Math.toRadians(-70.0),
                },
            });
            
        }
        return {
            viewTO,
            ...toRefs(state),
        };
    },
};
</script>
<style>
#el {
    width: 100px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 20px;
    top: 10px;
    z-index: 100;
    padding-left: 10px;
}

</style>


