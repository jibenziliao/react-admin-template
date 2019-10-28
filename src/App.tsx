import React, { useState } from 'react'
import { Layout, Icon, Row, Col } from 'antd'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import routes from './routers/Router'
import LogoutButton from './components/logout/LogoutButton'
import Login from './views/login/Login'
import styles from './App.module.less'
import './App.less'
import { getStore } from './utils/util'
import SideMenu from './components/menu/SideMenu'
import BreadCrumb from './components/breadCrumb/BreadCrumb'

const { Header, Content } = Layout

const history = createBrowserHistory()

/** 子路由，但不在菜单中显示的页面，需要父级路由高亮 */
const highLightMenuRouter: string[] = []

/** 全局面包屑对应的url与名字集合 */
const breadcrumbNameMap: { [key: string]: string } = {
  '/': '首页',
  '/logs': '日志管理',
  '/logs/userLog': '用户日志',
  '/user': '用户管理'
}

const HasMenu = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const token = getStore('token')

  /** 渲染页面主体内容,缓存中无token,则跳转登录页 */
  const renderContent = () => {
    return routes.map(router => {
      if (!router.hidden) {
        if (router.children && router.children.length > 0) {
          return router.children.map(item => <Route path={item.path} key={item.path} component={item.component} />)
        } else {
          return <Route path={router.path} key={router.path} exact={router.exact} component={router.component} />
        }
      } else {
        return false
      }
    })
  }

  if (token) {
    return (
      <>
        <SideMenu collapsed={collapsed} highLightRoutes={highLightMenuRouter} title="xx系统v1.0" />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row>
              <Col span={8}>
                <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
              </Col>
              <Col span={8} offset={8} className="logout-button-wrapper">
                <LogoutButton />
              </Col>
            </Row>
          </Header>
          <div className={styles.breadcrumbContainer}>
            <BreadCrumb breadcrumbNameMap={breadcrumbNameMap} />
          </div>
          <Content className={styles.container}>{renderContent()}</Content>
          <div className="globalCopyRight">Copyright&nbsp;&copy;&nbsp;畅云时讯&nbsp;2016-2019</div>
        </Layout>
      </>
    )
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: history.location.pathname }
        }}
      />
    )
  }
}

export const App = () => {
  return (
    <Router history={history}>
      <Layout className="page-layout">
        <Switch>
          <Route path={'/logs'} exact={true} render={() => <Redirect to="/logs/userLog" />} />
          <Route path={'/login'} key={'/login'} component={Login} />
          <HasMenu />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
