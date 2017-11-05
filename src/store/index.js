import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from "redux-thunk";
import logger from '../middleware/logger'
import apiMiddleware from '../middleware/apiMiddleware'
import rootReducer from '../reducers'

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(logger, apiMiddleware))
  )
  return store
}

export default configureStore
