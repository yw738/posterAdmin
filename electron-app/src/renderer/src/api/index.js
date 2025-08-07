import { get, post, getFile, postFile, postJsonFile, put, del } from '@/api/public.js'

export const mainApi = {
  getList: (data) => get(`/api/RelatedData/GetExchangeRateList`, data), //查询 汇率
  getTax: (data) => get(`/api/RelatedData/GetTaxRateList`, data) //查询 税率
}
