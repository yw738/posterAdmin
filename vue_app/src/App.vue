<template>
  <router-view />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'

onBeforeMount(() => {

})
</script>
<style lang="scss">
body {
  font-family:
    Microsoft YaHei,
    PingFangSC,
    PingFangSC-Semibold,
    notosans;
}

/*滚动条的宽度*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/*滚动条的滑块*/
::-webkit-scrollbar-thumb {
  background-color: #e0e0e0;
  border-radius: 10px;
}

/*火狐滚动条样式*/
* {
  scrollbar-color: #e0e0e0 #f7f7f9;
  /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin;
  /* 滚动条宽度有三种：thin、auto、none */
}
</style>
