<template>
  <div class="weather_box">
    <article class="weather-card cloudy">
      <div class="cloud"></div>

      <!-- 顶部：日期和城市 -->
      <div class="top">
        <div>{{ weatherData.province }} · {{ weatherData.city }}</div>
      </div>
      <div class="top2">{{ weatherData.reporttime }}</div>
      <!-- 中间：温度 + 天气信息 -->
      <div class="mid">
        <div class="temp-now">{{ weatherData.temperature }}°</div>
        <div class="weather-info">
          <div class="desc">{{ weatherData.weather }}</div>
          <div>湿度 {{ weatherData.humidity }}%</div>
          <div>{{ weatherData.winddirection }}风 {{ weatherData.windpower }}</div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'

let weatherData = ref({})
let init = () => {
  let key = '5f0c6104150c1b405385b9abba33313f'
  let city = '440306'
  fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`, {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((data) => {
      weatherData.value = data.lives[0]
    })
    .catch((error) => console.error('Error:', error))
}
let timer = null
onBeforeMount(() => {
  init()
  timer = setInterval(() => {
    init()
  }, 600000)
})
onBeforeUnmount(() => {
  timer && clearInterval(timer)
})
</script>

<style scoped>
.weather_box {
  color: var(--text-strong);
  position: absolute;
  bottom: 45px;
  left: 194px;
}

.weather-card {
  width: 320px;
  height: 260px;
  border-radius: var(--radius);
  background: linear-gradient(160deg, var(--grad-start), var(--grad-end));
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 0.5px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeIn 0.8s ease-out;
  color: var(--text-strong);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 云层漂移动画 */
.cloud {
  position: absolute;
  top: 10%;
  left: -40%;
  width: 180%;
  height: 60%;
  background:
    radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.25), transparent 70%),
    radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.18), transparent 70%);
  filter: blur(40px);
  animation: cloudMove 60s linear infinite;
  z-index: 0;
}

@keyframes cloudMove {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(40%);
  }
}

.top {
  display: flex;
  justify-content: space-between;
  font-size: 36px;
  color: var(--text-subtle);
  position: relative;
  z-index: 1;
}
.top2 {
  font-size: 20px;
  color: var(--text-subtle);
}
.mid {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 1;
}

.temp-now {
  font-size: 90px;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 16px;
  gap: 4px;
  color: var(--text-subtle);
}

.desc {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-strong);
}
</style>
