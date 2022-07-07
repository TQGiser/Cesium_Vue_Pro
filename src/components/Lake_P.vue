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
        animation: false,
         terrainProvider: Cesium.createWorldTerrain({
          requestWaterMask: true,
          requestVertexNormals: true,
        }),
      });
      const b = new Array();
      const promise = Cesium.GeoJsonDataSource.load("\\措普\\dmaa.json");
      promise.then(function (dataSource) {
        state.viewer.dataSources.add(dataSource);
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
                Cesium.Cartesian3.fromDegreesArray(b),
              ),
            //   vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
              
              height:4110,
            //   perPositionHeight:true,
              extrudedHeight:4090
            }),
          }),
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            material: new Cesium.Material({
              fabric: {
                type: "Water",
                uniforms: {
                  baseWaterColor: new Cesium.Color(
                    64 / 255.0,
                    157 / 255.0,
                    253 / 255.0,
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
