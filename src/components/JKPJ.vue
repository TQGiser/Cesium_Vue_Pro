<template>
    <div id='panal' v-if="query_panel_show">
        <el-tag size="large" effect="dark">经度：&nbsp;&nbsp;&nbsp;</el-tag>&nbsp;&nbsp;&nbsp;{{ jd }}<br>
        <el-tag size="large" effect="dark">纬度：&nbsp;&nbsp;&nbsp;</el-tag>&nbsp;&nbsp;&nbsp;{{ wd }}<br>
        <el-tag size="large" effect="dark">大地高：</el-tag>&nbsp;&nbsp;&nbsp;{{ ddg }}<br>
        <el-tag size="large" effect="dark">视角高：</el-tag>&nbsp;&nbsp;&nbsp;{{ sjg }}
    </div>
    <div id='demSwitch'>
        <el-select v-model="value" class="m-2" placeholder="请选择地形显示行政区" @change="selectterrain" size="small">
            <el-option v-for="item in op" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </div>
    <div id='animate'>
        <el-button type="success" plain @click="viewWithAnimate">巡游</el-button>
        <el-button type="success" plain @click="viewTopDown">俯视</el-button>
    </div>
    <div id='query'>
        <el-button type="success" plain @click="QueryPoint">查询高程点</el-button>
        <el-button type="success" plain @click="cleanQueryPoint">清除查询点</el-button>
    </div>
    <div id='drawPlant'>
        <el-button type="success" plain @click="drawRange">划定范围</el-button>

        <input id='slider1' ref='slider' type="range" min="2800" max="3800" step="1" v-model="elev"
            data-bind="value: elev, valueUpdate: 'input'">
        <input type="text" size="5" v-model="elev">

        <el-button type="success" plain @click="cleanRange">清除洪水面</el-button>
    </div>
    <div id='dmxpj'>
        <el-button type="success" plain @click="drawDmx">划断面线</el-button>
        <el-button type="success" plain @click="cleanDmx">清除断面线</el-button>
    </div>
    <div id="view">
        <input type="text" size="5" v-model="e">
        <input type="text" size="5" v-model="n">
        <el-button type="success" plain @click="viewTO">至</el-button>
    </div>
    <!-- <div id='test'>
        <el-button type="success" plain @click="test">test</el-button>
    </div> -->

    <div id="map">
        <div id='el'>
            <span>DMAA</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-switch v-model="show_dmaa"
                @change="fn_show_dmaa"></el-switch><br>
            <span>HYDA</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-switch v-model="show_hyda"
                @change="fn_show_hyda"></el-switch><br>
            <span>中线里程点</span>&nbsp;&nbsp;&nbsp;<el-switch v-model="show_zxlcd" @change="fn_show_zxlcd"></el-switch><br>
            <span>踏勘照片</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-switch v-model="show_pic_1"
                @change="fn_show_pic_1"></el-switch><br>
            <span>航飞照片</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-switch v-model="show_pic_2"
                @change="fn_show_pic_2"></el-switch>

        </div>
    </div>

</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive, ref } from "vue";

