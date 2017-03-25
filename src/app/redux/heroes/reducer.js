/* @flow weak */
import { Record } from '../../../lib/transit'
import { Map } from 'immutable'
import * as actions from './actions'

const State = Record({
  all: Map(),
  isSearchPeding: false,
}, 'heroes')

const heroesReducer = (state = new State(), action) => {
  switch (action.type) {
    case `${actions.FETCH_HERO_LIST}_FULFILLED`: {
      const response = action.payload
      const heroes = response.data.results.reduce((result, hero) => (
        result.set(hero.id, Map(hero))
      ), Map())
      return state
        .set('all', heroes)
        .set('isSearchPeding', false)
    }

    case `${actions.FETCH_HERO_LIST}_PENDING`: {
      return state.set('isSearchPeding', true)
    }

    case `${actions.FETCH_HERO_LIST}_REJECTED`: {
      return state.set('isSearchPeding', false)
    }

    default:
      return state
  }
}

export default heroesReducer
