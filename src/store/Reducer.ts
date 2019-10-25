import Actions from './Actions'
import { State, INITIAL_STATE } from './Store'

/** 导出默认reducer */
export default function reducer(state: State = INITIAL_STATE, action: Actions) {
  switch (action.type) {
    case 'fetch_begin': {
      return {
        ...state,
        pageLoading: action.payload.pageLoading
      }
    }

    case 'fetch_success': {
      return {
        ...state,
        pageLoading: action.payload.pageLoading
      }
    }

    case 'fetch_failed': {
      return {
        ...state,
        pageLoading: action.payload.pageLoading
      }
    }

    default:
      return state
  }
}
