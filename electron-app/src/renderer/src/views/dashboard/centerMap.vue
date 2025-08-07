<template>
  <div class="map">
    <div class="map1"><img src="@/assets/picture/lbx.png" /></div>
    <div class="map2"><img src="@/assets/picture/jt.png" /></div>
    <div class="map3"><img src="@/assets/picture/map.png" /></div>
    <!-- <div class="map4" id="map_1"></div> -->
  </div>
</template>

<style scoped>
@keyframes myfirst2 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-359deg);
  }
}

.map {
  /* position: relative; */
  height: 518px;
  width: 518px;
  z-index: 9;

  position: fixed;
  left: calc(50% - 260px);
  top: calc(50% - 260px);
}

.map1,
.map2,
.map3 {
  position: absolute;
  opacity: 0.5;
  transform-origin: center center;
}
.map1 {
  width: 140%;
  height: 140%;
  z-index: 2;
  top: -20%;
  left: -20%;
  animation: myfirst2 15s infinite linear;
  img {
    width: 100%;
    height: 100%;
  }
}
.map2 {
  width: 110%;
  height: 110%;
  top: -5%;
  left: -5%;
  z-index: 3;
  opacity: 0.2;
  animation: myfirst 10s infinite linear;
  img {
    width: 100%;
    height: 100%;
  }
}
.map3 {
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
