<template>
    <div id="map">
        <el-button type="warning" plain @click="test">划定范围</el-button>
        <input id='slider1' ref='slider' type="range" min="4000" max="8848" step="1" v-model="elev"
            data-bind="value: elev, valueUpdate: 'input'">
        <input type="text" size="5" v-model="elev">
    </div>

</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive, ref } from "vue";
import { UPDATE_MODEL_EVENT } from 'element-plus';

export default {
    setup() {
        const state = reactive({
            viewer: null,
            slider: null,
            elev: null,
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
            state.viewer.camera.setView({
                destination: new Cesium.Cartesian3(
                    290637.5534733206,
                    5637471.593707632,
                    2978256.8126927214
                ),
                orientation: {
                    heading: 4.747266966349747,
                    pitch: -0.2206998858596192,
                    roll: 6.280340554587955,
                },
            });

        })
        state.elev = 7000;

        const test = () => {
            
            const band1Position = Number(state.elev);
            const bandThickness = 10.0;
            const bandTransparency = 1.0;
            const antialias = Math.min(10.0, bandThickness * 0.1);
            const layers = [];
            const band1 = {
                entries: [
                    {
                        height: band1Position - bandThickness * 0.5 - antialias,
                        color: new Cesium.Color(0.0, 0.0, 1.0, 0.0),
                    },
                    {
                        height: band1Position - bandThickness * 0.5,
                        color: new Cesium.Color(0.0, 0.0, 1.0, bandTransparency),
                    },
                    {
                        height: band1Position + bandThickness * 0.5,
                        color: new Cesium.Color(0.0, 0.0, 1.0, bandTransparency),
                    },
                    {
                        height: band1Position + bandThickness * 0.5 + antialias,
                        color: new Cesium.Color(0.0, 0.0, 1.0, 0.0),
                    },
                ],
            };
            layers.push(band1);
            const material = Cesium.createElevationBandMaterial({
                scene: state.viewer.scene,
                layers: layers,
            });
            state.viewer.scene.globe.material = material;
        }
        return {
            test,
            ...toRefs(state),
        };
    },
};
</script>
<style>
#slider1 {
    width: 600px;
}
</style>


