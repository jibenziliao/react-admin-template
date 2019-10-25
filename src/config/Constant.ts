/** api请求地址 */
export const API_URL: string = process.env.NODE_ENV === 'development' ? '' : ''

/** 默认请求超时时间 */
export const REQUEST_TIME_OUT = 10000

/** mock请求延时 */
export const RESPONSE_DELAY = 1000
