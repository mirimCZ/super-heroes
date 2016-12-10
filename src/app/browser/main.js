/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './app/Root'
import { fromJSON } from '../../lib/transit'
import configureStore from '../redux/_configure/store'

// eslint-disable-next-line no-underscore-dangle, no-undef
const initialState = fromJSON(window.__INITIAL_STATE__)

const store = configureStore({
  initialState,
  platformDeps: {},
  platformMiddleware: [],
})

const appElement = document.getElementById('app') // eslint-disable-line no-undef

ReactDOM.render(<Root store={store} />, appElement)

if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./app/Root', () => {
    const NextRoot = require('./app/Root').default // eslint-disable-line global-require

    ReactDOM.render(<NextRoot store={store} />, appElement)
  })
}
