import React from 'react'
import { Row, Col, Modal, Button } from 'antd'
import styles from './UserViewModal.module.less'
import { IUserForm } from '../../modal/userForm'

/**
 * 查看用户模态窗接口
 */
interface IUserViewModalProps {
  title: string
  visible: boolean
  property: IUserForm
  close: () => void
}

/**
 * 查看用户模态窗组件
 */
const UserViewModal = (props: IUserViewModalProps) => {
  const handleClick = () => {
    props.close()
  }

  const renderFooter = () => {
    return (
      <Row>
        <Col>
          <Button type="primary" onClick={handleClick}>
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
      <Row>
        <Col span={6} className={styles.label}>
          id：
        </Col>
        <Col span={12}>{props.property.id}</Col>
      </Row>
      <Row className={styles.rowItem}>
        <Col span={6} className={styles.label}>
          姓名：
        </Col>
        <Col span={12}>{props.property.name}</Col>
      </Row>
      <Row className={styles.rowItem}>
        <Col span={6} className={styles.label}>
          生日：
        </Col>
        <Col span={12}>{props.property.birthDay}</Col>
      </Row>
      <Row className={styles.rowItem}>
        <Col span={6} className={styles.label}>
          住址：
        </Col>
        <Col span={12}>{props.property.city}</Col>
      </Row>
    </Modal>
  )
}

export default UserViewModal
