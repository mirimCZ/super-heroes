/* @flow */
import R from 'ramda'
import React from 'react'
import start from '../../components/app/start'
import type { State } from '../../lib/types'
import { connect } from 'react-redux'

const App = () => (
  <div>
    <h1>Fuckin testy!</h1>
  </div>
)

App.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
}

export default R.compose(
  connect(
    (state: State) => ({
      currentLocale: state.intl.currentLocale,
    }),
  ),
  start,
)(App)
