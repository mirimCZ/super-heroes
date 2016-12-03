export type ConfigState = {
  appName: string,
  appVersion: string,
  sentryUrl: string,
}

export type IntlState = {
  currentLocale: string,
  defaultLocale: string,
  locales: Array<string>,
  messages: Object,
}

export type State = {
  config: ConfigState,
  intl: IntlState,
}

export type Action =
    { type: 'APP_START' }
  | { type: 'APP_STARTED' }
  | { type: 'APP_STOP' }
