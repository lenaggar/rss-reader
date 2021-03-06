import {
  API,
  ASYNC_ACTION_TYPE,
  ACTIVE_FEED_CHANGED,
  REMOVE_FEED,
  ADD_FEED_ERROR_DISMISSED
} from './types'

export const addFeed = feed => ({
  type: API,
  payload: Object.assign(
    {
      url: feed.url,
      desiredName: feed.name
    },
    ASYNC_ACTION_TYPE('ADD_FEED')
  )
})

export const changeActiveFeed = id => ({
  type: ACTIVE_FEED_CHANGED,
  payload: { id }
})

export const removeFeed = id => ({
  type: REMOVE_FEED,
  payload: { id }
})

export const dismissError = () => ({
  type: ADD_FEED_ERROR_DISMISSED
})
