<template>
  <div
    id="welcome"
    :style="{
      'font-size': size + 'px'
    }"
  >
    <div class="flexCen">
      <span>{{ welcomeName }}</span>
    </div>
  </div>
</template>
<script setup>
/**
 * 底部文字
 */
import {
  onMounted,
  onBeforeMount,
  computed,
  reactive,
  getCurrentInstance,
  ref,
  toRefs,
  provide
} from 'vue'
import { useAppStore } from '@/store/app.js'
const app = useAppStore()

let welcomeName = computed(() => app?.screenData?.welcomeName)
let size = computed(() => app?.screenData?.welcomeNameSize)
</script>

<style lang="scss" scoped>
$color: #ffdd98;
#welcome {
  position: absolute;
  top: 210px;
  left: 0;
  font-size: 123px;
  color: $color;
  width: 100%;
  font-weight: 800;
  letter-spacing: 18px;
  text-align: center;

  .flexCen {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
