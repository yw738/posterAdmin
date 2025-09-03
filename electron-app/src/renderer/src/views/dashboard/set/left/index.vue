<template>
  <div id="viewBox">
    <ComName />
    <Weather />
  </div>
</template>

<script setup>
import ComName from './comName.vue'
import Weather from './weather.vue'
</script>

<style>
#viewBox {
  background-image: url('@/assets/design/home_bg.png');
  background-size: 100% 100%;
  width: 1920px;
  height: 1080px;
  position: relative;
  transform-origin: 0 0;
  font-family: 'AlibabaPuHuiTi-Heavy';
}
</style>
