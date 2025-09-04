<template>
  <div
    id="welcome"
    :style="{
      'font-size': size + 'px'
    }"
    class="flexCen"
  >
    <div class="welcome_card" v-if="is_welcome">
      <div class="welcome_cn" :style="{ 'font-size': size + 'px' }">{{ welcomeCn }}</div>
      <div class="welcome_en" :style="{ 'font-size': size2 + 'px' }">{{ welcomeEn }}</div>
    </div>
    <div class="yulu" v-else>
      <div v-for="(item, index) in yuluArr" :key="index">
        <span>{{ item.quote }}</span>
        <!-- <span class="zuozhe">—{{ item.author }}</span> -->
      </div>
    </div>
  </div>
</template>
<script setup>
/**
 * 右侧 底部文字
 */
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useAppStore } from '@/store/app.js'
import { extractRandomData } from './getMrMsg.js'
const app = useAppStore()

let is_welcome = computed(() => app?.setHomeData?.is_welcome === 1)
let welcomeCn = computed(() => app?.setHomeData?.welcome_cn)
let welcomeEn = computed(() => app?.setHomeData?.welcome_en)
let size = computed(() => app?.setHomeData?.welcome_cn_size)
let size2 = computed(() => app?.setHomeData?.welcome_en_size)

let timer = null
let yuluArr = ref([
  {
    quote: '成功并非偶然，而是每一次坚持的积累。',
    author: '托马斯·爱迪生'
  },
  {
    quote: '失败并不可怕，可怕的是停止尝试。',
    author: '乔治·伯纳德·肖'
  }
])
onBeforeMount(() => {
  yuluArr.value = extractRandomData()
  timer = setInterval(() => {
    yuluArr.value = extractRandomData()
  }, 600000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
$color: #fff;
#welcome {
  position: absolute;
  bottom: 45px;
  left: 550px;
  font-size: 123px;
  color: $color;
  width: calc(100% - 740px);
  height: 260px;
  font-weight: 800;
  letter-spacing: 5px;
  text-align: center;
  font-family: 'Microsoft YaHei', sans-serif;
}
.flexCen {
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 右边欢迎文本卡片 */
.welcome_card {
  color: white;
  overflow: hidden;
  /* 中文欢迎 */
  .welcome_cn {
    font-size: 58px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  /* 英文欢迎 */
  .welcome_en {
    font-size: 55px;
    font-weight: 400;
    opacity: 0.95;
    letter-spacing: 0.5px;
    color: #f0f6ff;
  }
}
.yulu {
  text-align: left;
  margin-left: 50px;
  color: white;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 6px;
  width: 100%;
  div:nth-of-type(1) {
    margin-bottom: 40px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .zuozhe {
      font-size: 23px;
    }
  }
}
</style>
