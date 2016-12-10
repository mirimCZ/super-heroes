/* @flow weak */
import { Record } from '../../../lib/transit'

const State = Record({
  appName: '',
  appVersion: '',
  sentryUrl: '',
}, 'config')

const configReducer = (state = new State()) => state

export default configReducer
