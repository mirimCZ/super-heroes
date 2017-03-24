/* @flow weak */
import config from '../config/reducer'
import heroes from '../heroes/reducer'
import intl from '../intl/reducer'
import { combineReducers } from 'redux'

const resetStateOnSignOut = (reducer, initialState) => (state, action) => {
  // Reset app state on sign out, stackoverflow.com/q/35622588/233902.
  const wasUserSignedOut = false

  if (wasUserSignedOut) {
    // Preserve state without sensitive data.
    state = {
      app: state.app,
      config: initialState.config,
      intl: initialState.intl,
    }
  }
  return reducer(state, action)
}

const configureReducer = (initialState: Object) => {
  let reducer = combineReducers({
    config,
    heroes,
    intl,
  })

  reducer = resetStateOnSignOut(reducer, initialState)

  return reducer
}

export default configureReducer
