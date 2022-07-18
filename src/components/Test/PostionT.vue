<template>
    <div id="map">
    </div>
</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive } from "vue";

export default {
    setup() {
        const state = reactive({
            viewer: null,
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
                })
            });
            /*按平面点加载，用RELATIVE_TO_GROUND方法，加载慢 */
            // const promise = Cesium.GeoJsonDataSource.load("\\甘孜州数据\\positon.json");
            // promise.then(function (dataSource) {
            //     // state.viewer.dataSources.add(dataSource);
            //     const entities = dataSource.entities.values;
            //     for (let i = 0; i < entities.length; i++) {
            //         const jd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(entities[i]._position._value).longitude)
            //         const wd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(entities[i]._position._value).latitude)
            //         const name = entities[i].properties._所属河._value
            //         // console.log(name, jd, wd)
            //         state.viewer.entities.add({
            //             name:name,
            //             position: Cesium.Cartesian3.fromDegrees(jd, wd),
            //             point: {
            //                 color: Cesium.Color.SKYBLUE.withAlpha(0.3),
            //                 pixelSize: 10,
            //                 outlineColor: Cesium.Color.AQUA,
            //                 outlineWidth: 1,
            //                 heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            //                 disableDepthTestDistance: Number.POSITIVE_INFINITY,
            //                 scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
            //             },
            //             label: {
            //                 text: name,           /*注记名称 */
            //                 fillColor: Cesium.Color.DARKTURQUOISE,
            //                 heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            //                 horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            //                 verticalOrigin: Cesium.VerticalOrigin.BASELINE,
            //                 outlineColor: Cesium.Color.WHITE,
            //                 outlineWidth: 5.0,
            //                 showBackground: false,
            //                 backgroundColor: Cesium.Color.DARKGREY,
            //                 backgroundPadding: Cesium.Cartesian2(30, 30),
            //                 style: Cesium.LabelStyle.FILL,
            //                 disableDepthTestDistance: Number.POSITIVE_INFINITY,
            //                 distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 10000.0),
            //                 pixeloffset : new Cesium.Cartesian2(0, -7500)
            //             },
            //         })
            //     }
            // }); 

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
                        position: Cesium.Cartesian3.fromDegrees(jd, wd, gd),
                        ellipsoid: {
                            radii: new Cesium.Cartesian3(10.0, 10.0, 10.0),
                            material: Cesium.Color.LIGHTSKYBLUE.withAlpha(1.0),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 2000.0),
                            // scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                            // outline: true,
                            // outlineColor: Cesium.Color.BLACK,
                        },
                    })
                    state.viewer.entities.add({
                        name: name,
                        position: Cesium.Cartesian3.fromDegrees(jd, wd, gd + 20),
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
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 150000.0),
                            scale:0.5
                        },
                    })

                }
                // console.log(entities[11])
            });

            /*加载四川省行政区 */
            
            const promise2 = Cesium.GeoJsonDataSource.load("\\甘孜州数据\\巴塘乡镇界.json");
            promise2.then(function (dataSource) {
                const entities = dataSource.entities.values;
                console.log(entities)
                const len = entities.length
               

                for (let i = 0; i < len; i++) {
                     const len2 = entities[i].polyline.positions._value.length;
                     const c = new Array();
                    for (let j = 0; j < len2; j++) {
                        const jd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(entities[i].polyline.positions._value[j]).longitude)
                        const wd = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(entities[i].polyline.positions._value[j]).latitude)
                        c.push(Number(jd))
                        c.push(Number(wd))
                    }
                    state.viewer.entities.add({
                    polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArray(c),
                        clampToGround: true,
                        width: 30,
                        material: new Cesium.PolylineGlowMaterialProperty({
                            color: Cesium.Color.LIGHTCORAL,
                            // outlineWidth: 3,
                            // outlineColor: Cesium.Color.BLACK,
                            glowPower: 0.25,
                        }),
                    },
                });
                }
                

                // for (let i = 0; i < entities.length; i++) {
                //     // for (let j = 0;j < entities[i].polyline.positions._value.length )
                //     const zb_c3 =
                //         state.viewer.scene.globe.ellipsoid.cartesianToCartographic(
                //             entities[0].polyline.positions._value[i]
                //         );
                //     const zb_n = Cesium.Math.toDegrees(zb_c3.latitude);
                //     const zb_e = Cesium.Math.toDegrees(zb_c3.longitude);
                //     c.push(Number(zb_e));
                //     c.push(Number(zb_n));
                // }
                // state.viewer.entities.add({
                //     polyline: {
                //         positions: Cesium.Cartesian3.fromDegreesArray(c),
                //         clampToGround: true,
                //         width: 30,

                //         material: new Cesium.PolylineGlowMaterialProperty({
                //             color: Cesium.Color.LIGHTCORAL,
                //             // outlineWidth: 3,
                //             // outlineColor: Cesium.Color.BLACK,
                //             glowPower: 0.25,
                //         }),
                //     },
                // });
            });


            /*视角*/
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
