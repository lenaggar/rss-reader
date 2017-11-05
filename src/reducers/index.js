import { combineReducers } from 'redux'

import { subscriptions, addFeedIsLoading, addFeedHasErrored, activeFeed } from './feedReducers'

export default combineReducers({
  db: combineReducers({
    subscriptions
  }),
  ui: combineReducers({
    addFeedIsLoading,
    addFeedHasErrored,
    activeFeed
  })
})
