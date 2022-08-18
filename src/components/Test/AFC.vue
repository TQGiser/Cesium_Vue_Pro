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
            const viewer = new Cesium.Viewer("map", {
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

            // let minR = 100000;//最小半径
            // function changeR1() {
            //     minR += 5000;
            //     if (minR > 400000) {
            //         minR = 100000;
            //     }
            //     return minR;
            // }
            // let minR2 = 100001;
            // function changeR2() {
            //     minR2 += 5000;
            //     if (minR2 > 401000) {
            //         minR2 = 100001;
            //     }
            //     return minR2;
            // }
            // let minR3 = 100001;
            // function changeR3() {
            //     minR3 += 5000;
            //     if (minR3 > 401000) {
            //         minR3 = 100001;
            //     }
            //     return `${minR3}`;
            // }
            // state.viewer.entities.add({
            //     position: Cesium.Cartesian3.fromDegrees(-100, 50.0),
            //     name: '圆形',
            //     ellipse: {
            //         semiMinorAxis: new Cesium.CallbackProperty(changeR1, false),
            //         semiMajorAxis: new Cesium.CallbackProperty(changeR2, false),
            //         material: new Cesium.ImageMaterialProperty({
            //             image: '\\pic\\KS2.png',
            //             repeat: new Cesium.Cartesian2(1.0, 1.0),
            //             transparent: true,
            //             color: new Cesium.CallbackProperty(function () {
            //                 var alp = 1;
            //                 alp = 1 - minR2 / 400000;
            //                 return Cesium.Color.WHITE.withAlpha(alp)
            //             }, false)
            //         })
            //     },
            //     label: {
            //         text: new Cesium.CallbackProperty(changeR3, false)
            //     }

            // });


            // let minR3 = 100001;
            // function changeHeight() {
            //     minR3 += 1000;
            //     if (minR3 > 401000) {
            //         minR3 = 100001;
            //     }
            //     return `${minR3}`;
            // }

            // const dataSource = new Cesium.CzmlDataSource();
            // const loadedPromise = dataSource.load("\\CZML\\test2.json");
            // function setExtrudedHeight() {
            //     loadedPromise.then(function () {

            //         const colorado = dataSource.entities.getById("colorado");
            //         colorado.polygon.extrudedHeight = new Cesium.CallbackProperty(changeHeight, false);
            //     });
            // }

            // const e = viewer.dataSources.add(dataSource)
            //     .then(setExtrudedHeight());

            // viewer.zoomTo(e)

            let minR3 = 10;
            function changeRadiaus() {
                minR3 += 0.1;
                if (minR3 > 40) {
                    minR3 = 10;
                }
                return `${minR3}`;
            }

            const dataSource = new Cesium.CzmlDataSource();
            const loadedPromise = dataSource.load("\\CZML\\XSH2.json")
            function setPointRadius() {
                loadedPromise.then(function () {
                    // console.log(dataSource.entities)
                    const enty = dataSource.entities.getById("path");
                    enty.point.pixelSize = new Cesium.CallbackProperty(changeRadiaus, false);
                    // const colorado = dataSource.entities.getById("colorado");
                    // colorado.polygon.extrudedHeight = new Cesium.CallbackProperty(changeHeight, false);
                });
            }


            const e = viewer.dataSources.add(dataSource).then(setPointRadius());
            const hp = new Cesium.HeadingPitchRange(-0.2, -0.7, 20000)
            viewer.zoomTo(e, hp)
            //     .then(setExtrudedHeight());






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