import React from 'react'
import { Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const Logout = (props: RouteComponentProps) => {
  const handleLogout = () => {
    window.sessionStorage.clear()
    props.history.replace('/login')
  }

  return (
    <>
      <Button onClick={handleLogout}>退出登录</Button>
    </>
  )
}

/**
 * 注销按钮
 */
const LogoutButton = withRouter(Logout)

export default LogoutButton
