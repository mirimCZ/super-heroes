/* @flow */
/* eslint-disable max-len, react/require-extension, global-require, no-sequences, no-unexpected-multiline, no-use-before-define */
// NOTE: what a mess, linter seems broken reporting all those problems, maybe we should revise rules
const onWindowIntl = () => {
  require('babel-polyfill')
  window.Promise = require('../../lib/bluebird')

  const { addLocaleData } = require('react-intl')
  const locales = [
    require('react-intl/locale-data/cs'),
    require('react-intl/locale-data/en'),
  ]

  locales.forEach(locale => addLocaleData(locale))

  require('./main')
}

// github.com/andyearnshaw/Intl.js/#intljs-and-browserifywebpack
if (!window.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/cs.js',
    'intl/locale-data/jsonp/en.js',
  ], (require) => {
    require('intl')
    require('intl/locale-data/jsonp/cs.js')
    require('intl/locale-data/jsonp/en.js')

    onWindowIntl()
  })
} else {
  onWindowIntl()
}
