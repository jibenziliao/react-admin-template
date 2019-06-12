import axios, { ResponseType, Method, AxiosPromise } from 'axios'
import { API_URL, REQUEST_TIME_OUT } from '../config/Constant'
import Qs from 'qs'
import Actions from '../store/Actions'
import { Dispatch } from 'redux'
import { setStore, getStore, removeAllStore } from './util'
import { Modal } from 'antd'

/**
 * token过期错误提示次数(token过期时，一个页面可能会有多次请求，只显示第一次的错误提示)
 */
let expiredCount = 0

/**
 * requestFn参数接口类型
 */
export interface IParams {
  url: string
  method?: Method
  params?: object
  data?: object | any
  responseType?: ResponseType
}

/**
 * token过期处理
 */
const tokenExpired = () => {
  if (!expiredCount) {
    expiredCount += 1
    Modal.error({
      title: '你的登录信息已过期',
      content: '因长时间未操作，你的登录信息已过期，点击确定重新登录。',
      okText: '确定',
      onOk: () => {
        removeAllStore()
        window.location.reload()
      }
    })
  }
}

/**
 * 通用网络请求
 */
export const requestFn = (
  dispatch: Dispatch<Actions>,
  params: IParams
): AxiosPromise => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: 'fetch_begin',
      payload: {
        pageLoading: true
      }
    })
    axios.interceptors.response.use(
      (response) => {
        if (
          response &&
          response.status === 200 &&
          response.data &&
          response.data.token
        ) {
          axios.defaults.headers.common.Authorization = `Bearer ${
            response.data.token
          }`
          setStore('token', response.data.token)
        }
        return response
      },
      (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.request.responseURL.indexOf('/v1/login') === -1
        ) {
          tokenExpired()
          return reject(error)
        } else {
          return resolve(error)
        }
      }
    )
    axios
      .request({
        url: params.url,
        method: params.method || 'get',
        baseURL: `${API_URL}/api`,
        params: params.params || {},
        paramsSerializer: (arg) => {
          // https://github.com/ljharb/qs
          // https://blog.csdn.net/pifutan/article/details/86320705
          return Qs.stringify(arg, { arrayFormat: 'repeat' })
        },
        headers: {
          ...(getStore('token')
            ? { Authorization: `Bearer ${getStore('token')}` }
            : {}),
          // 某些请求data直接是数组或字符串，这里需要改变Content-Type值
          ...(params.data && typeof params.data === 'string'
            ? { 'Content-Type': 'text/uri-list' }
            : {})
        },
        data:
          params.data && typeof params.data === 'string'
            ? params.data
            : {
                ...(params.data || {})
              },
        timeout: REQUEST_TIME_OUT,
        validateStatus: (status) => {
          // 除了401错误，所有响应码都接受，每个请求错误单独处理。
          return status !== 401
        },
        responseType: params.responseType || 'json'
      })
      .then((res) => {
        dispatch({
          type: 'fetch_success',
          payload: {
            res,
            pageLoading: false
          }
        })
        resolve(res)
      })
      .catch((err) => {
        dispatch({
          type: 'fetch_failed',
          payload: {
            res: err,
            pageLoading: false
          }
        })
        reject(err)
      })
  })
}
