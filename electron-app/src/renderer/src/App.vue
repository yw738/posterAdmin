<template>
  <router-view />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'

onBeforeMount(() => {
  // 获取数据
  // fetch('http://localhost:8083/api/user/getList')
  //   .then((response) => {
  //     // 检查响应状态
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`)
  //     }
  //     // 将响应体解析为 JSON
  //     return response.json()
  //   })
  //   .then((data) => {
  //     ddd.value = data
  //     console.log('获取的数据:', data)
  //   })
  //   .catch((error) => {
  //     console.error('请求出错:', error)
  //   })
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
