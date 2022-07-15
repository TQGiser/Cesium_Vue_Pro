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
                // terrainProvider: Cesium.createWorldTerrain({
                //     requestWaterMask: true,
                //     requestVertexNormals: true,
                // }),
                terrainProvider: new Cesium.CesiumTerrainProvider({
                    url: "http://localhost:8083/terrain/甘孜地形切片/巴塘县",
                    minimumLevel: 0,
                    maximumLevel: 15,
                }),
            });
            state.viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(
                    99.54714582,
                    30.48131388,
                    4700
                ),
                orientation: {
                    heading: Cesium.Math.toRadians(2.0),
                    pitch: Cesium.Math.toRadians(-20.0),
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
