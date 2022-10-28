<template>
    <div id="map"> </div>
    <el-button type="warning" plain @click="drawRange">划定范围</el-button>
    <el-button type="warning" plain @click="cleanRange">清除洪水面</el-button>
</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive,ref } from "vue";

export default {
    setup() {
        let state = reactive({
            viewer: null,
            handler:null
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

            state.viewer.camera.flyTo({
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

            state.handler = new Cesium.ScreenSpaceEventHandler(state.viewer.scene.canvas);
        });


        const drawRange = () => {
            state.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
            );
            function createPoint(worldPosition) {
                const point = state.viewer.entities.add({
                    position: worldPosition,
                    point: {
                        color: Cesium.Color.WHITE,
                        pixelSize: 5,
                        heightReference: Cesium.HeightReference.NONE,
                    },
                    name:"洪水淹没面"
                });
                return point;
            }
            function drawShape(positionData) {
                let shape;
                shape = state.viewer.entities.add({
                    polygon: {
                        hierarchy: positionData,
                        material: new Cesium.ColorMaterialProperty(
                            Cesium.Color.WHITE.withAlpha(0.7)
                        ),
                        
                    },
                    
                });
                return shape;
            }
            let activeShapePoints = [];
            let activeShape;
            let floatingPoint;
            let d = new Array();
            // let plantheigt;
            // let handler = new Cesium.ScreenSpaceEventHandler(state.viewer.canvas);
            state.handler.setInputAction(function (event) {

                // We use `viewer.scene.pickPosition` here instead of `viewer.camera.pickEllipsoid` so that
                // we get the correct point when mousing over terrain.
                const earthPosition = state.viewer.scene.pickPosition(event.position);
                const zb_n = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).longitude
                );
                const zb_e = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).latitude
                );
                // plantheigt =
                //     Cesium.Cartographic.fromCartesian(earthPosition).height
                d.push(Number(zb_n));
                d.push(Number(zb_e));

                // `earthPosition` will be undefined if our mouse is not over the globe.
                if (Cesium.defined(earthPosition)) {
                    if (activeShapePoints.length === 0) {
                        floatingPoint = createPoint(earthPosition);
                        activeShapePoints.push(earthPosition);
                        const dynamicPositions = new Cesium.CallbackProperty(function () {
                            return new Cesium.PolygonHierarchy(activeShapePoints);
                        }, false);
                        activeShape = drawShape(dynamicPositions);
                    }
                    activeShapePoints.push(earthPosition);
                    createPoint(earthPosition);
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            state.handler.setInputAction(function (event) {
                if (Cesium.defined(floatingPoint)) {
                    const newPosition = state.viewer.scene.pickPosition(event.endPosition);
                    if (Cesium.defined(newPosition)) {
                        floatingPoint.position.setValue(newPosition);
                        activeShapePoints.pop();
                        activeShapePoints.push(newPosition);
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            // Redraw the shape so it's not dynamic and remove the dynamic shape.
            function terminateShape() {
                
                // activeShapePoints.pop();
                floatingPoint = undefined;
                activeShape = undefined;
                // activeShapePoints = [];
            }
            state.handler.setInputAction(function (event) {
                terminateShape();
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        };
        const cleanRange = () => {
            state.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
        }
        return {
            cleanRange,
            drawRange,
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


