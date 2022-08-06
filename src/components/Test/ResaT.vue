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
        //   terrainProvider: Cesium.createWorldTerrain({
        //   requestWaterMask: true,
        //   requestVertexNormals: true,
        // }),
        terrainProvider: new Cesium.CesiumTerrainProvider({
          url: "http://192.168.0.100:8083/terrain/甘孜地形切片/巴塘县",
          minimumLevel: 0,
          maximumLevel: 15,
        }),
        // imageryProvider: new Cesium.UrlTemplateImageryProvider({
        //   url: "http://localhost:8083/dom/{z}/{x}/{y}.png",
        //   tilingScheme: new Cesium.WebMercatorTilingScheme(),
        //   fileExtension: 'png',
        //   minimumLevel: 0,
        //   maximumLevel: 19
        // }),
      })
            /*加载dmal，生成管理范围线 */
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
      });
      /*加载hyda，生成湖面 */
      const b = new Array();
      const promise = Cesium.GeoJsonDataSource.load("\\措普\\hyda.json");
      promise.then(function (dataSource) {
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
                height: 4110,
                  // perPositionHeight:true,
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
               aboveGround : true
            }),
          })
        );
      });
      
      /*视觉调整 */
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
      /*增加DOM于默认DOM上*/
      state.viewer.scene.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: "http://192.168.0.100:8083/dom/{z}/{x}/{y}.png",
          tilingScheme: new Cesium.WebMercatorTilingScheme(),
          minimumLevel: 0,
          maximumLevel: 20
        }),
      )
    });
    
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style>
</style>
