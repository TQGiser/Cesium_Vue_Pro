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
                // timeline: false,
                // vrButton: false,
                // animation: false,
                terrainProvider: Cesium.createWorldTerrain({
                    requestWaterMask: true,
                    requestVertexNormals: true,
                }),
            });
            const c = new Array();
            const promise2 = Cesium.GeoJsonDataSource.load("\\措普\\dmal.json");
            promise2.then(function (dataSource) {
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
                const e = state.viewer.entities.add({
                    // polyline: {
                    //     positions: Cesium.Cartesian3.fromDegreesArray(c),
                    //     clampToGround: true,
                    //     width: 30,

                    //     material: new Cesium.PolylineGlowMaterialProperty({
                    //         color: Cesium.Color.LIGHTCORAL,
                    //         // outlineWidth: 3,
                    //         // outlineColor: Cesium.Color.BLACK,
                    //         glowPower: 0.25,
                    //     }),
                    // },
                    polygon: {
                        hierarchy: {
                            positions: Cesium.Cartesian3.fromDegreesArray(c),
                        },
                        /*网格材质*/
                        // material: new  Cesium.GridMaterialProperty({
                        //     color:Cesium.Color.AQUA
                        // }),
                        /*图片材质（JPG慢）*/        
                        material: new   Cesium.ImageMaterialProperty({
                            image:'\\pic\\g.jpg'
                        }),
                      
                    },
                });
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
                // state.viewer.zoomTo(e);
            });

        }
        );
        return {
            ...toRefs(state),
        };
    },
};
</script>
<style>
</style>
