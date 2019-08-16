import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { makeStore, StoreContext } from './store/Store'
import App from './App'
import './index.css'
import Mock from './mock/mock'
import * as serviceWorker from './serviceWorker'

moment.locale('zh-cn')
// mock请求启动，若有接口，可注释此行。请求代理在package.json中proxy字段
Mock.bootstrap()

const store = makeStore()

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </StoreContext.Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
