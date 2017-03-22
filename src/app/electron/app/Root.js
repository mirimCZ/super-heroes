/* @flow */
import App from '../../browser/app/App'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { Provider as Redux } from 'react-redux'

type Props = {
  store: Object,
}

const Root = ({ store }: Props) => (
  <Redux store={store}>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </Redux>
)

export default Root
