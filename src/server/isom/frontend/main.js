import Promise from 'bluebird'
import configureStore from '../../../app/redux/_configure/store'
import createInitialState from './createInitialState'
import { createServerRenderContext } from 'react-router'
import { renderBody, renderHtml } from './render'
import config from '../config'

const settleAllWithTimeout = promises => Promise
  .all(promises.map(p => p.reflect()))
  .each(inspection => {
    if (inspection.isFulfilled()) return
    console.log('Server fetch failed:', inspection.reason())
  })
  .timeout(5000)
  .catch(error => {
    if (error instanceof Promise.TimeoutError) {
      console.log('Server fetch timeouted:', error)
      return
    }
    throw error
  })

const initialState = createInitialState()

const createStore = (req) => configureStore({
  initialState: {
    ...initialState,
    intl: initialState.intl
      .set('currentLocale', req.acceptsLanguages(config.locales) || config.defaultLocale),
  },
})

const render = async (req: Object, res: Object, next: Function) => {
  try {
    const context = createServerRenderContext()
    const store = createStore(req)
    const fetchPromises = []

    let bodyMarkupWithHelmet = renderBody(store, context, req.url, fetchPromises)
    const result = context.getResult()

    if (result.redirect) {
      res.redirect(301, result.redirect.pathname + result.redirect.search)
      return
    }

    if (result.missed) {
      bodyMarkupWithHelmet = renderBody(store, context, req.url)
      const htmlMarkup = renderHtml(store.getState(), bodyMarkupWithHelmet, config)
      res.status(404).send(htmlMarkup)
      return
    }

    if (fetchPromises.length > 0) {
      await settleAllWithTimeout(fetchPromises)
      bodyMarkupWithHelmet = renderBody(store, context, req.url)
    }

    const htmlMarkup = renderHtml(store.getState(), bodyMarkupWithHelmet, config)
    res.status(200).send(htmlMarkup)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default render
