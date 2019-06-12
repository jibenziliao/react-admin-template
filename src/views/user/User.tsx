import React, { useState, useEffect } from 'react'
import { Table, notification, Divider, Modal } from 'antd'
import { requestFn } from '../../utils/request'
import { useDispatch } from '../../store/Store'
import { Dispatch } from 'redux'
import Actions from '../../store/Actions'
import UserModal from './UserModal'
import { IUserForm } from '../../modal/userForm'
import { IPage } from '../../modal/page'
import moment from 'moment'
import styles from './User.module.less'
import {
  SearchComponent,
  IParams
} from '../../components/search/SearchComponent'
import UserViewModal from './UserViewModal'
import { ActionBar, IButton } from '../../components/actionBar/ActionBar'

/**
 * 默认用户表单
 */
const defaultUserForm: IUserForm = {
  id: '',
  name: '',
  birthDay: moment().format('YYYY-MM-DD HH:mm:ss'),
  city: ''
}

/**
 * 默认页面参数
 */
const defaultPageParams: IPage = {
  number: 0,
  size: 10,
  total: 500,
  name: ''
}

/**
 * 用户管理页面
 */
const User = () => {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [userForm, setUserForm] = useState(defaultUserForm)
  const [modalTitle, setModalTitle] = useState('新增用户')
  const [viewUserModal, setViewUserModal] = useState(false)
  const [pageParams, setPageParams] = useState(defaultPageParams)
  const dispatch: Dispatch<Actions> = useDispatch()
  const [data, setData] = useState([])

  /**
   * Table组件参数
   */
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '14%'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '14%'
    },
    {
      title: '生日',
      dataIndex: 'birthDay',
      key: 'birthDay',
      width: '20%'
    },
    {
      title: '住址',
      dataIndex: 'city',
      key: 'city'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '14%',
      // @ts-ignore
      render: (text: string, record: any) => (
        <div>
          <span
            className={`${styles.textButton} ${styles.viewButton}`}
            onClick={() => viewUser(record)}>
            查看
          </span>
          <Divider type="vertical" />
          <span className={`${styles.textButton} ${styles.editButton}`} onClick={() => editUser(record)}>
            编辑
          </span>
          <Divider type="vertical" />
          <span
            className={`${styles.textButton} ${styles.deleteButton}`}
            onClick={() => deleteConirm(record)}>
            删除
          </span>
        </div>
      )
    }
  ]

  /**
   * ActionBar组件参数
   */
  const buttons: IButton[] = [
    {
      text: '新增',
      icon: 'plus-circle',
      disabled: false,
      onClick: () => addUser()
    }
  ]

  useEffect(() => {
    /**
     * 获取用户列表
     */
    const getUsers = async (param: any) => {
      setLoading(true)
      const res = await requestFn(dispatch, {
        url: '/v1/users',
        method: 'get',
        params: {
          number: param.number,
          size: param.size,
          ...(param.name ? { name: param.name } : {})
        }
      })
      setLoading(false)
      if (res && res.status === 200 && res.data) {
        setData(res.data.users)
      }
    }
    getUsers(pageParams)
  }, [pageParams, dispatch])

  /**
   * 点击查询
   */
  const search = (searchParams: IParams) => {
    setPageParams({
      ...pageParams,
      number: 0,
      size: 10,
      name: searchParams.name
    })
  }

  /**
   * 重置搜索(重置搜索条件、页码)
   */
  const resetList = () => {
    setPageParams(defaultPageParams)
  }

  /**
   * 新增/编辑用户请求
   */
  const saveUsers = async (param: IUserForm) => {
    setLoading(true)
    const { id, ...others } = param
    const res = await requestFn(dispatch, {
      url: param.id ? `/v1/users/${param.id}` : '/v1/users',
      method: param.id ? 'patch' : 'post',
      data: {
        ...others
      }
    })
    setLoading(false)
    if (res && res.status === 200 && res.data) {
      successTips(param.id ? '编辑用户成功' : '新增用户成功', '')
      setPageParams({ ...pageParams, number: 0, size: 10, name: '' })
    } else {
      errorTips(
        param.id ? '编辑用户失败' : '新增用户失败',
        res && res.data && res.data.msg ? res.data.msg : '网络异常，请重试！'
      )
    }
  }

  /**
   * 查看用户
   */
  const viewUser = (item: IUserForm) => {
    setUserForm(item)
    setViewUserModal(true)
  }

  /**
   * 编辑用户
   */
  const editUser = (item: IUserForm) => {
    setUserForm(item)
    setModalTitle('编辑用户')
    setVisible(true)
  }

  const deleteConirm = (item: IUserForm) => {
    Modal.confirm({
      title: '确定要删除这条记录吗?',
      content: '删除后不可恢复',
      onOk() {
        deleteUser(item.id)
      },
      onCancel() {
        // do nothing...
      }
    })
  }

  /**
   * 删除用户请求
   */
  const deleteUser = async (id: string) => {
    setLoading(true)
    const res = await requestFn(dispatch, {
      url: `/v1/users/${id}`,
      method: 'delete'
    })
    if (res && res.status === 204 && res.data) {
      successTips('删除用户成功')
      setPageParams({ ...pageParams, number: 0, size: 10, name: '' })
    } else {
      setLoading(false)
      errorTips(
        '删除用户失败',
        res && res.data && res.data.msg ? res.data.msg : '网络异常，请重试！'
      )
    }
  }

  /**
   * 失败提示
   */
  const errorTips = (message = '', description = '') => {
    notification.error({
      message,
      description
    })
  }

  /**
   * 成功提示
   */
  const successTips = (message = '', description = '') => {
    notification.success({
      message,
      description
    })
  }

  /**
   * 编辑用户模态窗点击取消
   */
  const handleCancel = () => {
    setVisible(false)
  }

  /**
   * 新增/编辑用户模态窗，点击确定
   */
  const handleSubmit = (params: IUserForm) => {
    handleCancel()
    saveUsers(params)
  }

  /**
   * 新增用户
   */
  const addUser = () => {
    setUserForm(defaultUserForm)
    setVisible(true)
  }

  /**
   * 列表翻页
   */
  // @ts-ignore
  const onPageChange = (pageNumber: number, size: number | undefined) => {
    const params = {
      ...pageParams,
      number: pageNumber - 1
    }
    setPageParams(params)
  }

  return (
    <>
      <SearchComponent onSearch={search} reset={resetList} />
      <ActionBar buttons={buttons}/>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          showQuickJumper: true,
          defaultCurrent: 1,
          current: pageParams.number + 1,
          total: pageParams.total,
          pageSize: pageParams.size,
          showTotal: (dataCount) => `共 ${dataCount} 条数据`,
          onChange: onPageChange
        }}
      />
      <UserModal
        visible={visible}
        title={modalTitle}
        property={userForm}
        cancel={handleCancel}
        submit={handleSubmit}
      />
      <UserViewModal
        visible={viewUserModal}
        title="查看"
        property={userForm}
        close={() => setViewUserModal(false)}
      />
    </>
  )
}

export default User
