import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/store/user.js';

const Layout = () => import('./../layout/index.vue');

const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/addPoster',
    meta: {
      title: '设置',
      icon: 'security',
      hidden: false,
      alwaysShow: true
    },
    children: [
      // {
      //   path: '/setting',
      //   component: () => import('./../views/setting/index.vue'),
      //   name: 'setting',
      //   meta: { title: '生成列表' }
      // },
      {
        path: '/addPoster',
        component: () => import('./../views/setting/addPoster.vue'),
        name: 'addPoster',
        meta: { title: '生成欢迎牌' }
      },
      {
        path: '/cusSet',
        component: () => import('./../views/customSet/index.vue'),
        name: 'cusSet',
        meta: { title: '自定义生成' }
      },
    ]
  }
];

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// 白名单路由
router.beforeEach(async (to, from, next) => {
  next();
  // const user = useUserStore();
  // const hasToken = user.token;
  // if (hasToken) {
  //   if (to.path == '/login') {
  //     next('/manage');
  //   } else {
  //     next();
  //   }
  // } else {
  //   const noGoArr = ['/login', '/dashboard'];
  //   // 登录成功，跳转到首页
  //   if (noGoArr.includes(to.path)) {
  //     next();
  //   } else {
  //     next('/login');
  //   }
  // }
});
export default router;
