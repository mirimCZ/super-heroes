import { Action } from '../../../lib/types'

export const appStart = (): Action => ({
  type: 'APP_START',
})

export const appStarted = (): Action => ({
  type: 'APP_STARTED',
})

export const appStop = (): Action => ({
  type: 'APP_STOP',
})
