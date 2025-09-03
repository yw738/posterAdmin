import { defineStore } from 'pinia'

const useRouteStore = defineStore('route', {
  state: () => ({
    meunlist: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页',
          icon: 'homepage',
          affix: true
        }
      },
      {
        path: '/manage',
        meta: {
          title: '设置',
          icon: 'security',
          hidden: false,
          alwaysShow: true
        },
        children: [
          {
            path: 'sethome',
            name: 'sethome',
            meta: {
              title: '首页设置'
            }
          },
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
  }),
  actions: {
    async RESET_STATE() {
      this.$reset()
    }
  }
})

export default useRouteStore
