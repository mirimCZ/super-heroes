/* @flow */
import { applyMiddleware, createStore, compose } from 'redux'
import configureMiddleware from './middleware'
import configureReducer from './reducer'

type Options = {
  initialState: Object,
  platformDeps?: Object,
  platformMiddleware?: Array<Function>,
}

const configureStore = (options: Options) => {
  const {
    initialState,
    platformDeps = {},
    platformMiddleware = [],
  } = options

  const reducer = configureReducer(initialState)

  const { middleware } = configureMiddleware(
    initialState,
    platformDeps,
    platformMiddleware,
  )

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
    ),
  )

  if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./reducer', () => {
      const configureReducer = require('./reducer').default // eslint-disable-line global-require

      store.replaceReducer(configureReducer(initialState))
    })
  }

  return store
}

export default configureStore
