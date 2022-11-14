<template>
    <el-button type="success" plain @click="drawRange">test</el-button>
    <div id="map"></div>

</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive, ref } from "vue";

export default {
    setup() {
        const state = reactive({
            viewer: null,
            dmxList: [],
            handler: null,
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
            state.handler = new Cesium.ScreenSpaceEventHandler(state.viewer.scene.canvas);

        });

        /*设置默认洪水面高度*/
        const num = ref(2000);
        /*画洪水面函数*/
        const drawRange = () => {
            // state.viewer.scene.primitives.removeAll()
            function createPoint(worldPosition) {
                const point = state.viewer.entities.add({
                    position: worldPosition,
                    point: {
                        color: Cesium.Color.WHITE,
                        pixelSize: 5,
                        heightReference: Cesium.HeightReference.NONE,
                    },
                    name: "洪水淹没面"
                });
                return point;

            }
            function drawShape(positionData) {
                let shape;
                shape = state.viewer.entities.add({
                    polyline: {
                        positions: positionData,
                        clampToGround: true,
                        width: 3,
                    },
                    name: 'TestLine'
                });
                state.dmxList.push(shape.id)

                return shape;
            }

            function terminateShape() {
                activeShapePoints.pop();
                drawShape(activeShapePoints);
                state.viewer.entities.remove(floatingPoint);
                state.viewer.entities.remove(activeShape);
                floatingPoint = undefined;
                activeShape = undefined;
                activeShapePoints = [];
            }

            let activeShapePoints = [];
            let activeShape;
            let floatingPoint;

            state.handler.setInputAction(function (event) {
                const earthPosition = state.viewer.scene.pickPosition(event.position);
                if (Cesium.defined(earthPosition)) {
                    if (activeShapePoints.length === 0) {
                        floatingPoint = createPoint(earthPosition);
                        activeShapePoints.push(earthPosition);
                        const dynamicPositions = new Cesium.CallbackProperty(function () {
                            return activeShapePoints;
                        }, false);
                        activeShape = drawShape(dynamicPositions);
                    }
                    activeShapePoints.push(earthPosition);
                    createPoint(earthPosition);
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

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

            state.handler.setInputAction(function (event) {
                terminateShape();
                const a = Number(state.dmxList.length) - 1
                const pl = state.viewer.entities.getById(state.dmxList[a]).polyline
                const pl_sp = pl.positions._value[0]
                const pl_ep = pl.positions._value[1]
                // const pl_dis = Cesium.Cartesian3.distance(pl_sp,pl_ep)
                // const pl_sp_height = Cesium.Cartographic.fromCartesian(pl.positions._value[0]).height
                // const pl_ep_height = Cesium.Cartographic.fromCartesian(pl.positions._value[1]).height
                // const pl_height = Math.abs( pl_sp_height- pl_ep_height);
                // const ang2 = Math.asin(pl_height/pl_dis)*180/3.1415926
                // console.log(pl_dis,pl_height,pl_sp.z,pl_ep.z,ang2)
                const count = 50;
                const cartesians = new Array(count);
                for (let i = 0; i < count; ++i) {
                    const offset = i / (count - 1);
                    cartesians[i] = Cesium.Cartesian3.lerp(
                        pl_sp,
                        pl_ep,
                        offset,
                        new Cesium.Cartesian3()
                    );
                }
                state.viewer.scene
                    .clampToHeightMostDetailed(cartesians)
                    .then(function (clampedCartesians) {
                        // for (let i = 0; i < count; ++i) {
                        //     state.viewer.entities.add({
                        //         position: clampedCartesians[i],
                        //         ellipsoid: {
                        //             radii: new Cesium.Cartesian3(0.2, 0.2, 0.2),
                        //             material: Cesium.Color.RED,
                        //         },
                        //     });
                        // }
                        for (let j = 0; j < count - 1; j++) {
                            const sp = clampedCartesians[j]
                            const ep = clampedCartesians[j + 1]
                            const pl_dis = Cesium.Cartesian3.distance(sp, ep)
                            const pl_sp_height = Cesium.Cartographic.fromCartesian(sp).height
                            const pl_ep_height = Cesium.Cartographic.fromCartesian(ep).height
                            const pl_height = Math.abs(pl_sp_height - pl_ep_height);
                            const ang2 = Math.asin(pl_height / pl_dis) * 180 / 3.1415926
                            // console.log(pl_dis, ang2)
                            if (ang2 < 15) {
                                state.viewer.entities.add({
                                    polyline: {
                                        positions:[clampedCartesians[j],clampedCartesians[j+1]],
                                        arcType: Cesium.ArcType.NONE,
                                        width: 2,
                                        material: new Cesium.PolylineOutlineMaterialProperty({
                                            color: Cesium.Color.WHITE,
                                        }),
                                        depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty(
                                            {
                                                color: Cesium.Color.WHITE,
                                            }
                                        ),
                                    },
                                });
                            } else if (ang2 < 30) {
                                state.viewer.entities.add({
                                    polyline: {
                                        positions:[clampedCartesians[j],clampedCartesians[j+1]],
                                        arcType: Cesium.ArcType.NONE,
                                        width: 2,
                                        material: new Cesium.PolylineOutlineMaterialProperty({
                                            color: Cesium.Color.GREEN,
                                        }),
                                        depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty(
                                            {
                                                color: Cesium.Color.GREEN,
                                            }
                                        ),
                                    },
                                });
                            }else if (ang2 < 45) {
                                state.viewer.entities.add({
                                    polyline: {
                                        positions:[clampedCartesians[j],clampedCartesians[j+1]],
                                        arcType: Cesium.ArcType.NONE,
                                        width: 2,
                                        material: new Cesium.PolylineOutlineMaterialProperty({
                                            color: Cesium.Color.BLUE,
                                        }),
                                        depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty(
                                            {
                                                color: Cesium.Color.BLUE,
                                            }
                                        ),
                                    },
                                });
                            }else{
                                state.viewer.entities.add({
                                    polyline: {
                                        positions:[clampedCartesians[j],clampedCartesians[j+1]],
                                        arcType: Cesium.ArcType.NONE,
                                        width: 2,
                                        material: new Cesium.PolylineOutlineMaterialProperty({
                                            color: Cesium.Color.RED,
                                        }),
                                        depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty(
                                            {
                                                color: Cesium.Color.RED,
                                            }
                                        ),
                                    },
                                });
                            }
                        }

                        // state.viewer.entities.add({
                        //     polyline: {
                        //         positions: clampedCartesians,
                        //         arcType: Cesium.ArcType.NONE,
                        //         width: 2,
                        //         material: new Cesium.PolylineOutlineMaterialProperty({
                        //             color: Cesium.Color.YELLOW,
                        //         }),
                        //         depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty(
                        //             {
                        //                 color: Cesium.Color.YELLOW,
                        //             }
                        //         ),
                        //     },
                        // });
                    });
                pl.show = false
                state.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)



        };

        return {
            drawRange,
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


