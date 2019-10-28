import React from 'react'
import { Breadcrumb } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { getUrlParam } from '../../utils/util'

interface BreadCrumbProps extends RouteComponentProps {
  /** 全局面包屑对应的url与名字集合 */
  breadcrumbNameMap: { [key: string]: string }
  /** 面包屑组件分隔符 */
  separator?: '-'
}

const BreadCrumbWithOutRouter = (props: BreadCrumbProps) => {
  const pathSnippets = props.location.pathname.split('/').filter((i: string) => i)

  /** 处理面包屑链接地址,向url中添加参数
   *
   * 带有参数的路由如下
   *
   * '/tasks/detail'
   *
   * '/tasks/edit'
   *
   * @example
   *
   * case '/tasks/detail':
   *   return `/tasks/detail?id=${getUrlParam('id') || '0'}`
   * case '/tasks/edit':
   *   return `/tasks/edit?id=${getUrlParam('id') || 0}`
   * default:
   *   return url
   */
  const handleSpecialUrl = (url: string) => {
    switch (url) {
      case '/tasks/detail':
        return `/tasks/detail?id=${getUrlParam('id') || '0'}`
      case '/tasks/edit':
        return `/tasks/edit?id=${getUrlParam('id') || 0}`
      default:
        return url
    }
  }

  /** 全局面包屑组件 */
  const breadcrumbItems = () => {
    if (pathSnippets.length > 0) {
      return pathSnippets.map((_: string, index: number) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        return (
          <Breadcrumb.Item key={url}>
            <Link to={handleSpecialUrl(url)} replace={props.location.pathname === url}>
              {props.breadcrumbNameMap[url]}
            </Link>
          </Breadcrumb.Item>
        )
      })
    } else {
      return (
        <Breadcrumb.Item key={'/'}>
          <Link to={'/'} replace={true}>
            首页
          </Link>
        </Breadcrumb.Item>
      )
    }
  }
  return <Breadcrumb separator={props.separator}>{breadcrumbItems()}</Breadcrumb>
}

const BreadCrumb = withRouter(BreadCrumbWithOutRouter)

export default BreadCrumb
