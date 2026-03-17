import { defineStore } from 'pinia';

const useRouteStore = defineStore('route', {
  state: () => ({
    meunlist: [
      {
        path: '/addPoster',
        name: 'addPoster',
        meta: {
          title: '模板生成欢迎牌',
          icon: 'security',
          affix: true
        }
      },
       {
        path: '/cusSet',
        name: 'cusSet',
        meta: {
          title: '自定义欢迎牌',
          icon: 'security',
          affix: true
        }
      }
    ]
  }),
  actions: {
    async RESET_STATE() {
      this.$reset();
    }
  }
});

export default useRouteStore;
