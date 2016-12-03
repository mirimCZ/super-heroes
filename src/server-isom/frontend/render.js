import App from '../../browser/app/App'
import Helmet from 'react-helmet'
import Html from './Html'
import React from 'react'
import ServerFetchProvider from './ServerFetchProvider'
import serialize from 'serialize-javascript'
import { Provider as Redux } from 'react-redux'
import { ServerRouter } from 'react-router'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { toJSON } from '../../lib/transit'

export function renderBody(store, context, location, fetchPromises) {
  const markup = renderToString(
    <Redux store={store}>
      <ServerFetchProvider promises={fetchPromises}>
        <ServerRouter
          context={context}
          location={location}
        >
          <App />
        </ServerRouter>
      </ServerFetchProvider>
    </Redux>)

  return { markup, helmet: Helmet.rewind() }
}

function renderScripts(state, appJsFilename) {
  return `
    <script>
      window.__INITIAL_STATE__ = ${serialize(toJSON(state))};
    </script>
    <script src="${appJsFilename}"></script>
  `
}

export function renderHtml(state, bodyMarkupWithHelmet, config) {
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename },
  } = global.webpackIsomorphicTools.assets()
  if (!config.isProduction) {
    global.webpackIsomorphicTools.refresh()
  }
  const { markup: bodyMarkup, helmet } = bodyMarkupWithHelmet
  const scriptsMarkup = renderScripts(state, appJsFilename)
  const markup = renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      bodyHtml={`<div id="app">${bodyMarkup}</div>${scriptsMarkup}`}
      helmet={helmet}
      isProduction={config.isProduction}
    />)

  return `<!DOCTYPE html>${markup}`
}
