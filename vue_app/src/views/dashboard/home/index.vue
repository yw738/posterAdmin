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
import { ref, onBeforeMount } from 'vue'
import ScaleScreen from '@/views/scale-screen/index'
import HomeCom from '@/views/dashboard/set/left/index.vue'
import { useUserStore } from '@/store/user.js'
import { useAppStore } from '@/store/app.js'
const app = useAppStore()
const user = useUserStore()

onBeforeMount(() => {
  user.init().then((res) => {
    app.setHomeData = res
  })
})
const wrapperStyle = {}
let isScale = ref(true)
</script>

<style scoped>
.home_box {
  /* background-color: #0E59B6; */
}
</style>
