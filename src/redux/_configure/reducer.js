/* @flow weak */
import { combineReducers } from 'redux'
import config from '../config/reducer'
import intl from '../intl/reducer'

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
    intl,
  })

  reducer = resetStateOnSignOut(reducer, initialState)

  return reducer
}

export default configureReducer
