<template>
  <div id="body">
    <HomeBg />
<!-- 11111 -->
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
      <div class="content_wrap">
        <SectionCom />
      </div>
    </scale-screen>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomeBg from './homeBg.vue'

const wrapperStyle = {}
let isScale = ref(true)
import SectionCom from './section.vue'
import ScaleScreen from '@/views/scale-screen/index'
</script>

<style lang="scss" scoped>
.content_wrap {
  width: 100%;
  height: 100%;
  padding: 16px 16px 16px 16px;
  box-sizing: border-box;
  background-size: cover;
  background-position: center center;
}

#body {
  background-image: url('@/assets/img/bg.jpg');
  background-size: cover;
  background-position: center center;
}
</style>
