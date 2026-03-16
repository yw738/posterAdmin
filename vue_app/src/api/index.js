import { get, post, getFile, postFile, postJsonFile, put, del } from '@/api/public.js'

export const mainApi = {
  getList: (data) => get(`/api/RelatedData/GetExchangeRateList`, data), //
  getTax: (data) => get(`/api/RelatedData/GetTaxRateList`, data) //
}
