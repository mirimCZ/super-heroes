/* @flow weak */
import { Record } from '../../../lib/transit'
import { OrderedMap, Map, fromJS } from 'immutable'
import * as actions from './actions'

const State = Record({
  map: Map(),
  isSearchPeding: false,
  filter: Map({
    limit: 32,
    offset: 0,
    nameStartsWith: '',
  }),
  total: null,
  detail: Map({
    name: '',
  }),
}, 'heroes')

const heroesReducer = (state = new State(), action) => {
  switch (action.type) {
    case `${actions.FETCH_HERO_LIST}_FULFILLED`: {
      const response = action.payload
      const heroes = response.data.results.reduce((result, hero) => (
        result.set(hero.id, fromJS(hero))
      ), OrderedMap())

      return state
        .set('map', heroes)
        .set('isSearchPeding', false)
        .set('total', response.data.total)
    }

    case `${actions.FETCH_HERO_LIST}_PENDING`: {
      return state.set('isSearchPeding', true)
    }

    case `${actions.FETCH_HERO_LIST}_REJECTED`: {
      return state.set('isSearchPeding', false)
    }

    case `${actions.FETCH_HERO}_FULFILLED`: {
      const hero = action.payload.data.results[0]
      return state.set('detail', fromJS(hero))
    }

    case `${actions.FETCH_HERO}_PENDING`: {
      return state.set('detail', Map({
        name: '',
      }))
    }

    case actions.UPDATE_SEARCH_INPUT: {
      return state.setIn(['filter', 'nameStartsWith'], action.payload.value)
    }

    default:
      return state
  }
}

export default heroesReducer
