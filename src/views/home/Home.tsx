import React from 'react'
import { List, Typography } from 'antd'
import styles from './Home.module.less'

const data = ['搜索']

const plan = ['表单', '表格', '确认弹窗']

/** 首页 */
const Home = () => {
  return (
    <div>
      <List
        className={styles.List}
        header={<div>已完成组件</div>}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark>[已完成]</Typography.Text> {item}
          </List.Item>
        )}
      />
      <List
        className={styles.List}
        header={<div>计划中的组件</div>}
        bordered
        dataSource={plan}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark>[计划中]</Typography.Text> {item}
          </List.Item>
        )}
      />
    </div>
  )
}

export default Home
