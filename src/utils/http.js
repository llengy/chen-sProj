import axios from 'axios'
import router from '../router'
import apiUrl from './api'
import qs from 'qs'

// const API = window.location.host === 'yqjsc.faw.cn' ? 'http://yqjsc.faw.cn/' : 'http://10.6.201.50:3690/'
  // const API = 'http://yqjsc.faw.cn/'
  // const API = 'http://localhost:8080/'
  // const API = 'http://10.6.201.50:8088/' // 权限测试

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = apiUrl.baseURL


// const USERINFO = store.getters.userInfo




axios.defaults.withCredentials = true
axios.defaults.timeout = 50 * 1000

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

function checkStatus(response) {
  if (response && response.status === 200) {
    if (response.data.respcode === '0000') {
      return response.data.data
    } else {
      return response.data
    }
  } else if (response === undefined) {
    store.commit('dialogStatus', {
      val: true,
      msg: '网络请求超时，请检查网络设置并刷新重试',
      code: '1001'
    })
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
  // 如果code异常
  // console.log(res)
  if ((res && res.status) || (res && res.respcode === '0004')) {
    store.commit('dialogStatus', {
      val: true,
      msg: '系统错误，请稍后再试'
    })
    return false
  }
  // else if (res && res.respcode === '0004') {
  //   // system error
  //   store.commit('dialogStatus', {
  //     val: true,
  //     msg: '系统错误，请稍后再试',
  //   })
  //   return false
  // } 
  else if (res && res.respcode === '0002') {
    // invalid token
    store.commit('dialogStatus', {
      val: true,
      msg: '登录已失效，请重新登录',
      code: res.respcode
    })
    return
  }
  return res
}

 export default axios // 这句千万不能漏下！！！
/**
 * post 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data))
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
/**
 * get 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: data})
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

// export default {
//   post(url, data = {}) {
//     store.commit('loadingStatus', true)
//     let postdata = data
//     postdata.token = localStorage.getItem('token') //USERINFO.token || '1234'
//     return axios({
//       method: 'post',
//       baseURL: API,
//       url,
//       data: qs.stringify(data),
//       headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//       }
//     }).then(
//       (response) => {
//         store.commit('loadingStatus', false)
//         return checkStatus(response)
//       }
//     ).then(
//       (res) => {
//         // setTimeout(() => {
//         store.commit('loadingStatus', false)
//           // }, 1500)
//         return checkCode(res)
//       }
//     )
//   },
//   get(url, params) {
//     return axios({
//       method: 'get',
//       baseURL: API,
//       url,
//       params, // get 请求时带的参数
//       headers: {
//         'X-Requested-With': 'XMLHttpRequest'
//       }
//     }).then(
//       (response) => {
//         return checkStatus(response)
//       }
//     ).then(
//       (res) => {
//         return checkCode(res)
//       }
//     )
//   },
//   API,
//   USERINFO
// }
