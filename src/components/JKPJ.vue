<template>
  <div id="map">
    <el-tag size="large" effect="dark">经度：{{ jd }}</el-tag>
    <el-tag size="large" effect="dark">纬度：{{ wd }}</el-tag>
    <el-tag size="large" effect="dark">大地高：{{ ddg }}</el-tag>
    <el-tag size="large" effect="dark">视角高：{{ sjg }}</el-tag>
    <el-select v-model="value" class="m-2" placeholder="请选择地形显示行政区" @change="selectterrain" size="small">
      <el-option v-for="item in op" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button type="warning" plain @click="cleanQueryPoint">清除查询点</el-button>
    <el-button type="warning" plain @click="viewWithAnimate">巡游</el-button>
    <el-button type="warning" plain @click="viewTopDown">俯视</el-button>
  </div>
</template>
<script>
import * as Cesium from "cesium/Cesium";
import { read as shapeRead } from "shapefile";
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
    });
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
      // state.viewer.zoomTo(
      //   state.viewer.entities,
      //   new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
      // );
    }

    /*建立查询点id列表 */
    var ecList = new Array();

    /*建立动画entity */
    var entity_zx;

    /*动画视角函数 */
    const viewWithAnimate = () => {
      state.viewer.trackedEntity = entity_zx

    }



    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjczNDgzMy1hYzE1LTRjNWYtODZhMS01MjZkNWRiMDc2MmUiLCJpZCI6ODIxMzAsImlhdCI6MTY0NDU0ODc0M30.LpGXXWsbQXucV5MTeC2g8BCAQWiZp612gosWcK-7ocE";
    onMounted(() => {
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
      ],
        state.value = ref(""),
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
        })
      /*加载鲜水河hyda，生成湖面 */
      const b = new Array();
      const promise3 = Cesium.GeoJsonDataSource.load("\\鲜水河\\hyda.json");
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
        state.viewer.entities.add({
          polygon: {
            hierarchy: new Cesium.PolygonHierarchy(
              Cesium.Cartesian3.fromDegreesArray(b)
            ),
            classificationType: Cesium.ClassificationType.TERRAIN,
            material: new Cesium.Color.fromBytes(0, 191, 255, 100),
          },
        });
      });

      /*获取视角高度，采用MOVEMENT事件驱动*/
      var handler = new Cesium.ScreenSpaceEventHandler(
        state.viewer.scene.canvas
      );
      handler.setInputAction(function (movement) {
        state.sjg = state.viewer.camera.positionCartographic.height.toFixed(0);
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      /*定义查询平面及高程事件，采用CLICK事件驱动*/
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
        const QueryPoint = state.viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(Number(jd), Number(wd), Number(height) + 1.0),
          point: {
            color: Cesium.Color.SKYBLUE,
            pixelSize: 3,
            outlineColor: Cesium.Color.YELLOW,
            outlineWidth: 1,
          },
        });
        ecList.push(QueryPoint.id)
        const QueryLabel = state.viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(Number(jd), Number(wd), Number(height) + 3.0),
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
        ecList.push(QueryLabel.id)
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      /*加载鲜水河中线动画*/
      let minR3 = 20;
      function changeRadiaus() {
        minR3 += 0.5;
        if (minR3 > 50) {
          minR3 = 20;
        }
        return `${minR3}`;
      }
      const e = state.viewer.dataSources
        .add(Cesium.CzmlDataSource.load("\\CZML\\XSH2.json"))
        .then(function (ds) {
          entity_zx = ds.entities.getById("path")

          entity_zx.point.pixelSize = new Cesium.CallbackProperty(changeRadiaus, false);
        })

      /*加载RESA */
      const tileset = new Cesium.Cesium3DTileset({
        url: "http://192.168.0.211:8083/resa/鲜水河/tileset.json",
      });
      tileset.readyPromise
        .then(function (tileset) {
          state.viewer.scene.primitives.add(tileset);
        })
        .catch(function (error) {
          console.log(error);
        });

      /*加载鲜水河中线点*/
      const promise8 = Cesium.GeoJsonDataSource.load("\\鲜水河\\zx.json");
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
          const gd = Cesium.Cartographic.fromCartesian(entities[i]._position._value).height;
          const label = entities[i].properties.里程.valueOf() +
            entities[i].properties.XZQMC.valueOf() +
            entities[i].properties.XJQYMC.valueOf();
          // console.log(jd, wd, gd);
          state.viewer.entities.add({
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
              disableDepthTestDistance: Number.POSITIVE_INFINITY,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                10.0,
                5000.0
              ),
              scale: 0.7,
            },
          });
        }
      });

      /*加载照片 */
      const promise9 = Cesium.GeoJsonDataSource.load("\\鲜水河\\photo_position.json");
      const pList = new Array();
      promise9.then(function (ds) {
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
          const pn = i + 1
          const imageName = `\\pic\\photo\\A${pn}.JPG`
          state.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(jd, wd),
            name: pn,
            billboard: {
              // image: `\\pic\\photo\\A${pn}.jpg`,
              image:imageName,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
              scale: 1,
              height:200.0,
              width:200.0,
              sizeInMeters: true,
            },
            // ellipsoid: {
            //   radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
            //   material: Cesium.Color.FUCHSIA.withAlpha(1.0),
            //   disableDepthTestDistance: Number.POSITIVE_INFINITY,
            //   distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            //     10.0,
            //     2000000.0
            //   ),
            //   heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            //   // scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
            //   // outline: true,
            //   // outlineColor: Cesium.Color.BLACK,
            // },
          });
        }
      })
    });



    /*Terrain县区选择 */
    const selectterrain = () => {
      state.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
        url: `http://192.168.0.211:8083/terrain/甘孜地形切片/${state.value}`,
        minimumLevel: 0,
        maximumLevel: 15,
      });
    };

    /*清除查询点位*/
    const cleanQueryPoint = () => {
      for (let i = 0; i < ecList.length; i++) {
        state.viewer.entities.removeById(ecList[i])
      }
    }

    return {
      viewWithAnimate,
      viewTopDown,
      cleanQueryPoint,
      selectterrain,
      ...toRefs(state),
    };
  },
};
</script>
<style>
</style>
