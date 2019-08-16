import React, { useState } from 'react'
import { Layout, Menu, Icon, Row, Col } from 'antd'
import { Router, Route, Link, withRouter, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import routes from './routers/Router'
import LogoutButton from './components/logout/LogoutButton'
import Login from './views/login/Login'
import './App.less'
import { getStore } from './utils/util'

const { Header, Sider, Content } = Layout

const SubMenu = Menu.SubMenu

const history = createBrowserHistory()

/**
 * 自定义侧边栏接口类型
 */
interface CustomSiderProps extends RouteComponentProps {
  collapsed: boolean
}

/**
 * 自定义侧边栏
 */
const CustomSider = (props: CustomSiderProps) => {
  /**
   * 渲染二级菜单
   */
  const renderSubmenu = () => {
    return routes.map(router => {
      if (!router.hidden && router.hasMenu) {
        if (router.children && router.children.length > 0) {
          return (
            <SubMenu
              key={router.path}
              title={
                <span>
                  <Icon type="reconciliation" />
                  <span>{router.name}</span>
                </span>
              }
            >
              {router.children.map(item => {
                return (
                  <Menu.Item key={item.path}>
                    <Link to={item.path}>
                      <span>{item.name}</span>
                    </Link>
                  </Menu.Item>
                )
              })}
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item key={router.path}>
              <Link to={router.path}>
                <Icon type={router.iconType} />
                <span>{router.name}</span>
              </Link>
            </Menu.Item>
          )
        }
      } else {
        return false
      }
    })
  }

  return (
    <>
      <Sider trigger={null} collapsible collapsed={props.collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[props.location.pathname]}
          defaultOpenKeys={[`/${props.location.pathname.split('/')[1]}`]}
        >
          {renderSubmenu()}
        </Menu>
      </Sider>
    </>
  )
}

/**
 * 左侧侧边栏
 */
const LeftSlider = withRouter(CustomSider)

const HasMenu = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const token = getStore('token')

  /**
   * 渲染页面主体内容,缓存中无token,则跳转登录页
   */
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
        <LeftSlider collapsed={collapsed} />
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
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 'initial'
            }}
          >
            {renderContent()}
          </Content>
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
          <Route path={'/login'} key={'/login'} component={Login} />
          <HasMenu />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
