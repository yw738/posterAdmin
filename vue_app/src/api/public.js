import request from '@/utils/request'
/**
 * # 公共文件
 * 定义请求类型
 */

// get
export const get = (url, data = {}) =>
  request({
    url: url,
    method: 'get',
    params: data
  })

// post
export const post = (url, data = {}) =>
  request({
    url: url,
    method: 'post',
    data
  })
// postFile
export const postFile = (url, data = {}) =>
  request({
    url: url,
    method: 'post',
    // responseType: 'blob',
    customContentType: 'multipart/form-data',
    data
  })
export const postJsonFile = (url, data = {}) =>
  request({
    url: url,
    method: 'post',
    responseType: 'blob',
    data
  })
// put
export const put = (url, data = {}) =>
  request({
    url: url,
    method: 'put',
    data
  })
// put
export const putFile = (url, data = {}) =>
  request({
    url: url,
    method: 'put',
    responseType: 'blob',
    data
  })

// del
export const del = (url, data = {}) =>
  request({
    url: url,
    method: 'delete',
    data
  })

//get 下载文件
export const getFile = (url, data = {}) =>
  request({
    url: url,
    method: 'get',
    params: data,
    responseType: 'blob'
  })
