import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { makeStore, StoreContext } from './store/Store'
import * as serviceWorker from './serviceWorker'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
// tslint:disable-next-line:no-import-side-effect
import 'moment/locale/zh-cn'
import Mock from './mock/mock'

moment.locale('zh-cn')
// mock请求启动，若有接口，可注释此行。请求代理在package.json中proxy字段
Mock.bootstrap()

const store = makeStore()

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <LocaleProvider locale={zh_CN}>
      <App />
    </LocaleProvider>
  </StoreContext.Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