export default {
    setup() {
        const state = reactive({
            ip: null,
            viewer: null,
            query_panel_show: false,
            jd: null,
            wd: null,
            sjg: null,
            ddg: null,
            op: null,
            op2: null,
            value: null,
            slider: null,
            elev: 2800,
            cn: null,
            handler1: null,
            handler2: null,
            handler3: null,
            ko: null,
            ecList: [],
            hsmPList: [],
            zxlcdList: [],
            tkpic_billboard_List: [],
            hfpic_billboard_List: [],
            dmxList: [],
            dmx_pointList: [],
            dmx_fdxList: [],
            dmx_labelList: [],
            entity_zx: null,
            show_dmaa: true,
            show_hyda: true,
            show_zxlcd: true,
            show_pic_1: true,
            show_pic_2: true,
            e: null,
            n: null
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
                timeline: true,
                vrButton: false,
                animation: true,
                shouldAnimate: true,
                terrainProvider: Cesium.createWorldTerrain({
                    requestWaterMask: true,
                    requestVertexNormals: true,
                }),
            });

            // state.viewer = new Cesium.Viewer("map", {
            //     timeline: true,
            //     vrButton: false,
            //     animation: true,
            //     shouldAnimate: true,
            //     terrainProvider: new Cesium.CesiumTerrainProvider({
            //         url:`http://${state.ip}/terrain/甘孜地形切片/鲜水河`,
            //         minimumLevel: 0,
            //         maximumLevel: 15,
            //     }),
            // });

            state.viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(
                    101.116466,
                    30.849248,
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
            state.handler3 = new Cesium.ScreenSpaceEventHandler(state.viewer.scene.canvas);
            /*primivates增加要素的BUG，前置ecList不为空*/
            state.ecList.push('A')

            /*加载巡游鲜水河函数-沿空中 */
            const positionProperty = new Cesium.SampledPositionProperty();
            const addZxJSON = Cesium.GeoJsonDataSource.load("static/鲜水河/zx.json")
            addZxJSON.then(function (ds) {
                const entities = ds.entities.values
                for (let i = 0; i < entities.length; i++) {
                    const zb_c3 =
                        state.viewer.scene.globe.ellipsoid.cartesianToCartographic(
                            entities[i].position._value
                        );
                    const zb_n = Cesium.Math.toDegrees(zb_c3.latitude);
                    const zb_e = Cesium.Math.toDegrees(zb_c3.longitude);
                    const zb_h = Number(zb_c3.height) + 400.0;
                    const time = Cesium.JulianDate.addSeconds(
                        start,
                        i * timeStepInSeconds,
                        new Cesium.JulianDate()
                    );
                    const position = Cesium.Cartesian3.fromDegrees(zb_e, zb_n, zb_h);
                    positionProperty.addSample(time, position);
                }
            })
            const timeStepInSeconds = 60;
            const start = Cesium.JulianDate.fromDate(new Date(2021, 6, 27, 16));
            const stop = Cesium.JulianDate.addSeconds(
                start,
                26000,
                new Cesium.JulianDate()
            );
            state.viewer.clock.startTime = start.clone();
            state.viewer.clock.stopTime = stop.clone();
            state.viewer.clock.currentTime = start.clone();
            // state.viewer.timeline.zoomTo(start, stop);
            state.viewer.clock.multiplier = 0.5;
            state.viewer.clock.shouldAnimate = true;
            state.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
            state.viewer.entities.add({
                availability: new Cesium.TimeIntervalCollection([
                    new Cesium.TimeInterval({ start: start, stop: stop }),
                ]),
                position: positionProperty,
                id: 'airPlane',
                model: {
                    uri: 'static/模型/drone-sccs.glb',
                    scale: 10
                },
                orientation: new Cesium.VelocityOrientationProperty(positionProperty),

                path: new Cesium.PathGraphics({ width: 0 }),
            });

        });
        /*加载巡游鲜水河函数-沿河流中线 */
        // const viewWithAnimate = () => {

        //     let minR3 = 20;
        //     function changeRadiaus() {
        //         minR3 += 0.5;
        //         if (minR3 > 50) {
        //             minR3 = 20;
        //         }
        //         return `${minR3}`;
        //     }
        //     state.viewer.dataSources
        //         .add(Cesium.CzmlDataSource.load("\\CZML\\zxCx.json"))
        //         .then(function (ds) {
        //             state.entity_zx = ds.entities.getById("path");

        //             state.entity_zx.point.pixelSize = new Cesium.CallbackProperty(
        //                 changeRadiaus,
        //                 false
        //             );
        //             return state.entity_zx
        //         })
        //         .then(function (res) {
        //             state.viewer.trackedEntity = res
        //         });
        // };

        /*获取ip*/
        state.ip = window.location.host.split(':')[0] + ':8083'

        const viewWithAnimate = () => {
            state.viewer.trackedEntity = state.viewer.entities.getById('airPlane');
        };

        /*加载鲜水河断面示意线*/
        const addXshDmx = Cesium.GeoJsonDataSource.load(
            "static/鲜水河/xshDmx.json"
        );
        addXshDmx.then(function (dataSource) {
            state.viewer.dataSources.add(dataSource)
        });

        /*加载鲜水河hyda，生成湖面 */
        const hyda_cn = new Array();
        const promise3 = Cesium.GeoJsonDataSource.load("static/鲜水河/hyda.json");
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
                id: 'XSH_hyda',
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
        const promise10 = Cesium.GeoJsonDataSource.load("static/鲜水河/dmaa.json");
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
                id: 'XSH_dmaa',
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
        const promise8 = Cesium.GeoJsonDataSource.load("static/鲜水河/zx.json");
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
                const zxlcd = state.viewer.entities.add({
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
                        // disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                            10.0,
                            4000.0
                        ),
                        scale: 0.7,
                    },
                });
                state.zxlcdList.push(zxlcd.id)
            }
        });


        /*加载鲜水河照片 */
        const promise9 = Cesium.GeoJsonDataSource.load(
            "static/鲜水河/photo_position3.json"
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
                    const imageName = `static/pic/photo_half/${pNum}.jpg`
                    const tkpic_1_billboard = state.viewer.entities.add({
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
                    state.tkpic_billboard_List.push(tkpic_1_billboard.id)

                    state.viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(jd, wd, gd + 5),
                        name: pNum,
                        ellipsoid: {
                            radii: new Cesium.Cartesian3(10, 10, 10),
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


        // /*加载鲜水河--航飞照片 */
        const addPic_HF = Cesium.GeoJsonDataSource.load(
            "static/鲜水河/photo_position_HF.json"
        );
        addPic_HF.then(
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
                    const pNum = entities[i]._properties._name._value
                    const imageName = `static/pic/1103HF/${pNum}.jpg`
                    const hfpic_billboard = state.viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(jd, wd, gd + 180.0),
                        name: pNum,
                        billboard: {
                            image: imageName,
                            scale: 1,
                            height: 200.0,
                            width: 300.0,
                            sizeInMeters: true,
                        },
                    })
                    state.hfpic_billboard_List.push(hfpic_billboard.id)
                    state.viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(jd, wd, gd + 5),
                        name: pNum,
                        // ellipsoid: {
                        //     radii: new Cesium.Cartesian3(20.0, 20.0, 20.0),
                        //     material: Cesium.Color.LIME.withAlpha(0.9),
                        //     disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        //     distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                        //         10.0,
                        //         2000000.0
                        //     ),
                        //     // scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                        //     // outline: true,
                        //     // outlineColor: Cesium.Color.BLACK,
                        // },
                        model: {
                            // uri: 'three官网glb模型\\Stork.glb',
                            uri: 'static/模型/drone-sccs.glb',
                            // minimumPixelSize: 3
                            scale: 10
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
                ).toFixed(6);
                const wd = Cesium.Math.toDegrees(
                    Cesium.Cartographic.fromCartesian(earthPosition).latitude
                ).toFixed(6);
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
                // console.log(jd, wd, height)
                state.query_panel_show = true
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        }

        /*清除高程查询*/
        const cleanQueryPoint = () => {
            qcsj();
            state.query_panel_show = false
            for (let i = 0; i < state.ecList.length; i++) {
                state.viewer.entities.removeById(state.ecList[i]);
            }
        };

        /*清除事件函数*/
        const qcsj = () => {
            state.handler1.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
            state.handler1.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
            state.handler1.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
            state.handler2.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
            state.handler2.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
            state.handler2.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        }


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
                            Cesium.Color.CORNFLOWERBLUE.withAlpha(0.7)
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
                                            204 / 255.0,
                                            207 / 255.0,
                                            105 / 255.0,
                                            0.5
                                        ),
                                        normalMap: "static/水体/waterNormals.jpg",
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
                if (state.viewer.scene.primitives.length < 13) {
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
                            state.viewer.scene.primitives.add(
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
                                                        219 / 255.0,
                                                        207 / 255.0,
                                                        105 / 255.0,
                                                        0.6
                                                    ),
                                                    normalMap: "static/水体/waterNormals.jpg",
                                                    frequency: 1000.0,
                                                    animationSpeed: 0.01,
                                                    amplitude: 10,
                                                    specularIntensity: 2,
                                                },
                                            },
                                        }),
                                    }),
                                })
                            );

                            const band1Position = Number(height);
                            const bandThickness = 3;
                            // const bandTransparency = 1.0;
                            const antialias = Math.min(10.0, bandThickness * 0.1);
                            const layers = [];
                            const band1 = {
                                entries: [
                                    {
                                        height: band1Position - bandThickness * 0.5 - antialias,
                                        color: Cesium.Color.GOLDENROD.withAlpha(0.0),
                                    },
                                    {
                                        height: band1Position - bandThickness * 0.5,
                                        color: Cesium.Color.GOLDENROD.withAlpha(1.0),
                                    },
                                    {
                                        height: band1Position + bandThickness * 0.5,
                                        color: Cesium.Color.GOLDENROD.withAlpha(1.0),
                                    },
                                    {
                                        height: band1Position + bandThickness * 0.5 + antialias,
                                        color: Cesium.Color.GOLDENROD.withAlpha(0.0),
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

        /*画断面线函数*/
        const drawDmx = () => {
            state.dmxList = []
            function createPoint(worldPosition) {
                const point = state.viewer.entities.add({
                    position: worldPosition,
                    point: {
                        color: Cesium.Color.WHITE,
                        pixelSize: 5,
                        heightReference: Cesium.HeightReference.NONE,
                    },

                });
                state.dmx_pointList.push(point.id)
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

            state.handler3.setInputAction(function (event) {
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

            state.handler3.setInputAction(function (event) {
                if (Cesium.defined(floatingPoint)) {
                    const newPosition = state.viewer.scene.pickPosition(event.endPosition);
                    if (Cesium.defined(newPosition)) {
                        floatingPoint.position.setValue(newPosition);
                        activeShapePoints.pop();
                        activeShapePoints.push(newPosition);
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            state.handler3.setInputAction(function (event) {
                terminateShape();
                const all_score = new Array();
                const pl = state.viewer.entities.getById(state.dmxList[1]).polyline
                const pl_sp = pl.positions._value[0]
                const pl_ep = pl.positions._value[1]
                const pl_dis = Cesium.Cartesian3.distance(pl_sp, pl_ep)
                const count = parseInt(pl_dis / 5);
                const cartesians = new Array();
                for (let i = 0; i < count; ++i) {
                    const offset = i / (count - 1);
                    const cartesian = Cesium.Cartesian3.lerp(
                        pl_sp,
                        pl_ep,
                        offset,
                        new Cesium.Cartesian3()
                    )
                    cartesians.push(cartesian)
                }
                state.viewer.scene
                    .clampToHeightMostDetailed(cartesians)
                    .then(function (clampedCartesians) {
                        for (let j = 0; j < count - 1; j++) {
                            var score;
                            const sp = clampedCartesians[j]
                            const ep = clampedCartesians[j + 1]
                            const pl_part_dis = Cesium.Cartesian3.distance(sp, ep)
                            const pl_sp_height = Cesium.Cartographic.fromCartesian(sp).height
                            const pl_ep_height = Cesium.Cartographic.fromCartesian(ep).height
                            const pl_height = Math.abs(pl_sp_height - pl_ep_height);
                            const ang2 = Math.asin(pl_height / pl_part_dis) * 180 / 3.1415926
                            if (ang2 < 15) {
                                score = ((15 - ang2) / 15) * 25 + 75
                                const dmx_fdx = state.viewer.entities.add({
                                    polyline: {
                                        positions: [clampedCartesians[j], clampedCartesians[j + 1]],
                                        arcType: Cesium.ArcType.NONE,
                                        width: 5,
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
                                state.dmx_fdxList.push(dmx_fdx.id)

                            } else if (ang2 < 30) {
                                score = ((ang2 - 15) / 15) * 25 + 25
                                const dmx_fdx = state.viewer.entities.add({
                                    polyline: {
                                        positions: [clampedCartesians[j], clampedCartesians[j + 1]],
                                        arcType: Cesium.ArcType.NONE,
                                        width: 5,
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
                                state.dmx_fdxList.push(dmx_fdx.id)
                            } else if (ang2 < 45) {
                                score = ((ang2 - 30) / 15) * 25
                                const dmx_fdx = state.viewer.entities.add({
                                    polyline: {
                                        positions: [clampedCartesians[j], clampedCartesians[j + 1]],
                                        arcType: Cesium.ArcType.NONE,
                                        width: 5,
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
                                state.dmx_fdxList.push(dmx_fdx.id)
                            } else {
                                score = 0
                                const dmx_fdx = state.viewer.entities.add({
                                    polyline: {
                                        positions: [clampedCartesians[j], clampedCartesians[j + 1]],
                                        arcType: Cesium.ArcType.NONE,
                                        width: 5,
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
                                state.dmx_fdxList.push(dmx_fdx.id)
                            }

                            all_score.push(score)
                        }
                        let a = 0
                        for (let i = 0; i < all_score.length; i++) {
                            a += all_score[i]
                        }
                        const billboard_cn_x = Number(pl.positions._value[0].x + pl.positions._value[1].x) / 2
                        const billboard_cn_y = Number(pl.positions._value[0].y + pl.positions._value[1].y) / 2
                        const billboard_cn_z = Number(pl.positions._value[0].z + pl.positions._value[1].z) / 2
                        const billboard_cn = new Cesium.Cartesian3(billboard_cn_x, billboard_cn_y, billboard_cn_z)
                        const dmx_label = state.viewer.entities.add({
                            position: billboard_cn,
                            label: {
                                text: "岸坡评价分数:" + parseInt(a / count),
                                font: "4pt sans-serif",
                                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                fillColor: Cesium.Color.BLACK,
                                showBackground: true,
                                backgroundColor: new Cesium.Color(1, 1, 1, 0.7),
                                backgroundPadding: new Cesium.Cartesian2(8, 4),
                                // disableDepthTestDistance: Number.POSITIVE_INFINITY, // draws the label in front of terrain
                            },
                        });
                        state.dmx_labelList.push(dmx_label.id)
                    });
                pl.show = false
                state.handler3.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)



        };

        /*清除断面线函数*/
        const cleanDmx = () => {
            for (let i = 0; i < state.dmx_fdxList.length; i++) {
                state.viewer.entities.removeById(state.dmx_fdxList[i]);
            }
            for (let i = 0; i < state.dmx_labelList.length; i++) {
                state.viewer.entities.removeById(state.dmx_labelList[i]);
            }
            for (let i = 0; i < state.dmx_pointList.length; i++) {
                state.viewer.entities.removeById(state.dmx_pointList[i]);
            }
        }

        const test = () => {
            console.log(state.zxlcdList.length)
        }

        /*Terrain县区选择 */
        const selectterrain = () => {
            state.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
                url: `http://${state.ip}/terrain/甘孜地形切片/${state.value}`,
                minimumLevel: 0,
                maximumLevel: 15,
            });
        };


        /*el开关*/
        const fn_show_dmaa = () => {
            if (state.show_dmaa == true) {
                state.viewer.entities.getById('XSH_dmaa').show = true
            } else {
                state.viewer.entities.getById('XSH_dmaa').show = false
            }
        }
        const fn_show_hyda = () => {
            if (state.show_hyda == true) {
                state.viewer.entities.getById('XSH_hyda').show = true
            } else {
                state.viewer.entities.getById('XSH_hyda').show = false
            }
        }
        const fn_show_zxlcd = () => {
            if (state.show_zxlcd == true) {
                for (let i = 0; i < state.zxlcdList.length; i++) {
                    state.viewer.entities.getById(state.zxlcdList[i]).show = true
                }

            } else {
                for (let i = 0; i < state.zxlcdList.length; i++) {
                    state.viewer.entities.getById(state.zxlcdList[i]).show = false
                }
            }
        }
        const fn_show_pic_1 = () => {
            if (state.show_pic_1 == true) {
                for (let i = 0; i < state.tkpic_billboard_List.length; i++) {
                    state.viewer.entities.getById(state.tkpic_billboard_List[i]).show = true
                }
            } else {
                for (let i = 0; i < state.tkpic_billboard_List.length; i++) {
                    state.viewer.entities.getById(state.tkpic_billboard_List[i]).show = false
                }
            }
        }
        const fn_show_pic_2 = () => {
            if (state.show_pic_2 == true) {
                for (let i = 0; i < state.hfpic_billboard_List.length; i++) {
                    state.viewer.entities.getById(state.hfpic_billboard_List[i]).show = true
                }
            } else {
                for (let i = 0; i < state.hfpic_billboard_List.length; i++) {
                    state.viewer.entities.getById(state.hfpic_billboard_List[i]).show = false
                }
            }



        }

        /*位置查询*/
        const viewTO = () => {
            console.log(state.e, state.n)
            state.viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(
                    Number(state.e),
                    Number(state.n),
                    6400
                ),
                orientation: {
                    heading: Cesium.Math.toRadians(2.0),
                    pitch: Cesium.Math.toRadians(-70.0),
                },
            });

        }
        return {
            drawDmx,
            cleanDmx,
            viewTO,
            fn_show_pic_2,
            fn_show_pic_1,
            fn_show_zxlcd,
            fn_show_dmaa,
            fn_show_hyda,
            test,
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

#el {
    width: 150px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 20px;
    top: 60px;
    z-index: 100;
    padding-left: 10px;
}

#panal {
    width: 200px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 20px;
    top: 230px;
    z-index: 100;
    padding-left: 10px;
}

#demSwitch {
    width: 150px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 20px;
    top: 15px;
    z-index: 100;
    padding-left: 10px;
}

#animate {
    width: 135px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 200px;
    top: 15px;
    z-index: 100;
    padding-left: 1px;
}

#query {
    width: 220px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 350px;
    top: 15px;
    z-index: 100;
    padding-left: 1px;
}

#drawPlant {
    width: 400px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 580px;
    top: 15px;
    z-index: 100;
    padding-left: 1px;
}

#view {
    width: 200px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 990px;
    top: 15px;
    z-index: 100;
    padding-left: 1px;
}

#dmxpj {
    width: 205px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 1200px;
    top: 15px;
    z-index: 100;
    padding-left: 1px;
}

/* #test {
    width: 50px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 1700px;
    top: 15px;
    z-index: 100;
    padding-left: 1px;
} */
</style>


