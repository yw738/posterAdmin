<template>
  <div id="bottom_txt">
    <div class="flexCen">
      <el-divider style="border: 2px solid #ca8047; width: 166px" class="mr70" />
      <span>{{ txt1 }}</span>
      <el-divider
        direction="vertical"
        style="border: 2px solid #e2aa75; height: 48px"
        :class="templateCn ? 'm60' : 'm30'"
      />
      <span>{{ txt2 }}</span>
      <el-divider
        direction="vertical"
        style="border: 2px solid #e2aa75; height: 48px"
        :class="templateCn ? 'm60' : 'm30'"
      />
      <span>{{ txt3 }}</span>
      <el-divider
        direction="vertical"
        style="border: 2px solid #e2aa75; height: 48px"
        :class="templateCn ? 'm60' : 'm30'"
      />
      <span>{{ txt4 }}</span>
      <el-divider style="border: 2px solid #ca8047; width: 166px" class="ml70" />
    </div>
  </div>
</template>
<script setup>
/**
 * 底部线条
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

let txt1 = computed(() => app?.screenData?.bottomline?.txt1)
let txt2 = computed(() => app?.screenData?.bottomline?.txt2)
let txt3 = computed(() => app?.screenData?.bottomline?.txt3)
let txt4 = computed(() => app?.screenData?.bottomline?.txt4)
let templateCn = computed(() => app.templateType == 'cn')
</script>

<style lang="scss" scoped>
$color: #e2aa75;
#bottom_txt {
  position: absolute;
  bottom: 272px;
  left: 0;
  height: 70px;
  font-size: 46px;
  color: $color;
  width: 100%;
  // font-weight: 700;
  text-align: center;

  .flexCen {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.mr70 {
  margin-right: 70px;
}
.ml70 {
  margin-left: 70px;
}
.m60 {
  margin: 0 60px;
}
.m30 {
  margin: 0 30px;
}
</style>
