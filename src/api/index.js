import config from '../config'
import axios from 'axios'
import { getGamesCache } from '@/utils'
// import qs from 'qs'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// config
axios.interceptors.request.use(config => {
  let params = JSON.parse(config.data || "{}");
  config.data = JSON.stringify({
    oid: sessionStorage.getItem("im_token"),
    ...params
  });
  return config
}, error => {
  return Promise.reject(error)
})

// response 处理
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error)
})

// 检查请求状态
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    // error.response = response.response
    // const error = new Error(response.statusText)
    return response.response
  }
}
// check code
const checkCode = (response) => {
  if (response.status === 500) {
  } else if (response.status === 422) {
  }
  return response
}

// 解析参数
function _formatParams (method = 'GET', params) {
  const headers = {
    // 'Content-Type': 'application/json'
  }
  switch (method) {
    case 'POST':
    case 'PUT':
      return {
        headers,
        method,
        timeout: config.timeout,
        data: JSON.stringify(params)
      }
    case 'DELETE':
      return {
        headers,
        method,
        timeout: config.timeout
      }
    case 'GET':
      return {
        headers,
        timeout: config.timeout
      }
    default:
      return {
        headers,
        timeout: config.timeout
      }
  }
}

export default {
  getOddsList (params) {
    const cache = getGamesCache(`${params.game_code}_${params.type_code}`)
    // if (cache) {
    //   return Promise.resolve(cache)
    // }
    return axios(Object.assign({}, _formatParams('POST', params), {
      url: `${getUrl()}/getinfo/odds`
    })).then(checkStatus).then(checkCode)
  },
}

export const getLuzhuData = (params) => axios.post(`${getUrl()}/systems/luzhu`, JSON.stringify(params));
export const getMgGameLink = (params) => axios.post(`${getUrl()}/externalGame/loading`, JSON.stringify(params));
