<template>
    <div id="map"> </div>
    <el-button type="warning" plain @click="drawRange">划定范围</el-button>
    <input ref='slider' type="range" min="2000" max="5000" step="1" v-model="length"
        data-bind="value: length, valueUpdate: 'input'">
    <input type="text" size="5" v-model="length">
    <el-button type="warning" plain @click="cleanRange">清除洪水面</el-button>

</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive, ref } from "vue";

export default {
    setup() {
        const state = reactive({
            viewer: null,
            slider: null,
            length: 2000,
            handler:null,
            cn:null,
        });
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmM2RjZjY4MC04NmI3LTQwY2YtOTgwMi1iMjM2ZDA1OTQ5ZTQiLCJpZCI6ODIxMzAsImlhdCI6MTY2NjkxOTY4NX0.kiq34pQuaRwXQwJb5rpi23zNt_ZjE1I745dIgO4-CeM";
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

        let cn = new Array();
        

        

        /*设置默认洪水面高度*/
        const num = ref(2000);
        
        /*画洪水面函数*/
        const drawRange = () => {
            state.viewer.scene.primitives.removeAll()

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
            function drawPlant(cnArray, plantHeight) {
                let plant;
                plant = state.viewer.scene.primitives.add(
                    new Cesium.Primitive({
                        geometryInstances: new Cesium.GeometryInstance({
                            geometry: new Cesium.PolygonGeometry({
                                polygonHierarchy: new Cesium.PolygonHierarchy(
                                    Cesium.Cartesian3.fromDegreesArray(cnArray)
                                ),
                                height: plantHeight,
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
                        name:'洪水淹没面'
                    })
                );
                return plant;
            }
            let activeShapePoints = [];
            let activeShape;
            let floatingPoint;
            // let d = new Array();
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
                cn.push(Number(zb_n));
                cn.push(Number(zb_e));

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
                const plant = drawPlant(cn, num.value);
                if(state.viewer.scene.primitives.length==2){
                    const viewModel = {
                    length: 0
                };
                Cesium.knockout.track(viewModel);
                const slider = state.slider;
                Cesium.knockout.applyBindings(viewModel, slider);
                Cesium.knockout
                    .getObservable(viewModel, "length")
                    .subscribe(function (height) {
                        for (let i = 0; i < state.viewer.scene.primitives.length; i++) {
                            state.viewer.scene.primitives.get(i).show = false
                        }
                        state.viewer.scene.primitives.add(
                            new Cesium.Primitive({
                                geometryInstances: new Cesium.GeometryInstance({
                                    geometry: new Cesium.PolygonGeometry({
                                        polygonHierarchy: new Cesium.PolygonHierarchy(
                                            Cesium.Cartesian3.fromDegreesArray(cn)
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
                            })
                        );
                    });
                
                }     
                activeShapePoints.pop();
                floatingPoint = undefined;
                activeShape = undefined;
                activeShapePoints = [];
            }
            state.handler.setInputAction(function (event) {
                terminateShape();
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        };
        const cleanRange = () => {
            state.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
            state.viewer.scene.primitives.removeAll()
            cn = []
        }
        return {
            num,
            drawRange,
            cleanRange,
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


