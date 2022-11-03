<template>
    <div id="map">
        <el-tag size="large" effect="dark">经度：{{ jd }}</el-tag>
        <el-tag size="large" effect="dark">纬度：{{ wd }}</el-tag>
        <el-tag size="large" effect="dark">大地高：{{ ddg }}</el-tag>
        <el-tag size="large" effect="dark">视角高：{{ sjg }}</el-tag>
        <el-select v-model="value" class="m-2" placeholder="请选择地形显示行政区" @change="selectterrain" size="small">
            <el-option v-for="item in op" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="warning" plain @click="viewWithAnimate">巡游</el-button>
        <el-button type="warning" plain @click="QueryPoint">查询高程点</el-button>
        <el-button type="warning" plain @click="cleanQueryPoint">清除查询点</el-button>
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
            hsmPList: [],
            entity_zx: null

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

            state.value = ref("")

            state.handler1 = new Cesium.ScreenSpaceEventHandler(state.viewer.scene.canvas);
            state.handler2 = new Cesium.ScreenSpaceEventHandler(state.viewer.scene.canvas);
            /*primivates增加要素的BUG，前置ecList不为空*/
            state.ecList.push('A')

        });
        /*加载巡游鲜水河函数 */
        const viewWithAnimate = () => {

            let minR3 = 20;
            function changeRadiaus() {
                minR3 += 0.5;
                if (minR3 > 50) {
                    minR3 = 20;
                }
                return `${minR3}`;
            }
            const e = state.viewer.dataSources
                .add(Cesium.CzmlDataSource.load("\\CZML\\XSH2.json"))
                .then(function (ds) {
                    state.entity_zx = ds.entities.getById("path");

                    state.entity_zx.point.pixelSize = new Cesium.CallbackProperty(
                        changeRadiaus,
                        false
                    );
                    return state.entity_zx
                })
                .then(function(res){
                    state.viewer.trackedEntity =res
                });
        };


        /*加载鲜水河hyda，生成湖面 */
        const hyda_cn = new Array();
        const promise3 = Cesium.GeoJsonDataSource.load("\\鲜水河\\hyda.json");
        promise3.then(function (dataSource) {
            // state.viewer.dataSources.add(dataSource);
            const entities = dataSource.entities.values;
            // const color = Cesium.Color.GREEN.withAlpha(0.1);
            // entities[0].polygon.material = color;
            const len = entities[0].polygon.hierarchy._value.positions.length;
            for (let i = 0; i < len; i++) {
                const zb_c3 =
                    state.viewer.scene.globe.ellipsoid.cartesianToCartographic(
                        entities[0].polygon.hierarchy._value.positions[i]
                    );
                const zb_n = Cesium.Math.toDegrees(zb_c3.latitude);
                const zb_e = Cesium.Math.toDegrees(zb_c3.longitude);
                hyda_cn.push(Number(zb_e));
                hyda_cn.push(Number(zb_n));
            }
            state.viewer.entities.add({
                polygon: {
                    hierarchy: new Cesium.PolygonHierarchy(
                        Cesium.Cartesian3.fromDegreesArray(hyda_cn)
                    ),
                    classificationType: Cesium.ClassificationType.TERRAIN,
                    material: new Cesium.Color.fromBytes(0, 191, 255, 100),
                },
            });
        });

        /*加载鲜水河dmaa，生成管理范围面 */
        const dmaa_cn = new Array();
        const promise10 = Cesium.GeoJsonDataSource.load("\\鲜水河\\dmaa.json");
        promise10.then(function (dataSource) {
            // state.viewer.dataSources.add(dataSource);
            const entities = dataSource.entities.values;
            // const color = Cesium.Color.GREEN.withAlpha(0.1);
            // entities[0].polygon.material = color;
            const len = entities[0].polygon.hierarchy._value.positions.length;
            for (let i = 0; i < len; i++) {
                const zb_c3 =
                    state.viewer.scene.globe.ellipsoid.cartesianToCartographic(
                        entities[0].polygon.hierarchy._value.positions[i]
                    );
                const zb_n = Cesium.Math.toDegrees(zb_c3.latitude);
                const zb_e = Cesium.Math.toDegrees(zb_c3.longitude);
                dmaa_cn.push(Number(zb_e));
                dmaa_cn.push(Number(zb_n));
            }
            state.viewer.entities.add({
                polygon: {
                    hierarchy: new Cesium.PolygonHierarchy(
                        Cesium.Cartesian3.fromDegreesArray(dmaa_cn)
                    ),
                    classificationType: Cesium.ClassificationType.TERRAIN,
                    material: new Cesium.Color.fromBytes(135, 191, 255, 100),
                },
            });
        });

        /*加载鲜水河RESA 与划洪水面功能primitives冲突，暂时不用 */
        // const tileset = new Cesium.Cesium3DTileset({
        //     url: "http://192.168.0.211:8083/resa/鲜水河/tileset.json",
        // });
        // tileset.readyPromise
        //     .then(function (tileset) {
        //         state.viewer.scene.primitives.add(tileset);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        /*加载鲜水河中线点*/
        const promise8 = Cesium.GeoJsonDataSource.load("\\鲜水河\\zx.json");
        promise8.then(function (dataSource) {
            const entities = dataSource.entities.values;
            // console.log(entities[0])
            for (let i = 0; i < entities.length; i++) {
                const jd = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(entities[i]._position._value)
                        .longitude
                );
                const wd = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(entities[i]._position._value)
                        .latitude
                );
                const gd = Cesium.Cartographic.fromCartesian(
                    entities[i]._position._value
                ).height;
                const label =
                    entities[i].properties.里程.valueOf() +
                    entities[i].properties.XZQMC.valueOf() +
                    entities[i].properties.XJQYMC.valueOf();
                // console.log(jd, wd, gd);
                state.viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(jd, wd, gd + 100),
                    cylinder: {
                        length: 100.0,
                        topRadius: 1.0,
                        bottomRadius: 1.0,
                        material: Cesium.Color.AQUA.withAlpha(0.7),
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                            10.0,
                            6000.0
                        ),
                    },
                    label: {
                        text: label /*注记名称 */,
                        fillColor: Cesium.Color.WHITE,
                        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.BASELINE,
                        showBackground: true,
                        backgroundColor: Cesium.Color.DEEPSKYBLUE,
                        backgroundPadding: Cesium.Cartesian2(30, 30),
                        style: Cesium.LabelStyle.FILL,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                            10.0,
                            5000.0
                        ),
                        scale: 0.7,
                    },
                });
            }
        });

        /*加载鲜水河照片 */
        const promise9 = Cesium.GeoJsonDataSource.load(
            "\\鲜水河\\photo_position3.json"
        );
        promise9.then(
            function (ds) {
                const entities = ds.entities.values;

                for (let i = 0; i < entities.length; i++) {
                    const jd = Cesium.Math.toDegrees(
                        Cesium.Cartographic.fromCartesian(entities[i]._position._value)
                            .longitude
                    );
                    const wd = Cesium.Math.toDegrees(
                        Cesium.Cartographic.fromCartesian(entities[i]._position._value)
                            .latitude
                    );
                    const gd = parseInt(Cesium.Cartographic.fromCartesian(entities[i]._position._value)
                        .height)
                    // console.log(entities[i])
                    const pNum = Number(entities[i]._properties.Id.valueOf())

                    // console.log(pNum)
                    const imageName = `\\pic\\photo_half\\${pNum}.jpg`
                    state.viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(jd, wd, gd + 150.0),
                        name: pNum,
                        billboard: {
                            // image: "\\pic\\photo\\A1.jpg",
                            image: imageName,
                            scale: 1,
                            height: 200.0,
                            width: 200.0,
                            sizeInMeters: true,
                        },
                    })
                    state.viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(jd, wd, gd + 5),
                        name: pNum,
                        ellipsoid: {
                            radii: new Cesium.Cartesian3(20.0, 20.0, 20.0),
                            material: Cesium.Color.LIME.withAlpha(0.9),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                                10.0,
                                2000000.0
                            ),
                            // scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                            // outline: true,
                            // outlineColor: Cesium.Color.BLACK,
                        },
                    });
                }
            }
        );

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

        /*点击划洪水面时获取坐标列表*/
        let cn = new Array();

        /*设置默认洪水面高度*/
        const num = ref(2000);


        /*高程查询函数*/
        const QueryPoint = () => {
            state.handler1.setInputAction(function (movement) {
                state.sjg = state.viewer.camera.positionCartographic.height.toFixed(0);
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            state.handler1.setInputAction(function (event) {
                const earthPosition = state.viewer.scene.pickPosition(event.position);
                const jd = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).longitude
                ).toFixed(4);
                const wd = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).latitude
                ).toFixed(4);
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
                state.ddg = height;
                state.sjg = state.viewer.camera.positionCartographic.height.toFixed(0);
                state.jd = jd;
                state.wd = wd;

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
                            Cesium.Color.CORNFLOWERBLUE .withAlpha(0.7)
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
                if (state.viewer.scene.primitives.length < 4) {
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
    width: 120px;
}
</style>


