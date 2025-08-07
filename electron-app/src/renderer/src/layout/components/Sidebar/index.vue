<template>
  <div :class="{ 'has-logo': true }">
    <logo :collapse="true" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :item="route"
          :key="route.path"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="js">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'
import variables from './../../../styles/variables.module.scss'

const route = useRoute()
let routes = [
  {
    path: '/',
    redirect: '/dashboard',
    isOpen: true
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    roleId: 'crm',
    meta: {
      title: '系统首页',
      icon: 'homepage',
      affix: true
    }
  },
  {
    path: '/manage',
    meta: {
      title: '海报设置',
      icon: 'security',
      hidden: false,
      alwaysShow: true
    },
    children: [
      // {
      //   path: 'setting',
      //   name: 'setting',
      //   meta: {
      //     title: '生成列表'
      //   }
      // },
      {
        path: 'addPoster',
        name: 'addPoster',
        meta: {
          title: '生成海报'
        }
      }
    ]
  }
]
const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }

  console.log(path)
  return path
})
</script>
