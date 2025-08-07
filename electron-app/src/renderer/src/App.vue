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
</style>
