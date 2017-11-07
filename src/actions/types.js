export const API = 'API'

export const ASYNC_ACTION_TYPE = type => ({
  success: `${type}_SUCCESS`,
  error: `${type}_ERROR`,
  apiStart: `${type}_API_START`,
  apiDone: `${type}_API_DONE`
})

export const ADD_FEED_SUCCESS = 'ADD_FEED_SUCCESS'

export const ADD_FEED_ERROR = 'ADD_FEED_ERROR'

export const ADD_FEED_ERROR_DISMISSED = 'ADD_FEED_ERROR_DISMISSED'

export const ADD_FEED_API_START = 'ADD_FEED_API_START'

export const ADD_FEED_API_DONE = 'ADD_FEED_API_DONE'

export const ACTIVE_FEED_CHANGED = 'ACTIVE_FEED_CHANGED'

export const REMOVE_FEED = 'REMOVE_FEED'
