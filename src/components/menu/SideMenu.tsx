import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu, Icon, Layout } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../routers/Router'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

interface SideMenuProps extends RouteComponentProps {
  highLightRoutes: string[]
  collapsed: boolean
  title: string
}

/** 自定义左侧侧边栏 */
const CustomSider = (props: SideMenuProps) => {
  const renderSubmenu = () => {
    return routes.map(router => {
      if (!router.hidden && router.hasMenu) {
        if (router.children && router.children.length > 0) {
          return (
            <SubMenu
              key={router.path}
              title={
                <span>
                  <Icon type={router.iconType} />
                  <span>{router.name}</span>
                </span>
              }>
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

  /** 部分需要显示在菜单中的自己页面，需要左侧父级菜单高亮 */
  const handleHighLightMenu = (path: string) => {
    const index = path.lastIndexOf('/')
    const parent = path.substring(0, index)
    return props.highLightRoutes.includes(path) ? [parent] : [path]
  }

  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className={`globalLogo ${props.collapsed ? 'globalLogoTextHide' : 'globalLogoWithText'}`}>
        <span>{props.title}</span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[props.location.pathname]}
        selectedKeys={handleHighLightMenu(props.location.pathname)}
        defaultOpenKeys={[`/${props.location.pathname.split('/')[1]}`]}>
        {renderSubmenu()}
      </Menu>
    </Sider>
  )
}

/** 通用左侧菜单栏组件 */
const SideMenu = withRouter(CustomSider)

export default SideMenu
