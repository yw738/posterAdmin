<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <!-- <keep-alive :include="cachedViews"> -->
      <component :is="Component" :key="route.fullPath" />
      <!-- </keep-alive> -->
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    // min-height: calc(100vh - 84px);
    height: calc(100vh - 84px);
    overflow: auto;
    background: #f0f2f5;
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.content_box {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>
