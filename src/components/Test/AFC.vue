<template>
    <div id="map"></div>
</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive } from "vue";

export default {
    setup() {
        const state = reactive({
            viewer: null,
            scene: null,
            msg: null,
        });
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjczNDgzMy1hYzE1LTRjNWYtODZhMS01MjZkNWRiMDc2MmUiLCJpZCI6ODIxMzAsImlhdCI6MTY0NDU0ODc0M30.LpGXXWsbQXucV5MTeC2g8BCAQWiZp612gosWcK-7ocE";



        onMounted(() => {
            state.viewer = new Cesium.Viewer("map", {
                timeline: false,
                vrButton: false,
                animation: true,
                shouldAnimate: true
            });

            // let ysl = 100000
            // function lc() {
            //     ysl += 10000
            //     if (ysl > 2000000) {
            //         ysl = 100000
            //     }
            //     return ysl
            // }
            // state.viewer.entities.add({
            //     position: Cesium.Cartesian3.fromDegrees(-100, 60, 0),
            //     cylinder: {
            //         length: new Cesium.CallbackProperty(lc, false),
            //         topRadius: 100000.0,
            //         bottomRadius: 100000.0,
            //         material: Cesium.Color.AQUA,
            //     },
            // })

            let minR = 100000;//最小半径
            function changeR1() {
                minR += 5000;
                if (minR > 400000) {
                    minR = 100000;
                }
                return minR;
            }
            let minR2 = 100001;
            function changeR2() {
                minR2 += 5000;
                if (minR2 > 401000) {
                    minR2 = 100001;
                }
                return minR2;
            }
            let minR3 = 100001;
            function changeR3() {
                minR3 += 5000;
                if (minR3 > 401000) {
                    minR3 = 100001;
                }
                return `${minR3}`;
            }
            state.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(-100, 50.0),
                name: '圆形',
                ellipse: {
                    semiMinorAxis: new Cesium.CallbackProperty(changeR1, false),
                    semiMajorAxis: new Cesium.CallbackProperty(changeR2, false),
                    material: new Cesium.ImageMaterialProperty({
                        image: '\\pic\\KS2.png',
                        repeat: new Cesium.Cartesian2(1.0, 1.0),
                        transparent: true,
                        color: new Cesium.CallbackProperty(function () {
                            var alp = 1;
                            alp = 1 - minR2 / 400000;
                            return Cesium.Color.WHITE.withAlpha(alp)
                        }, false)
                    })
                },
                label: {
                    text: new Cesium.CallbackProperty(changeR3, false)
                }

            });


            // const czml = [
            //     {
            //         id: "document",
            //         name: "CZML Custom Properties",
            //         version: "1.0",
            //         clock: {
            //             interval: "1970/2010",
            //             currentTime: "1970",
            //             multiplier: 500000000,
            //         },
            //     },
            //     {
            //         id: "custom_property_object",
            //         name: "An object with custom properties",
            //         properties: {
            //             constant_property: true,
            //             population_intervals: [
            //                 {
            //                     interval: "1970/1980",
            //                     number: 2209600,
            //                 },
            //                 {
            //                     interval: "1980/2090",
            //                     number: 2889700,
            //                 },
            //                 {
            //                     interval: "1990/2000",
            //                     number: 3307600,
            //                 },
            //                 {
            //                     interval: "2000/2010",
            //                     number: 4326900,
            //                 },
            //             ],
            //             population_sampled: {
            //                 number: [
            //                     "1970",
            //                     2209600,
            //                     "1980",
            //                     2889700,
            //                     "1990",
            //                     3307600,
            //                     "2000",
            //                     4326900,
            //                     "2010",
            //                     5049100,
            //                 ],
            //             },
            //         },
            //     },
            //     {
            //         id: "colorado",
            //         name: "Colorado",
            //         polygon: {
            //             positions: {
            //                 cartographicDegrees: [
            //                     -109.03,
            //                     41,
            //                     0,
            //                     -102.03,
            //                     41,
            //                     0,
            //                     -102.03,
            //                     37,
            //                     0,
            //                     -109.03,
            //                     37,
            //                     0,
            //                 ],
            //             },
            //             material: {
            //                 solidColor: {
            //                     color: {
            //                         rgba: [0, 255, 0, 150],
            //                     },
            //                 },
            //             },
            //             height: 0,
            //             extrudedHeight: 0,
            //         },
            //     },
            // ];


            // const dataSource = new Cesium.CzmlDataSource();
            // const loadedPromise = dataSource.load(czml);

            // function scaleProperty(property) {
            //     // returns a property that scales another property by a constant factor.
            //     return new Cesium.CallbackProperty(function (time, result) {
            //         result = property.getValue(time, result);

            //         // console.log(result)
            //         return result;
            //     }, false);
            // }

            // function setExtrudedHeight(propertyName) {
            //     loadedPromise.then(function () {
            //         const customPropertyObject = dataSource.entities.getById(
            //             "custom_property_object"
            //         );
            //         const property = customPropertyObject.properties[propertyName];
            //         const colorado = dataSource.entities.getById("colorado");
            //         colorado.polygon.extrudedHeight = scaleProperty(property);
            //     });
            // }

            // state.viewer.dataSources.add(dataSource)
            //     .then(setExtrudedHeight("population_sampled"));



        });
        return {
            ...toRefs(state),
        };
    },
};
</script>
<style>
</style>
-