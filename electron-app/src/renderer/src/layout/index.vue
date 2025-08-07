<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': true }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup lang="js">
import { computed, watchEffect } from 'vue'
import { AppMain, Navbar } from './components/index'
import Sidebar from './components/Sidebar/index.vue'

const classObj = computed(() => ({
  hideSidebar: false,
  openSidebar: true,
  withoutAnimation: false
}))

watchEffect(() => {})
</script>

<style lang="scss" scoped>
@use './../styles/mixin.scss' as *;
@use './../styles/variables.module.scss' as *;

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: #F0F2F5;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
