/* @flow */
require('babel-register')
require('babel-polyfill')
const constants = require('../../constants')
const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
const config = require('./config').default
const polyfillLocales = require('./intl/polyfillLocales')
const webpackIsomorphicAssets = require('../../webpack/browser/assets').default

if (!process.env.NODE_ENV) {
  throw new Error('Environment variable NODE_ENV must be set to development or production.')
}

polyfillLocales(global, config.locales)

global.Promise = require('../../lib/bluebird')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicAssets)
  .server(constants.default.ABSOLUTE_BASE, () => {
    require('./main') // eslint-disable-line global-require
  })
