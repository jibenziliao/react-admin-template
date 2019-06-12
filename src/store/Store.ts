import { Store, createStore } from 'redux'
import reducer from './Reducer'
import Actions from './Actions'
import { create } from 'redux-react-hook'
import { composeWithDevTools } from 'redux-devtools-extension'

export interface IState {
  pageLoading: boolean
}

export const makeStore = (): Store<IState, Actions> => {
  return createStore(reducer, INITIAL_STATE, composeWithDevTools())
}

export const INITIAL_STATE: IState = {
  pageLoading: false
}

export const { StoreContext, useDispatch, useMappedState } = create<
  IState,
  Actions,
  Store<IState, Actions>
>()
