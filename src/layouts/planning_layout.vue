<template>
  <div>
    <el-row type="flex" class="map-video-wrapper">
      <el-col :span=16>
        <tl-map v-bind:planningPlaces="planningPlaces"></tl-map>
      </el-col>
      <el-col :span=8>
        <tl-video-chat></tl-video-chat>
      </el-col>
    </el-row>
    <nuxt/>
  </div>
</template>

<style scoped>
.map-video-wrapper{
  width: 100%;
  position: fixed;
  margin-top: 40px;
  z-index: 10;
}
</style>

<script>
import Vue from 'vue/dist/vue.esm'

import TlVideoChat from '../components/tl_video_chat.vue'
import TlMap from '../components/tl_map.vue'

export default {
  components: {
    TlVideoChat,
    TlMap,
  }
}


</script>
