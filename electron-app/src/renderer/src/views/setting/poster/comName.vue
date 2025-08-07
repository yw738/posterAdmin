<template>
  <div
    id="welcome"
    :style="{
      'font-size': size + 'px'
    }"
  >
    <div class="flexCen">
      <span>{{ title }}</span>
    </div>
  </div>
</template>
<script setup>
/**
 * 底部文字
 */
import { onMounted, onBeforeMount, computed } from 'vue'
import { useAppStore } from '@/store/app.js'
const app = useAppStore()

let title = computed(() => app?.screenData?.title)
let size = computed(() => app?.screenData?.titleSize)
</script>

<style lang="scss" scoped>
$color: #ffecb2;
#welcome {
  position: absolute;
  top: 507px;
  left: 0;
  // height: 70px;
  font-size: 106px;
  color: $color;
  width: 100%;
  font-weight: 800;
  letter-spacing: 9px;
  text-align: center;

  .flexCen {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
