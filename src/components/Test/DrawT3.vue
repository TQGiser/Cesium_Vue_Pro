<template>
    <div id="map">
        <el-tag size="large" effect="dark">经度：{{ jd }}</el-tag>
        <el-tag size="large" effect="dark">纬度：{{ wd }}</el-tag>
        <el-tag size="large" effect="dark">大地高：{{ ddg }}</el-tag>
        <el-tag size="large" effect="dark">视角高：{{ sjg }}</el-tag>
        <el-select v-model="value" class="m-2" placeholder="请选择地形显示行政区" @change="selectterrain" size="small">
            <el-option v-for="item in op" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="warning" plain @click="QueryPoint">查询高程点</el-button>
        <el-button type="warning" plain @click="cleanQueryPoint">清除查询点</el-button>
        <el-button type="warning" plain @click="viewWithAnimate">巡游</el-button>
        <el-button type="warning" plain @click="viewTopDown">俯视</el-button>
        <el-button type="warning" plain @click="drawRange">划定范围</el-button>
        <input id='slider1' ref='slider' type="range" min="2000" max="5000" step="1" v-model="elev"
            data-bind="value: elev, valueUpdate: 'input'">
        <input type="text" size="5" v-model="elev">
        <el-button type="warning" plain @click="cleanRange">清除洪水面</el-button>
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
            jd: null,
            wd: null,
            sjg: null,
            ddg: null,
            op: null,
            op2: null,
            value: null,
            slider: null,
            elev: 2000,
            cn: null,
            handler1: null,
            handler2: null,
            ko: null,
            ecList: [],
            hsmPList: []

        });
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjczNDgzMy1hYzE1LTRjNWYtODZhMS01MjZkNWRiMDc2MmUiLCJpZCI6ODIxMzAsImlhdCI6MTY0NDU0ODc0M30.LpGXXWsbQXucV5MTeC2g8BCAQWiZp612gosWcK-7ocE";
        onMounted(() => {
            /*选择列表*/
            state.op = [
                {
                    value: "康定市",
                    label: "康定市",
                },
                {
                    value: "泸定县",
                    label: "泸定县",
                },
                {
                    value: "丹巴县",
                    label: "丹巴县",
                },
                {
                    value: "九龙县",
                    label: "九龙县",
                },
                {
                    value: "雅江县",
                    label: "雅江县",
                },
                {
                    value: "道孚县",
                    label: "道孚县",
                },
                {
                    value: "炉霍县",
                    label: "炉霍县",
                },
                {
                    value: "甘孜县",
                    label: "甘孜县",
                },
                {
                    value: "新龙县",
                    label: "新龙县",
                },
                {
                    value: "德格县",
                    label: "德格县",
                },
                {
                    value: "白玉县",
                    label: "白玉县",
                },
                {
                    value: "石渠县",
                    label: "石渠县",
                },
                {
                    value: "色达县",
                    label: "色达县",
                },
                {
                    value: "理塘县",
                    label: "理塘县",
                },
                {
                    value: "巴塘县",
                    label: "巴塘县",
                },
                {
                    value: "乡城县",
                    label: "乡城县",
                },
                {
                    value: "稻城县",
                    label: "稻城县",
                },
                {
                    value: "得荣县",
                    label: "得荣县",
                },
                {
                    value: "鲜水河",
                    label: "鲜水河",
                },
            ]
            state.viewer = new Cesium.Viewer("map", {
                timeline: false,
                vrButton: false,
                animation: false,
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

            state.value = ref("")

            state.handler1 = new Cesium.ScreenSpaceEventHandler(state.viewer.scene.canvas);
            state.handler2 = new Cesium.ScreenSpaceEventHandler(state.viewer.scene.canvas);
            /*primivates增加要素的BUG，前置ecList不为空*/
            state.ecList.push('A')
        });

        /*俯视函数 */
        const viewTopDown = () => {
            state.viewer.trackedEntity = undefined;
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
        };

        /*动画视角函数 */
        const viewWithAnimate = () => {
            state.viewer.trackedEntity = entity_zx;
        };

        /*点击划洪水面时获取坐标列表*/
        let cn = new Array();

        /*设置默认洪水面高度*/
        const num = ref(2000);

        /*建立查询点id列表 */
        // let ecList = new Array();

        /*建立动画entity */
        var entity_zx;

        /*高程查询函数*/
        const QueryPoint = () => {
            state.handler1.setInputAction(function (movement) {
                state.sjg = state.viewer.camera.positionCartographic.height.toFixed(0);
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            state.handler1.setInputAction(function (event) {
                const earthPosition = state.viewer.scene.pickPosition(event.position);
                const jd = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).longitude
                ).toFixed(8);
                const wd = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).latitude
                ).toFixed(8);
                const height =
                    Cesium.Cartographic.fromCartesian(earthPosition).height.toFixed(2);

                const QueryPoint = state.viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(
                        Number(jd),
                        Number(wd),
                        Number(height) + 1.0
                    ),
                    point: {
                        color: Cesium.Color.SKYBLUE,
                        pixelSize: 3,
                        outlineColor: Cesium.Color.YELLOW,
                        outlineWidth: 1,
                    },
                });

                state.ecList.push(QueryPoint.id);
                const QueryLabel = state.viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(
                        Number(jd),
                        Number(wd),
                        Number(height) + 3.0
                    ),
                    label: {
                        text: "大地高:" + height + "米",
                        font: "4pt sans-serif",
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        fillColor: Cesium.Color.BLACK,
                        showBackground: true,
                        backgroundColor: new Cesium.Color(1, 1, 1, 0.7),
                        backgroundPadding: new Cesium.Cartesian2(8, 4),
                        disableDepthTestDistance: Number.POSITIVE_INFINITY, // draws the label in front of terrain
                    },
                });
                state.ecList.push(QueryLabel.id);
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        }

        /*清除事件函数*/
        const qcsj = () => {
            state.handler1.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
            state.handler1.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
            state.handler1.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
            state.handler2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
            state.handler2.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
            state.handler2.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        }
        /*清除高程查询*/
        const cleanQueryPoint = () => {
            qcsj();
            for (let i = 0; i < state.ecList.length; i++) {
                state.viewer.entities.removeById(state.ecList[i]);
            }
        };

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
                state.hsmPList.push(point.id)
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
                state.viewer.scene.primitives.add(
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
                        name: '洪水淹没面'
                    })
                );
            }
            let activeShapePoints = [];
            let activeShape;
            let floatingPoint;
            state.handler2.setInputAction(function (event) {
                const earthPosition = state.viewer.scene.pickPosition(event.position);
                const zb_n = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).longitude
                );
                const zb_e = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).latitude
                );
                cn.push(Number(zb_n));
                cn.push(Number(zb_e));
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

            state.handler2.setInputAction(function (event) {
                if (Cesium.defined(floatingPoint)) {
                    const newPosition = state.viewer.scene.pickPosition(event.endPosition);
                    if (Cesium.defined(newPosition)) {
                        floatingPoint.position.setValue(newPosition);
                        activeShapePoints.pop();
                        activeShapePoints.push(newPosition);
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            function terminateShape() {
                drawPlant(cn, num.value);
                if (state.viewer.scene.primitives.length < 3) {
                    const viewModel = {
                        elev: 0
                    };
                    Cesium.knockout.track(viewModel);
                    const slider = state.slider;
                    Cesium.knockout.applyBindings(viewModel, slider);
                    state.ko = Cesium.knockout
                        .getObservable(viewModel, "elev")
                        .subscribe(function (height) {

                            for (let i = state.ecList.length; i < state.viewer.scene.primitives.length; i++) {
                                state.viewer.scene.primitives.get(i).show = false
                            }
                            const hsm = state.viewer.scene.primitives.add(
                                new Cesium.Primitive({
                                    geometryInstances: new Cesium.GeometryInstance({
                                        geometry: new Cesium.PolygonGeometry({
                                            polygonHierarchy: new Cesium.PolygonHierarchy(
                                                Cesium.Cartesian3.fromDegreesArray(cn)
                                            ),
                                            height: height,
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

                            const band1Position = Number(height);
                            const bandThickness = 10;
                            const bandTransparency = 1.0;
                            const antialias = Math.min(10.0, bandThickness * 0.1);
                            const layers = [];
                            const band1 = {
                                entries: [
                                    {
                                        height: band1Position - bandThickness * 0.5 - antialias,
                                        color: Cesium.Color.AQUA.withAlpha(0.0),
                                    },
                                    {
                                        height: band1Position - bandThickness * 0.5,
                                        color: Cesium.Color.AQUA.withAlpha(1.0),
                                    },
                                    {
                                        height: band1Position + bandThickness * 0.5,
                                        color: Cesium.Color.AQUA.withAlpha(1.0),
                                    },
                                    {
                                        height: band1Position + bandThickness * 0.5 + antialias,
                                        color: Cesium.Color.AQUA.withAlpha(0.0),
                                    },
                                ],
                            };
                            layers.push(band1);
                            const material = Cesium.createElevationBandMaterial({
                                scene: state.viewer.scene,
                                layers: layers,
                            });
                            state.viewer.scene.globe.material = material;

                        });

                }

                activeShapePoints.pop();
                state.viewer.entities.remove(floatingPoint);
                state.viewer.entities.remove(activeShape);
                floatingPoint = undefined;
                activeShape = undefined;
                activeShapePoints = [];
                for (let i = 0; i < state.hsmPList.length; i++) {
                    state.viewer.entities.removeById(state.hsmPList[i]);
                }
            }
            state.handler2.setInputAction(function (event) {
                terminateShape();
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        };

        /*清除洪水面函数*/
        const cleanRange = () => {
            qcsj();
            for (let i = state.ecList.length; i < state.viewer.scene.primitives.length; i++) {
                state.viewer.scene.primitives.get(i).show = false
            }
            const layers = []
            const emptyBand = {
                entries: [
                    {
                        height: 1,
                        color: Cesium.Color.AQUA.withAlpha(0.0),
                    },
                    {
                        height: 2,
                        color: Cesium.Color.AQUA.withAlpha(0.0),
                    },
                    {
                        height: 2,
                        color: Cesium.Color.AQUA.withAlpha(0.0),
                    },
                    {
                        height: 1,
                        color: Cesium.Color.AQUA.withAlpha(0.0),
                    },
                ],
            };
            layers.push(emptyBand)
            const material = Cesium.createElevationBandMaterial({
                scene: state.viewer.scene,
                layers: layers,
            });
            state.viewer.scene.globe.material = material;
            cn = []
        }

        /*Terrain县区选择 */
        const selectterrain = () => {
            state.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
                url: `http://192.168.0.211:8083/terrain/甘孜地形切片/${state.value}`,
                minimumLevel: 0,
                maximumLevel: 15,
            });
        };
        return {
            qcsj,
            QueryPoint,
            cleanQueryPoint,
            selectterrain,
            viewTopDown,
            viewWithAnimate,
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
    width: 300px;
}
</style>


