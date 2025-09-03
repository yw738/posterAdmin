<template>
  <div
    id="welcome"
    :style="{
      'font-size': size + 'px'
    }"
  >
    <div class="flexCen cnclass">
      <span>{{ cnTitle }}</span>
    </div>
    <div class="flexCen enClass">
      <span>{{ enTitle }}</span>
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

let cnTitle = computed(() => '旭森智造工业互联(深圳)有限公司')
let enTitle = computed(() => 'Success Circuits Group Limited')

let size = computed(() => app?.screenData?.titleSize)
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
