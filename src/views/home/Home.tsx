import React, { useState, useEffect } from 'react'
import { Dispatch } from 'redux'
import { SearchComponent, Params, SelectProps } from '../../components/search/SearchComponent'
import Actions from '../../store/Actions'
import { useDispatch } from '../../store/Store'
import { requestFn } from '../../utils/request'

export interface PageParams {
  name: string
  address: string
  status1: string
  status2: string
  number: number
  size: number
}

const exampleOptions: SelectProps = {
  keywords: [
    { field: 'name', placeholder: '请输入姓名' },
    { field: 'address', placeholder: '请输入地址' }
  ],
  select: [
    {
      field: 'status1',
      placeholder: '请选择状态1',
      options: [
        {
          label: '未开始',
          value: '0'
        },
        {
          label: '已开始',
          value: '1'
        },
        {
          label: '已完成',
          value: '2'
        },
        {
          label: '异常',
          value: '3'
        }
      ]
    },
    {
      field: 'status2',
      mode: 'multiple',
      placeholder: '请选择状态2',
      options: [
        {
          label: '未开始',
          value: '0'
        },
        {
          label: '已开始',
          value: '1'
        },
        {
          label: '已完成',
          value: '2'
        },
        {
          label: '异常',
          value: '3'
        }
      ]
    }
  ]
}

const defaultPageParams: PageParams = {
  name: '',
  address: '',
  status1: '',
  status2: '',
  number: 1,
  size: 15
}

/** 首页 */
const Home = () => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const [pageParams, setPageParams] = useState(defaultPageParams)

  useEffect(() => {
    const getData = async (param: PageParams) => {
      const res = await requestFn(dispatch, {
        url: '/v1/users',
        method: 'get',
        params: {
          number: param.number,
          size: param.size,
          ...(param.name ? { name: param.name } : {}),
          ...(param.address ? { name: param.address } : {}),
          ...(param.status1 ? { status1: param.status1 } : {}),
          ...(param.status2 ? { status2: param.status2 } : {})
        }
      })
      if (res.status === 200 && res?.data?.code === 200) {
        // TODO: 处理数据
      }
    }

    getData(pageParams)
  }, [dispatch, pageParams])

  const onSearch = (fields: Params) => {
    setPageParams({ ...defaultPageParams, ...fields })
  }

  const reset = () => {
    setPageParams(defaultPageParams)
  }

  return (
    <div>
      <SearchComponent options={exampleOptions} onSearch={onSearch} reset={reset} />
    </div>
  )
}

export default Home
