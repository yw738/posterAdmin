<template>
  <div id="bottom_txt">
    <div class="flexCen">
      <span>{{ txtleft }}</span> <span class="yuan"></span> <span>{{ txtright }}</span>
    </div>
  </div>
</template>
<script setup>
/**
 * 底部文字
 */
import { onBeforeMount, computed } from 'vue'
import { useAppStore } from '@/store/app.js'
const app = useAppStore()

let txtleft = computed(() => app?.screenData?.bottom?.txtleft)
let txtright = computed(() => app?.screenData?.bottom?.txtright)
</script>

<style lang="scss" scoped>
$color: #fff;
#bottom_txt {
  position: absolute;
  bottom: 93px;
  left: 0;
  height: 70px;
  font-size: 46px;
  color: $color;
  width: 100%;
  // font-weight: 700;
  text-align: center;

  .yuan {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $color;
    margin: 0 14px;
  }
  .flexCen {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
