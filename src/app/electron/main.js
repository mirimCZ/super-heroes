/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './app/Root'
import configureStore from '../redux/_configure/store'
import createInitialState from './createInitialState'

const initialState = createInitialState()

const store = configureStore({
  initialState,
  platformDeps: {},
  platformMiddleware: [],
})

const appElement = document.getElementById('app')

ReactDOM.render(<Root store={store} />, appElement)

if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('../browser/app/Root', () => {
    const NextRoot = require('../browser/app/Root').default // eslint-disable-line global-require

    ReactDOM.render(<NextRoot store={store} />, appElement)
  })
}
