<template>
  <div id="map">
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="3"
      :on-exceed="handleExceed"
    >
      <el-button type="primary">Click to upload</el-button>
    </el-upload>
  </div>
</template>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium\\Build\\Cesium\\Widgets\\widgets.css";
import { onMounted, toRefs, reactive, ref } from "vue";
import { ElButton } from "element-plus";

export default {
  setup() {
    const state = reactive({
      viewer: null,
    });
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
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style>
</style>
