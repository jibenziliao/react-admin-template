import React, { useState, useEffect } from 'react'
import { Row, Col, Modal, Button, Table } from 'antd'
import { IUser, IUserProperty } from '../../modal/user'

/**
 * 查看用户模态窗接口
 */
interface IUserViewModalProps {
  title: string
  visible: boolean
  property: IUser
  close: () => void
}

/**
 * 查看用户信息模态窗中的字段类型
 */
type IPropType = 'id' | 'name' | 'birthDay' | 'city'

/**
 * 用户信息字段字典
 */
const userPropertyDic = {
  id: 'id',
  name: '姓名',
  birthDay: '生日',
  city: '住址'
}

/**
 * 查看用户模态窗组件
 */
const UserViewModal = (props: IUserViewModalProps) => {
  const [userProps, setUserProps] = useState<IUserProperty[]>([])

  useEffect(() => {
    /**
     * 当props.property发生变化时，更新userProps
     */
    const initUserProps = (user: IUser) => {
      const entries: string[][] = Object.entries(user)
      const newProperties: IUserProperty[] = entries.map((i: string[]) => {
        return {
          key: userPropertyDic[i[0] as IPropType],
          value: i[1]
        }
      })
      setUserProps(newProperties)
    }

    if (props.visible) {
      initUserProps(props.property)
    }
  }, [props.property, props.visible])

  /**
   * 预览用户属性列表的列配置columns
   */
  const columns = [
    {
      title: '属性',
      dataIndex: 'key',
      key: 'key',
      width: 120
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value'
    }
  ]

  /**
   * 关闭模态窗
   */
  const closeModal = () => {
    props.close()
  }

  const renderFooter = () => {
    return (
      <Row>
        <Col>
          <Button type="primary" onClick={closeModal}>
            确定
          </Button>
        </Col>
      </Row>
    )
  }

  return (
    <Modal
      title={props.title}
      visible={props.visible}
      width={800}
      closable={false}
      footer={renderFooter()}>
      <Table
        bordered
        columns={columns}
        dataSource={userProps}
        pagination={false}
        size="small"
      />
    </Modal>
  )
}

export default UserViewModal
