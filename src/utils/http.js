import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import qs from 'qs'
import { Toast } from 'mint-ui'
Vue.component(Toast.name, Toast)

// let instance = Toast('数据获取失败')
axios.defaults.withCredentials = true
axios.defaults.timeout = 50 * 1000

// 设置http响应头
axios.defaults.headers.post = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

// 替换自己的接口地址
const baseURL = 'http://106.12.209.233:8082'


axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

// 请求响应拦截 （自己根据实际情况，做一下错误提示的弹窗Toast('数据获取失败')）
function checkStatus(response) {
  if (response) {
    if (response.data) {
      return response.data.data
    } else {
      return response.data
    }
  } else if (response === undefined) {

  } else {
    const status = {
      code: response.status,
    }
    return {
      status: status
    }
  }
}

function checkCode(res) {
  if ((res && res.status) || (res && res.respcode === '0004')) {

    return false
  } else if (res && res.respcode === '0002') {

    return
  }
  return res
}

export default {
  post(url, data = {}) {
    let postdata = data
    postdata.token = 'a3b9efeddeda4c2b8134505b88e08def'
    return axios({
      method: 'post',
      baseURL: baseURL,
      url,
      data: qs.stringify(data),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
      return checkStatus(response)
    }
  ).then(
      (res) => {
      return checkCode(res)
    }
  )
  },
  get(url, params) {
    return axios({
      method: 'get',
      baseURL: baseURL,
      url,
      params, // get 请求时带的参数
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
      return checkStatus(response)
    }
  ).then(
      (res) => {
      return checkCode(res)
    }
  )
  }
}
