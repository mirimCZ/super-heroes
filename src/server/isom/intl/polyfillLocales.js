var areIntlLocalesSupported = require('intl-locales-supported') // eslint-disable-line no-var

module.exports = function polyfillLocales(global, locales) {
  if (global.Intl) {
    if (!areIntlLocalesSupported(locales)) {
      require('intl') // eslint-disable-line global-require

      Intl.NumberFormat = IntlPolyfill.NumberFormat // eslint-disable-line no-undef
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat // eslint-disable-line no-undef
    }
  } else {
    global.Intl = require('intl') // eslint-disable-line global-require
  }
}
