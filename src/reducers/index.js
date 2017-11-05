import { combineReducers } from 'redux'

import {
  subscriptions,
  subscriptionsList,
  addFeedIsLoading,
  addFeedHasErrored,
  activeFeed
} from './feedReducers'

export default combineReducers({
  db: combineReducers({
    subscriptions,
    subscriptionsList
  }),
  ui: combineReducers({
    addFeedIsLoading,
    addFeedHasErrored,
    activeFeed
  })
})
