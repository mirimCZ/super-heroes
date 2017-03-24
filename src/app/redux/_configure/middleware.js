import configureDeps from './deps'
import configureEpics from './epics'
import createLoggerMiddleware from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { createEpicMiddleware } from 'redux-observable'

const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action)


const configureMiddleware = (initialState, platformDeps, platformMiddleware) => {
  const deps = configureDeps(initialState, platformDeps)
  const rootEpic = configureEpics(deps)
  const epicMiddleware = createEpicMiddleware(rootEpic)

  const middleware = [
    injectMiddleware(deps),
    promiseMiddleware(),
    epicMiddleware,
    ...platformMiddleware,
  ]

  const enableLogger = process.env.NODE_ENV !== 'production' && process.env.IS_BROWSER

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLoggerMiddleware({
      collapsed: true,
      stateTransformer: state => JSON.parse(JSON.stringify(state)),
    })
    middleware.push(logger)
  }

  if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./epics', () => {
      const configureEpics = require('./epics').default // eslint-disable-line global-require

      epicMiddleware.replaceEpic(configureEpics(deps))
    })
  }

  return { middleware }
}

export default configureMiddleware
