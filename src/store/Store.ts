import { Store, createStore } from 'redux'
import { create } from 'redux-react-hook'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './Reducer'
import Actions from './Actions'

/** 全局state接口 */
export interface State {
  pageLoading: boolean
}

/** 创建全局store */
export const makeStore = (): Store<State, Actions> => {
  return createStore(reducer, INITIAL_STATE, composeWithDevTools())
}

/** 全局初始状态 */
export const INITIAL_STATE: State = {
  pageLoading: false
}

export const { StoreContext, useDispatch, useMappedState } = create<State, Actions, Store<State, Actions>>()
