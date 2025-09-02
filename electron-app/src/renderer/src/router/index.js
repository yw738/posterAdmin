import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('./../layout/index.vue')

const constantRoutes = [
  {
    path: '/',
    redirect: '/manage'
  },

  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/addPoster',
    meta: {
      title: '设置',
      icon: 'security',
      hidden: false,
      alwaysShow: true
    },
    children: [
      {
        path: 'sethome',
        component: () => import('./../views/setting/index.vue'),
        name: 'sethome',
        meta: { title: '首页设置' }
      },
      {
        path: 'setting',
        component: () => import('./../views/setting/index.vue'),
        name: 'setting',
        meta: { title: '生成列表' }
      },
      {
        path: 'addPoster',
        component: () => import('./../views/setting/addPoster.vue'),
        name: 'addPoster',
        meta: { title: '生成海报' }
      }
    ]
  }
  // {
  //   path: '/dashboard',
  //   component: () => import('./../views/dashboard/index.vue'),
  //   name: 'dashboard',
  //   meta: { title: '系统首页' }
  // }
]

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
