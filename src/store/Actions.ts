type Actions =
  | {
      type: 'fetch_begin'
      payload: {
        pageLoading: boolean
      }
    }
  | {
      type: 'fetch_success'
      payload: {
        pageLoading: boolean
      }
    }
  | {
      type: 'fetch_failed'
      payload: {
        pageLoading: boolean
      }
    }

export default Actions
