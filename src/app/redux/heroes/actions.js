import { List } from 'immutable'

const makeParams = (filter) => (
  filter.reduce((result, value, key) => {
    if (key === 'nameStartsWith' && value !== '') {
      return result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
    return result
  }, List(['apikey=5ee9ebc6e58d747fa165a039cf3ca442'])).join('&')
)

export const FETCH_HERO_LIST = 'FETCH_HERO_LIST'
export const FETCH_HERO = 'FETCH_HERO'
export const UPDATE_SEARCH_INPUT = 'UPDATE_SEARCH_INPUT'

export const fetchHeroList = (filter) => ({ fetch }) => ({
  type: FETCH_HERO_LIST,
  payload: {
    promise: fetch(`https://gateway.marvel.com:443/v1/public/characters?${makeParams(filter)}`)
      .then(response => response.json()),
  },
})

export const fetchHero = (id) => ({ fetch }) => ({
  type: FETCH_HERO,
  payload: {
    promise: fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=5ee9ebc6e58d747fa165a039cf3ca442`)
      .then(response => response.json()),
  },
})

export const updateSearchInput = (event) => ({
  type: UPDATE_SEARCH_INPUT,
  payload: {
    value: event.target.value,
  },
})
