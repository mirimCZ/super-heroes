/* @flow */
import config from '../config'
import configReducer from '../../../app/redux/config/reducer'
import intlReducer from '../../../app/redux/intl/reducer'
import loadMessages from '../intl/loadMessages'

const messages = loadMessages()

const createInitialState = () => ({
  config: configReducer(undefined, {})
    .set('appName', config.appName)
    .set('appVersion', config.appVersion)
    .set('sentryUrl', config.sentryUrl),
  intl: intlReducer(undefined, {})
    .set('currentLocale', config.defaultLocale)
    .set('defaultLocale', config.defaultLocale)
    .set('locales', config.locales)
    .set('messages', messages),
})

export default createInitialState
