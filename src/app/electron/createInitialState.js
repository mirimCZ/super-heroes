/* @flow */
import configReducer from '../redux/config/reducer'
import intlReducer from '../redux/intl/reducer'
import loadMessages from '../../server/isom/intl/loadMessages'

const config = {
  appName: '',
  appVersion: '',
  sentryUrl: '',
  defaultLocale: 'cs',
  locales: ['cs', 'en'],
  messages: loadMessages(),
}

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
