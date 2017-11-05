// custom middleware to handle api calls
import axios from 'axios'

// const BASE_URL = `${window.location.origin}/parse-feed`
const BASE_URL = 'http://localhost:7000/parse-feed'

const apiMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type !== 'API') {
    return next(action)
  }

  const { payload } = action

  dispatch({ type: payload.apiStart })

  axios
    .get(`${BASE_URL}?url=${payload.url}&name=${payload.desiredName}`)
    .then((res) => {
      if (!res.data.success) {
        throw Error(res.statusText)
      }
      dispatch({ type: payload.apiDone })
      dispatch({ type: payload.success, feed: res.data.feed })
    })
    .catch((err) => {
      dispatch({ type: payload.apiDone })
      dispatch({ type: payload.error, err })
    })

  return undefined
}

export default apiMiddleware
