import React from 'react'
import { Button } from 'antd'
import styles from './ActionBar.module.less'

/** ActionBar组件参数接口 */
export interface ButtonProps {
  icon: string
  text: string
  disabled: boolean
  onClick: () => void
}

/** ActionBar组件参数接口 */
interface Props {
  buttons: ButtonProps[]
}

/** 操作栏组件 */
const ActionBar = (props: Props) => {
  /** 渲染操作栏按钮组 */
  const renderButtons = () => {
    return props.buttons.map((i: ButtonProps, index: number) => {
      return (
        <Button key={index} type="primary" ghost disabled={i.disabled} icon={i.icon} onClick={i.onClick}>
          {i.text}
        </Button>
      )
    })
  }
  return <div className={styles.ButtonOptions}>{renderButtons()}</div>
}

export { ActionBar }
