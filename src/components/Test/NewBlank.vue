<template>
    <div id="map">
        <el-tag size="large" effect="dark">经度：{{ jd }}</el-tag>
        <el-tag size="large" effect="dark">纬度：{{ wd }}</el-tag>
        <el-tag size="large" effect="dark">大地高：{{ ddg }}</el-tag>
        <el-tag size="large" effect="dark">视角高：{{ sjg }}</el-tag>
    </div>
</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive } from "vue";
import { ElButton } from 'element-plus'

export default {
    setup() {
        const state = reactive({
            viewer: null,
            msg: null,
            jd: null,
            wd: null,
            sjg: null,
            ddg: null
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
                // terrainProvider: new Cesium.CesiumTerrainProvider({
                //     url: "http://localhost:8083/terrain/甘孜地形切片/巴塘县",
                //     minimumLevel: 0,
                //     maximumLevel: 15,
                // }),
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
            /*鼠标移动事件显示&camera.pickEllipsoid坐标及高程，平面时使用 */
            // var handler = new Cesium.ScreenSpaceEventHandler(state.viewer.scene.canvas);
            // handler.setInputAction(function (movement) {
            //     const cartesian = state.viewer.camera.pickEllipsoid(
            //         movement.endPosition,
            //         state.viewer.scene.globe.ellipsoid
            //     );
            //     const cartographic = Cesium.Cartographic.fromCartesian(
            //         cartesian
            //     );
            //     const longitudeString = Cesium.Math.toDegrees(
            //         cartographic.longitude
            //     ).toFixed(8);
            //     const latitudeString = Cesium.Math.toDegrees(
            //         cartographic.latitude
            //     ).toFixed(8);
            //     state.sjg = (state.viewer.camera.positionCartographic.height).toFixed(0)
            //     state.jd = longitudeString
            //     state.wd = latitudeString
            //     /*视角问题会导致大地高不准，除非一直是俯视
            //       用查询点位方式表达点位大地高*/
            //     // state.ddg = state.viewer.scene.globe.getHeight(cartographic).toFixed(2)
            // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

            var handler = new Cesium.ScreenSpaceEventHandler(state.viewer.scene.canvas);
            handler.setInputAction(function (event) {
                const earthPosition = state.viewer.scene.pickPosition(event.position);
                // console.log(Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(earthPosition).longitude))
                const jd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(earthPosition).longitude).toFixed(8);
                const wd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(earthPosition).latitude).toFixed(8);
                const height = Cesium.Cartographic.fromCartesian(earthPosition).height.toFixed(2);
                state.ddg = height
                state.sjg = (state.viewer.camera.positionCartographic.height).toFixed(0)
                state.jd = jd
                state.wd = wd
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        });
        return {
            ...toRefs(state),
        };
    },
};
</script>
<style>
</style>
