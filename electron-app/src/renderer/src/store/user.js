import { defineStore } from 'pinia'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token'),
    userInfo: {} //用户信息
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
      return new Promise((resolve, reject) => {
        fetch('https://scswoker.yff738751286.workers.dev/api/login', {
          method: 'POST', // 或 POST、PUT 等
          headers: {
            'Content-Type': 'application/json' // 根据需要添加
          },
          body: JSON.stringify({ username: username, password: password })
        })
          .then((response) => response.json())
          .then((response) => {
            const { token, success, message } = response
            if (success) {
              window.localStorage.setItem('token', token)
              this.token = token
              resolve()
            } else {
              ElMessage.error(message)
              reject()
            }
          })
          .catch((error) => console.error('Error:', error))
      })
    },
    init() {
      return new Promise((resolve, reject) => {
        fetch('https://scswoker.yff738751286.workers.dev/api/sites', {
          method: 'GET', // 或 POST、PUT 等
          headers: {
            'Content-Type': 'application/json' // 根据需要添加
          }
        })
          .then((response) => response.json())
          .then((response) => {
            const { data = [] } = response
            resolve(data[0])
          })
          .catch((error) => console.error('Error:', error))
      })
    },
    edit(params) {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token') // 假设 token 存在 localStorage 中
        if (!token) {
          reject()
          return
        }

        fetch('https://scswoker.yff738751286.workers.dev/api/update', {
          method: 'POST', // 或 POST、PUT 等
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' // 根据需要添加
          },
          body: JSON.stringify(params)
        })
          .then((response) => response.json())
          .then((response) => {
            const { data } = response
            resolve(data)
          })
          .catch((error) => console.error('Error:', error))
      })
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
        this.userInfo = {}
        // this.RESET_STATE();
        resolve(null)
      })
    }
  }
})
