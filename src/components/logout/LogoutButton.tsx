import React from 'react'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'

const Logout = (props: any) => {
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

const LogoutButton = withRouter(Logout)

export default LogoutButton
