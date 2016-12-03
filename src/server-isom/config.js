/* @flow */
import nconf from 'nconf'

nconf.env('__')

// TODO: add sentry?
nconf.defaults({
  defaultLocale: 'cs',
  isProduction: process.env.NODE_ENV === 'production',
  locales: ['cs', 'en'],
  port: process.env.PORT || 3000,
})

export default nconf.get()
