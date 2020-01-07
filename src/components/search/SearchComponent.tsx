import React from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import styles from './SearchComponent.module.less'

/** 搜索组件onSearch方法参数类型 */
export interface Params {
  name: string
}

/** 搜索组件接口 */
interface SearchProps extends FormComponentProps {
  onSearch: (fieldParams: Params) => void
  reset: () => void
}

const FormComponent = (props: SearchProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.onSearch(fieldParams)
  }

  const { getFieldDecorator, getFieldsValue, resetFields } = props.form

  const fieldVlue = getFieldsValue(['name'])

  const fieldParams = {
    name: fieldVlue.name || ''
  }

  /** 重置表单 */
  const handleReset = () => {
    resetFields()
    props.reset()
  }

  return (
    <>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>{getFieldDecorator('name', {})(<Input placeholder="请输入姓名" allowClear />)}</Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button className={styles.ResetButotn} htmlType="reset" onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

/**
 * 搜索组件
 */
export const SearchComponent = Form.create<SearchProps>({ name: 'FormComponent' })(FormComponent)
