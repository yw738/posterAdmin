import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    device: 'desktop',
    screenData: {
      logo: 'success_white',
      logoSize: 70,
      welcomeName: '热烈欢迎',
      welcomeNameSize: 130,

      title: '深圳某某有限公司莅临参观',
      titleSize: 106,
      bottomline: {
        txt1: '合作',
        txt2: '创新',
        txt3: '突破',
        txt4: '共赢'
      },
      bottom: {
        txtleft: '中国',
        txtright: '深圳'
      }
    },
    templateType: 'cn'
  }),
  actions: {}
})
