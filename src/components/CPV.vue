<template>
    <div id="map">
        <el-tag size="large" effect="dark">经度：{{ jd }}</el-tag>
        <el-tag size="large" effect="dark">纬度：{{ wd }}</el-tag>
        <el-tag size="large" effect="dark">大地高：{{ ddg }}</el-tag>
        <el-tag size="large" effect="dark">视角高：{{ sjg }}</el-tag>
        <el-select v-model="value" class="m-2" placeholder="Select" size="small">
            <el-option v-for="item in op" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="value2" class="m-2" placeholder="Select" size="small">
            <el-option v-for="item in op2" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" @click="test">Primary</el-button>
    </div>

</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive, ref } from "vue";
import { ElButton } from "element-plus";
var sf = require("shapefile");
export default {
    setup() {
        const state = reactive({
            viewer: null,
            msg: null,
            jd: null,
            wd: null,
            sjg: null,
            ddg: null,
            op: null,
            op2: null,
            value: null,
            value2: null
        });
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjczNDgzMy1hYzE1LTRjNWYtODZhMS01MjZkNWRiMDc2MmUiLCJpZCI6ODIxMzAsImlhdCI6MTY0NDU0ODc0M30.LpGXXWsbQXucV5MTeC2g8BCAQWiZp612gosWcK-7ocE";
        onMounted(() => {
            state.op = [
                {
                    value: "巴塘县",
                    label: "巴塘县",
                },
                {
                    value: "丹巴县",
                    label: "丹巴县",
                },
            ],
                state.op2 = [
                    {
                        value: "乡1",
                        label: "乡1",
                    },
                    {
                        value: "乡2",
                        label: "乡2",
                    },
                ],
                state.value = ref(''),
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
            /*按三维点加载，速度快 */
            const promise = Cesium.GeoJsonDataSource.load("\\甘孜州数据\\3维点位.json");
            promise.then(function (dataSource) {
                // state.viewer.dataSources.add(dataSource);
                const entities = dataSource.entities.values;
                for (let i = 0; i < entities.length; i++) {
                    const jd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(entities[i]._position._value).longitude)
                    const wd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(entities[i]._position._value).latitude)
                    const gd = Cesium.Cartographic.fromCartesian(entities[i]._position._value).height + 20
                    const name = entities[i].properties.pName._value
                    state.viewer.entities.add({
                        name: name,
                        position: Cesium.Cartesian3.fromDegrees(jd, wd, gd + 100),
                        ellipsoid: {
                            radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
                            material: Cesium.Color.LIGHTSKYBLUE.withAlpha(1.0),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 2000000.0),
                            // scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                            // outline: true,
                            // outlineColor: Cesium.Color.BLACK,
                        },
                    })
                    state.viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(jd, wd, gd + 220),
                        label: {
                            text: name,           /*注记名称 */
                            fillColor: Cesium.Color.WHITE,
                            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.BASELINE,
                            showBackground: true,
                            backgroundColor: Cesium.Color.DEEPSKYBLUE,
                            backgroundPadding: Cesium.Cartesian2(30, 30),
                            style: Cesium.LabelStyle.FILL,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 10000.0),
                            scale: 0.8
                        },
                    })

                }
                // console.log(entities[11])
            });

            /*加载行政区贴地线 */
            const promise2 = Cesium.GeoJsonDataSource.load("\\甘孜州数据\\巴塘乡镇界.json");
            promise2.then(function (dataSource) {
                const entities = dataSource.entities.values;
                const len = entities.length
                for (let i = 0; i < len; i++) {
                    const len2 = entities[i].polyline.positions._value.length;
                    const a = new Array();
                    for (let j = 0; j < len2; j++) {
                        const jd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(entities[i].polyline.positions._value[j]).longitude)
                        const wd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(entities[i].polyline.positions._value[j]).latitude)
                        a.push(Number(jd))
                        a.push(Number(wd))
                    }
                    state.viewer.entities.add({
                        polyline: {
                            positions: Cesium.Cartesian3.fromDegreesArray(a),
                            clampToGround: true,
                            width: 10,
                            material: new Cesium.PolylineGlowMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                                // outlineWidth: 3,
                                // outlineColor: Cesium.Color.BLACK,
                                glowPower: 0.25,
                            }),
                        },
                    });
                }
            });

            /*加载hyda，生成湖面 */
            const b = new Array();
            const promise3 = Cesium.GeoJsonDataSource.load("\\措普\\hyda.json");
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
                    b.push(Number(zb_e));
                    b.push(Number(zb_n));
                }
                state.viewer.scene.primitives.add(
                    new Cesium.Primitive({
                        geometryInstances: new Cesium.GeometryInstance({
                            geometry: new Cesium.PolygonGeometry({
                                polygonHierarchy: new Cesium.PolygonHierarchy(
                                    Cesium.Cartesian3.fromDegreesArray(b)
                                ),
                                height: 4108,
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

            /*加载管理范围线*/
            const c = new Array();
            const promise4 = Cesium.GeoJsonDataSource.load("\\措普\\dmal.json");
            promise4.then(function (dataSource) {
                const entities = dataSource.entities.values;
                const len2 = entities[0].polyline.positions._value.length;
                for (let i = 0; i < len2; i++) {
                    const zb_c3 =
                        state.viewer.scene.globe.ellipsoid.cartesianToCartographic(
                            entities[0].polyline.positions._value[i]
                        );
                    const zb_n = Cesium.Math.toDegrees(zb_c3.latitude);
                    const zb_e = Cesium.Math.toDegrees(zb_c3.longitude);
                    c.push(Number(zb_e));
                    c.push(Number(zb_n));
                }
                state.viewer.entities.add({
                    polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArray(c),
                        clampToGround: true,
                        width: 30,

                        material: new Cesium.PolylineGlowMaterialProperty({
                            color: Cesium.Color.CYAN,
                            // outlineWidth: 3,
                            // outlineColor: Cesium.Color.BLACK,
                            glowPower: 0.25,
                        }),
                    },
                });
            });

            /*加载巴塘河流中线 */
            const promise5 = Cesium.GeoJsonDataSource.load("\\巴塘数据\\河流中线.json");
            promise5.then(function (dataSource) {
                const entities = dataSource.entities.values;
                const len = entities.length
                for (let i = 0; i < len; i++) {
                    const len2 = entities[i].polyline.positions._value.length;
                    const e = new Array();
                    for (let j = 0; j < len2; j++) {
                        const jd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(entities[i].polyline.positions._value[j]).longitude)
                        const wd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(entities[i].polyline.positions._value[j]).latitude)
                        e.push(Number(jd))
                        e.push(Number(wd))
                    }
                    state.viewer.entities.add({
                        polyline: {
                            positions: Cesium.Cartesian3.fromDegreesArray(e),
                            clampToGround: true,
                            width: 20,
                            material: new Cesium.PolylineGlowMaterialProperty({
                                color: Cesium.Color.DODGERBLUE,
                                // outlineWidth: 3,
                                // outlineColor: Cesium.Color.BLACK,
                                glowPower: 0.25,
                                // taperPower:0.5                      /扩散渲染
                            }),
                            // material: new Cesium.Material({
                            //     fabric: {
                            //         type: "Water",
                            //         uniforms: {
                            //             baseWaterColor: new Cesium.Color(
                            //                 115 / 255.0,
                            //                 178 / 255.0,
                            //                 255 / 255.0,
                            //                 0.5
                            //             ),
                            //             normalMap: "\\水体\\waterNormals.jpg",
                            //             frequency: 1000.0,
                            //             animationSpeed: 0.001,
                            //             amplitude: 10,
                            //             specularIntensity: 2,
                            //         },
                            //     },
                            // }),
                        },
                    });
                }
            });


            /*获取视角高度，采用MOVEMENT事件驱动*/
            var handler = new Cesium.ScreenSpaceEventHandler(state.viewer.scene.canvas);
            handler.setInputAction(function (movement) {
                state.sjg = (state.viewer.camera.positionCartographic.height).toFixed(0)
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

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

            /*定义视角事件，采用CLICK事件驱动*/
            var handler2 = new Cesium.ScreenSpaceEventHandler(
                state.viewer.scene.canvas
            );
            handler2.setInputAction(function (event) {
                const earthPosition = state.viewer.scene.pickPosition(event.position);
                // console.log(Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(earthPosition).longitude))
                const jd = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).longitude
                ).toFixed(8);
                const wd = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).latitude
                ).toFixed(8);
                const height =
                    Cesium.Cartographic.fromCartesian(earthPosition).height.toFixed(2);
                state.ddg = height;
                // state.sjg = state.viewer.camera.positionCartographic.height.toFixed(0);
                state.jd = jd;
                state.wd = wd;
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            /*视角控制 */
            state.viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(
                    99.54714582,
                    30.38131388,
                    8000
                ),
                orientation: {
                    heading: Cesium.Math.toRadians(2.0),
                    pitch: Cesium.Math.toRadians(-20.0),
                },
            });
        });
        const test = () => {
            console.log(state.value)
            console.log(state.value2)
        }
        sf.open("\\SHP数据\\dmap.shp")
            .then(source => console.log(source));
        return {
            test,
            ...toRefs(state),
        };
    },
};
</script>
<style>
</style>
