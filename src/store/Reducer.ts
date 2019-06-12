import Actions from './Actions'
import { IState, INITIAL_STATE } from './Store'

export default function reducer(
  state: IState = INITIAL_STATE,
  action: Actions
) {
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
