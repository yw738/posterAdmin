<template>
  <div
    id="welcome"
    :style="{
      'font-size': size + 'px'
    }"
    class="flexCen"
  >
    <div class="welcome_card">
      <div class="welcome_cn">欢迎君得(深圳)科技有限公司莅临参观</div>
      <div class="welcome_en">Welcome Mr. Zhang to our company</div>
    </div>
    <div class="yulu" v-if="false">
      <div class=" ">
        <span>成功并非偶然，而是每一次坚持的积累。</span>
        <span class="zuozhe">—托马斯·爱迪生 </span>
      </div>
      <div class=" ">
        <span>失败并不可怕，可怕的是停止尝试。</span>
        <span class="zuozhe">—乔治·伯纳德·肖 </span>
      </div>
    </div>
  </div>
</template>
<script setup>
/**
 * 右侧 底部文字
 */
import { computed } from 'vue'
import { useAppStore } from '@/store/app.js'
const app = useAppStore()

let welcomeName = computed(() => app?.screenData?.welcomeName)
let size = computed(() => app?.screenData?.welcomeNameSize)
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
