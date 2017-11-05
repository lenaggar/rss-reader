import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import configureStore from './store'

import './main.css'
import './styles.css'

import App from './components/app'

const store = configureStore()

const targetEl = document.querySelector('#root')

const appWrapper = AppComponent => (
  <AppContainer>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </AppContainer>
)

render(appWrapper(App), targetEl)

if (module.hot) {
  module.hot.accept('./components/app', () => {
    const nextApp = require('./components/app').default // eslint-disable-line global-require
    render(appWrapper(nextApp), targetEl)
  })
}
