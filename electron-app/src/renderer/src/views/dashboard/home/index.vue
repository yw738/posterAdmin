<template>
  <div class="home_box">
    <scale-screen
      width="1920"
      height="1080"
      :delay="500"
      :fullScreen="false"
      :boxStyle="{
        background: 'RGBA(0, 0, 0, 0)',
        overflow: isScale ? 'hidden' : 'auto'
      }"
      :wrapperStyle="wrapperStyle"
      :autoScale="isScale"
    >
      <HomeCom />
    </scale-screen>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import ScaleScreen from '@/views/scale-screen/index'

import HomeCom from '@/views/dashboard/set/left/index.vue'

const wrapperStyle = {}
let isScale = ref(true)
</script>

<style scoped>
.home_box{
  /* background-color: #0E59B6; */
}
</style>
