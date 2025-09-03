<template>
  <div
    id="logo"
    :style="{
      height: size + 'px'
    }"
  >
    <img :src="showLogo" alt="" />
  </div>
</template>
<script setup>
/**
 * logo
 */
import {
  onMounted,
  onBeforeMount,
  computed,
  reactive,
  getCurrentInstance,
  ref,
  toRefs,
  watch
} from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { mainApi } from '@/api/index.js'
import Logo1Img from '@/assets/img/logo1.png'
import LogoImg from '@/assets/img/logo2.png'
import { useAppStore } from '@/store/app.js'
const app = useAppStore()
let defaultLogo = ref({
  scspcba_white: Logo1Img,
  success_white: LogoImg
})
let logoValue = computed(() => app?.screenData?.logo)
let size = computed(() => app?.screenData?.logoSize)

// 留接口 后续可以新增自定义的logo
let list = computed(() => ({ ...defaultLogo.value }))
let showLogo = computed(() => {
  return list.value[logoValue.value]
})
</script>

<style lang="scss" scoped>
#logo {
  position: absolute;
  top: 58px;
  left: 58px;
  height: 70px;

  img {
    height: 100%;
  }
}
</style>
