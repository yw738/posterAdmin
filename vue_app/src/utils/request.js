import axios from 'axios'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

let needLoadingRequestCount = 0

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) endLoading()
}

let loading

function startLoading() {
  loading = ElLoading.service({
    lock: true,
    text: '加载中......',
    background: 'rgba(0, 0, 0, 0.1)'
  })
}

function endLoading() {
  loading.close()
}

let BASE_URL = `http://localhost:8083`

// 创建 axios 实例
const service = axios.create({
  baseURL: BASE_URL,
  // timeout: 50000,//毫秒
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 请求拦截器
service.interceptors.request.use(
  async (config) => {
    // return config;
    showFullScreenLoading()

    return config
  },
  (error) => {
    tryHideFullScreenLoading()
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  async (response) => {
    // if (response.config.responseType == 'blob') {
    //   debugger
    //   return response;
    // }
    tryHideFullScreenLoading()
    return response.data
  },
  (error) => {
    let code = error?.response?.status
    tryHideFullScreenLoading()
    // const { code, msg } = error?.response?.data || {};
    if (code == '401' || code == '403') {
      // token 过期
      toLogin()
    } else {
      ElMessage.error(error.message)
    }

    return Promise.reject(error)
  }
)

// import { getDbData } from '@/mockApi/index.js';
// async function mockRequest(config) {
//   let data = getDbData(config);
//   return Promise.resolve(data);
// }
// export default mockRequest;

// 导出 axios 实例
export default service
