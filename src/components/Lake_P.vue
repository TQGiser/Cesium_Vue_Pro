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
          url: "http://localhost:8083/terrain/甘孜地形切片/巴塘县",
          minimumLevel: 0,
          maximumLevel: 15,
        }),
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

      /*静态加载DMAP，后期改 */
      state.viewer.entities.add({
        name: "管理线桩",
        position: Cesium.Cartesian3.fromDegrees(
          99.556498102,
          30.498346194,
          4105.0
        ),
        // model: {
        //   uri: "\\模型\\卡丁车.glb",
        //   scale:10,
        // },
        box: {
          dimensions: new Cesium.Cartesian3(10.0, 10.0, 40.0),
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      state.viewer.entities.add({
        name: "管理线桩",
        position: Cesium.Cartesian3.fromDegrees(
          99.548185002,
          30.499242465,
          4105.0
        ),
        // model: {
        //   uri: "\\模型\\卡丁车.glb",
        //   scale:10,
        // },
        box: {
          dimensions: new Cesium.Cartesian3(10.0, 10.0, 40.0),
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      state.viewer.entities.add({
        name: "管理线桩",
        position: Cesium.Cartesian3.fromDegrees(
          99.542412633,
          30.490733777,
          4105.0
        ),
        // model: {
        //   uri: "\\模型\\卡丁车.glb",
        //   scale:10,
        // },
        box: {
          dimensions: new Cesium.Cartesian3(10.0, 10.0, 40.0),
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      state.viewer.entities.add({
        name: "管理线桩",
        position: Cesium.Cartesian3.fromDegrees(
          99.551501782,
          30.489560045,
          4105.0
        ),
        // model: {
        //   uri: "\\模型\\卡丁车.glb",
        //   scale:10,
        // },
        box: {
          dimensions: new Cesium.Cartesian3(10.0, 10.0, 40.0),
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      /*视觉调整 */
      // state.viewer.camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(
      //     99.54714582,
      //     30.48131388,
      //     4700
      //   ),
      //   orientation: {
      //     heading: Cesium.Math.toRadians(2.0),
      //     pitch: Cesium.Math.toRadians(-20.0),
      //   },
      // });

      /*生成动画线property变量*/
      const positionProperty = new Cesium.SampledPositionProperty();
      const promise3 = Cesium.GeoJsonDataSource.load("\\措普\\百米桩三维点.json");
      promise3.then(function (dataSource) {
        const entitys = dataSource.entities.values;
        for (let i = 0; i < entitys.length; i++) {
          const entity = dataSource.entities.values[i];
          const zb_c3 =
            state.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              entity.position._value
            );
          const zb_n = Cesium.Math.toDegrees(zb_c3.latitude);
          const zb_e = Cesium.Math.toDegrees(zb_c3.longitude);
          const zb_h = Number(zb_c3.height);
          const zb_h2 = Number(zb_c3.height) + 100 /*提高点高度100米 */
          /*是否生成地面百米桩点 */
          // state.viewer.entities.add({
          //   position: Cesium.Cartesian3.fromDegrees(zb_e, zb_n, zb_h),                      
          //   point: {
          //     pixelSize: 10,
          //     color: Cesium.Color.RED,
          //     outlineColor: Cesium.Color.BLUE,
          //     outlineWidth: 2,
          //     // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,   /*贴地选项*/
          //   },
          // });
          const time = Cesium.JulianDate.addSeconds(
            start,
            i * timeStepInSeconds,
            new Cesium.JulianDate()
          );
          const position = Cesium.Cartesian3.fromDegrees(zb_e, zb_n, zb_h2);
          positionProperty.addSample(time, position);
        }
      });



      /*加载模型，生成动画线 */
      const timeStepInSeconds = 1;
      const start = Cesium.JulianDate.fromDate(new Date(2021, 6, 27, 16));
      const stop = Cesium.JulianDate.addSeconds(
        start,
        50,
        new Cesium.JulianDate()
      );
      state.viewer.clock.startTime = start.clone();
      state.viewer.clock.stopTime = stop.clone();
      state.viewer.clock.currentTime = start.clone();
      state.viewer.timeline.zoomTo(start, stop);
      state.viewer.clock.multiplier = 0.5;
      state.viewer.clock.shouldAnimate = true;
      state.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
      const airplaneEntity = state.viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({ start: start, stop: stop }),
        ]),
        position: positionProperty,
        model: {
          // uri: 'three官网glb模型\\Stork.glb',
          uri: '\\模型\\无人机.glb',
          // minimumPixelSize: 3
          scale: 100
        },
        orientation: new Cesium.VelocityOrientationProperty(positionProperty),

        path: new Cesium.PathGraphics(
          {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: Cesium.Color.YELLOW,
            }),
            width: 5
          }
        ),
      });

      console.log(airplaneEntity);
      //平滑曲线
      airplaneEntity.position.setInterpolationOptions({
        interpolationDegree: 5,
        interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
      });
      // Make the camera track this moving entity.
      state.viewer.trackedEntity = airplaneEntity;
      state.viewer.scene.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: "http://localhost:8083/dom/{z}/{x}/{y}.png",
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
