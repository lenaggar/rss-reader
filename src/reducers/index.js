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

// selectors
export const getSubscriptions = state => state.db.subscriptions
export const getSubscriptionsList = state => state.db.subscriptionsList
export const getSubscriptionsLinksList = state => state.db.subscriptionsList.map(x => x.url)
export const getActiveFeedId = state => state.ui.activeFeed
export const getActiveFeedObject = state => state.db.subscriptions[state.ui.activeFeed]
export const isAddFeedLoading = state => state.ui.addFeedIsLoading
export const hasAddFeedErrored = state => state.ui.addFeedHasErrored.didntIt
export const getAddFeedErrorMessage = state => state.ui.addFeedHasErrored.errorMessage
