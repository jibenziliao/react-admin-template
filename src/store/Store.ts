import { Store, createStore } from 'redux'
import reducer from './Reducer'
import Actions from './Actions'
import { create } from 'redux-react-hook'
import { composeWithDevTools } from 'redux-devtools-extension'

/**
 * 全局state接口
 */
export interface IState {
  pageLoading: boolean
}

/**
 * 创建全局store
 */
export const makeStore = (): Store<IState, Actions> => {
  return createStore(reducer, INITIAL_STATE, composeWithDevTools())
}

/**
 * 全局初始状态
 */
export const INITIAL_STATE: IState = {
  pageLoading: false
}

export const { StoreContext, useDispatch, useMappedState } = create<
  IState,
  Actions,
  Store<IState, Actions>
>()
