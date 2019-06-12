import Home from '../views/home/Home'
import User from '../views/user/User'
import UserLog from '../views/logs/userLog/UserLog'

const routes = [
  {
    component: Home,
    path: '/',
    exact: true,
    iconType: 'dashboard',
    name: '首页',
    hasMenu: true,
    hidden: false
  },
  {
    component: UserLog,
    path: '/logs',
    iconType: 'reconciliation',
    name: '日志管理',
    hasMenu: true,
    hidden: false,
    children: [
      {
        component: UserLog,
        path: '/logs/userLog',
        name: '用户日志',
        hasMenu: true,
        hidden: false
      }
    ]
  },
  {
    component: User,
    path: '/user',
    iconType: 'user',
    name: '用户管理',
    hasMenu: true,
    hidden: false
  }
]

export default routes
