<template>
  <div id="welcome">
    <div class="flexCen cnclass">
      <span :style="{ 'font-size': size + 'px' }">{{ cnTitle }}</span>
    </div>
    <div class="flexCen enClass">
      <span :style="{ 'font-size': size2 + 'px' }">{{ enTitle }}</span>
    </div>
  </div>
</template>
<script setup>
/**
 * 顶部文字
 */
import { onMounted, onBeforeMount, computed } from 'vue'
import { useAppStore } from '@/store/app.js'
const app = useAppStore()

let cnTitle = computed(() => app?.setHomeData?.title_cn)
let enTitle = computed(() => app?.setHomeData?.title_en)

let size = computed(() => app?.setHomeData?.title_cn_size)
let size2 = computed(() => app?.setHomeData?.title_en_size)
</script>

<style lang="scss" scoped>
$color: #fff;
#welcome {
  position: absolute;
  font-family:
    Microsoft YaHei,
    PingFangSC,
    sans-serif !important;
  top: 410px;
  left: 0;

  color: $color;
  width: 100%;
  font-weight: 800;
  letter-spacing: 2px;
  text-align: center;
  .flexCen {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cnclass {
    font-size: 102px;
  }
  .enClass {
    font-size: 96px;
  }
}
</style>
