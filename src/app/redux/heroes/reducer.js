/* @flow weak */
import { Record } from '../../../lib/transit'
import { Map } from 'immutable'

const State = Record({
  all: Map({
    1: Map({
      id: 1,
      name: 'Aloha snackbar',
    }),
  }),
}, 'heroes')

const heroesReducer = (state = new State()) => state

export default heroesReducer
