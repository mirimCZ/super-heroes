/* @flow */
import './App.scss'
import Helmet from 'react-helmet'
import R from 'ramda'
import React from 'react'
import favicon from '../../components/app/favicon'
import start from '../../components/app/start'
import type { State } from '../../../lib/types'
import { Flex, Box } from '../../components/wrappers'
import { Match, Miss } from 'react-router'
import { connect } from 'react-redux'

import DetailPage from '../heroes/DetailPage'
import HomePage from '../home/HomePage'
import NotFoundPage from '../not-found/NotFoundPage'

const bootstrap4Metas: any = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge',
  },
]

const App = ({ currentLocale }) => (
  <Flex>
    <Helmet
      htmlAttributes={{ lang: currentLocale }}
      meta={[
        ...bootstrap4Metas,
        {
          name: 'description',
          content: 'Super Heroes Excercise',
        },
        ...favicon.meta,
      ]}
      link={[
        ...favicon.link,
      ]}
    />

    <Box style={{ flex: 1 }}>
      <Match exactly pattern="/" component={HomePage} />
      <Match pattern="/detail/:id" component={DetailPage} />
      <Miss component={NotFoundPage} />
    </Box>
  </Flex>
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
