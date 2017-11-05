export const subscriptions = (state = [], action) => {
  switch (action.type) {
    case ADD_FEED_SUCCESS:
      return action.data

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

export const addFeedHasErrored = (state = false, action) => {
  if (action.type === ADD_FEED_ERROR) {
    return true
  }
  return state
}

export const activeFeed = (state = undefined, action) => {
  if (action.type === SHOW_FEED) {
    return action.id
  }
  return state
}
