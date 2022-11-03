<template>

    <div id="map">
        <div id='el'>
            <el-switch v-model="show" active-text="DMAA显示" inactive-text="DMAA隐藏" @change="showPic">
            </el-switch>
            <el-switch v-model="show" active-text="DMAA显示" inactive-text="DMAA隐藏" @change="showPic">
            </el-switch>
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
            viewer: null,
            show: true,

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


        const showPic = () => {
            if (state.show == true) {
                state.viewer.entities.getById('XSH_dmaa').show = true
            } else {
                state.viewer.entities.getById('XSH_dmaa').show = false
            }
        }
        return {
            showPic,
            ...toRefs(state),
        };
    },
};
</script>
<style>
#el {
    width: 210px;
    background-color: rgba(226, 208, 208, 0.671);
    position: fixed;
    left: 20px;
    top: 10px;
    z-index: 100;
    padding-left: 10px;
}

</style>


