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
    templateType: 'cn',

    // =============================

    setHomeData: {
      id: 1,
      title_cn: '旭森智造工业互联(深圳)有限公司',
      title_en: 'Success Circuits Group Limited',
      is_welcome: 0,
      welcome_cn: '欢迎君得(深圳)科技有限公司莅临参观',
      welcome_en: 'Welcome Mr. Zhang to our company',
      title_cn_size: 102,
      welcome_cn_size: 58,
      welcome_en_size: 55
    }
  }),
  actions: {}
})
