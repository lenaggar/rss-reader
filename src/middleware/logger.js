// custom middleware to console.log(actions)
const logger = store => next => (action) => {
  if (typeof action !== 'function') {
    console.log('dispatching:\n', action) // eslint-disable-line no-console
  } else {
    console.log('thunk:\n', action) // eslint-disable-line no-console
  }
  const result = next(action)
  console.log('next state:\n', store.getState()) // eslint-disable-line no-console
  return result
}

export default logger
