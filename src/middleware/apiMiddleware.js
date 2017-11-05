// custom middleware to handle api calls
import axios from 'axios'

const BASE_URL = `${window.location.origin}/parse-feed`

console.log(BASE_URL) // eslint-disable-line no-console

const apiMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type !== 'API') {
    return next(action)
  }

  const { payload } = action

  dispatch({ type: payload.apiStart })

  axios.get(`${BASE_URL}?url=${payload.url}`).then(res => console.log(res)) // eslint-disable-line no-console

  // fetch(BASE_URL + payload.url, options) // eslint-disable-line
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw Error(res.statusText)
  //     }
  //     return res.json()
  //   })
  //   .then((data) => {
  //     dispatch({ type: payload.apiDone })
  //     dispatch({ type: payload.success, data })
  //   })
  //   .catch((error) => {
  //     dispatch({ type: payload.apiDone })
  //     dispatch({ type: payload.error, error })
  //   })
  return undefined
}

export default apiMiddleware
