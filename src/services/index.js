import { Api } from '@/services/api.js'
import { CONFIG } from '@/config.js'

export const limit = 10

export const api = new Api({
  baseUrl: `${CONFIG.API_HOST}/`,
  securityWorker: token => { headers: { authorization: `Bearer ${token}` } } ,
})
