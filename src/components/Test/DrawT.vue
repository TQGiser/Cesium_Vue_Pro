<template>
    <div id="map">
        <el-button type="warning" plain @click="drawRange">划定范围</el-button>
        <el-input-number v-model="num" :step='100' />
        <input ref='slider' type="range" min="20000" max="20000000" step="100" data-bind="value: length, valueUpdate: 'input'">

        <!-- <input ref='slider' type="range" min="2000" max="4500" step="10"
            data-bind="value: height, valueUpdate: 'input'"> -->
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
            scene: null,
            msg: null,
            slider:null,
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
            // const viewModel = {
            //     length: 2000
            // }
            // Cesium.knockout.track(viewModel);
            // const slider = state.slider
            // Cesium.knockout.applyBindings(viewModel, slider)
            // Cesium.knockout
            //     .getObservable(viewModel, "length")
            //     .subscribe(function (height) {
            //         cylinder.cylinder.length = Number(height)
            //     });



        }

        );
        const value1 = ref(2900)
        const num = ref(2900);
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
            function drawPlant(cnArray, plantheigth) {
                let plant;
                plant = state.viewer.scene.primitives.add(
                    new Cesium.Primitive({
                        geometryInstances: new Cesium.GeometryInstance({
                            geometry: new Cesium.PolygonGeometry({
                                polygonHierarchy: new Cesium.PolygonHierarchy(
                                    Cesium.Cartesian3.fromDegreesArray(cnArray)
                                ),
                                height: plantheigth,
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
                return plant;
            }
            let activeShapePoints = [];
            let activeShape;
            let floatingPoint;
            let d = new Array();
            // let plantheigt;
            const handler = new Cesium.ScreenSpaceEventHandler(state.viewer.canvas);
            handler.setInputAction(function (event) {

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

            handler.setInputAction(function (event) {
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
                const plant = drawPlant(d, num.value);
                console.log(d)
                activeShapePoints.pop();
                // drawShape(activeShapePoints);
                state.viewer.entities.remove(floatingPoint);
                state.viewer.entities.remove(activeShape);
                floatingPoint = undefined;
                activeShape = undefined;
                activeShapePoints = [];
                d = [];
            }
            handler.setInputAction(function (event) {
                terminateShape();
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        };
        
        return {
            num,
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


