import {
  ADD_FEED_SUCCESS,
  ADD_FEED_API_START,
  ADD_FEED_API_DONE,
  ADD_FEED_ERROR,
  ADD_FEED_ERROR_DISMISSED,
  ACTIVE_FEED_CHANGED,
  REMOVE_FEED
} from './../actions/types'

export const subscriptions = (state = {}, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case ADD_FEED_SUCCESS:
      return Object.assign({}, state, {
        [action.feed.id]: action.feed
      })

    case REMOVE_FEED:
      delete newState[action.payload.id]
      return newState

    default:
      return state
  }
}

export const subscriptionsList = (state = [], action) => {
  switch (action.type) {
    case ADD_FEED_SUCCESS:
      return [
        {
          id: action.feed.id,
          url: action.feed.url,
          desiredName: action.feed.desiredName
        },
        ...state
      ]

    case REMOVE_FEED:
      return state.filter(obj => obj.id !== action.payload.id)

    default:
      return state
  }
}

export const addFeedIsLoading = (state = false, action) => {
  switch (action.type) {
    case ADD_FEED_API_START:
      return true

    case ADD_FEED_API_DONE:
      return false

    default:
      return state
  }
}

export const addFeedHasErrored = (
  state = {
    didntIt: false,
    errorMessage: ''
  },
  action
) => {
  switch (action.type) {
    case ADD_FEED_ERROR:
      return {
        didntIt: true,
        errorMessage: action.errorMessage
      }

    case ADD_FEED_ERROR_DISMISSED:
      return {
        didntIt: false,
        errorMessage: ''
      }

    default:
      return state
  }
}

export const activeFeed = (state = null, action) => {
  switch (action.type) {
    case ADD_FEED_SUCCESS:
      return action.feed.id

    case ACTIVE_FEED_CHANGED:
      return action.payload.id

    case REMOVE_FEED:
      return state === action.payload.id ? null : state

    default:
      return state
  }
}
