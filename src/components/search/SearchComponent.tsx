import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import styles from './SearchComponent.module.less'

const { Option } = Select

/** 搜索组件onSearch方法参数类型 */
export interface Params {
  [key: string]: string
}

interface SelectOption {
  label: string
  value: string
}

interface SelectItem {
  field: string
  mode?: 'multiple' | null
  placeholder?: string
  options: SelectOption[]
}

interface KeywordsProps {
  field: string
  placeholder?: string
}

export interface SelectProps {
  keywords: KeywordsProps[]
  select?: SelectItem[]
}

/** 搜索组件接口 */
interface SearchProps extends FormComponentProps {
  onSearch: (fields: Params) => void
  reset: () => void
  options: SelectProps
}

const FormComponent = (props: SearchProps) => {
  const { getFieldDecorator, getFieldsValue, resetFields } = props.form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fieldVlue = getFieldsValue(handleSubmitParams())
    props.onSearch(fieldVlue)
  }

  /** 处理搜索组件提交时的参数 */
  const handleSubmitParams = () => {
    const keywordParams = props.options.keywords.map(i => i.field) || []
    const selectParams = props.options?.select?.map(i => i.field) || []
    return [...keywordParams, ...selectParams]
  }

  /** 重置表单 */
  const handleReset = () => {
    resetFields()
    props.reset()
  }

  /** 渲染常规搜索组件单元 */
  const renderSearchItems = () => {
    return props.options.keywords.map(i => {
      return (
        <Form.Item key={i.field}>
          {getFieldDecorator(i.field, {})(<Input placeholder={i?.placeholder || '请输入关键字'} allowClear />)}
        </Form.Item>
      )
    })
  }

  const renderSelectItems = () => {
    return props.options.select?.map((i, index) => {
      const renderOptions = (options: SelectOption[]) => {
        return options.map(i => {
          return <Option key={i.value}>{i.label}</Option>
        })
      }
      return (
        <Form.Item key={index}>
          {getFieldDecorator(
            i.field,
            {}
          )(
            <Select
              allowClear
              {...(i?.mode ? { mode: i.mode } : {})}
              style={{ minWidth: 190 }}
              placeholder={i?.placeholder || '请选择筛选项'}>
              {renderOptions(i.options)}
            </Select>
          )}
        </Form.Item>
      )
    })
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      {renderSearchItems()}
      {renderSelectItems()}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button className={styles.ResetButotn} htmlType="reset" onClick={handleReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  )
}

/** 搜索组件 */
export const SearchComponent = Form.create<SearchProps>({ name: 'FormComponent' })(FormComponent)
