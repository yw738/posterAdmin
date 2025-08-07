import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    refreshToken: jsCookie.get('refreshToken') || '',
    nickname: '',
    userId: '',
    avatar: '',
    roles: [],
    perms: [],
    userInfo: {}, //用户信息
    // userLevel: null as any,//crm 的用户级别 1 => 个人 ， 2=> 所属部门及其他
    userLevel: 2 //crm 的用户级别 1 => 个人 ， 2=> 所属部门及其他
  }),
  actions: {
    async RESET_STATE() {
      this.$reset()
    },
    /**
     * 用户登录请求
     * @param userInfo 登录用户信息
     *  username: 用户名
     *  password: 密码
    //  *  code: 验证码
    //  *  uuid: 匹配正确验证码的 key
     */
    login(userInfo = {}) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {})
    },
    /**
     *  用refreshToken 去换取新的 token
     *  然后更新
     */
    getRefreshToken() {
      return new Promise((resolve, reject) => {})
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise((resolve) => {
        this.token = ''
        this.refreshToken = ''
        this.userInfo = {}
        // this.RESET_STATE();
        resolve(null)
      })
    }
  }
})

export default useUserStore
