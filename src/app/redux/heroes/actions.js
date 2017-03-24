import { List } from 'immutable'

const makeParams = (filter) => (
  filter.reduce((result, value, key) => (
    result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  ), new List(['apikey=5ee9ebc6e58d747fa165a039cf3ca442'])).join('&')
)

export const fetchHeroList = (filter) => ({ fetch }) => ({
  type: 'FETCH_HERO_LIST',
  payload: {
    promise: fetch(`https://gateway.marvel.com:443/v1/public/characters?${makeParams(filter)}`)
      .then(response => response.json()),
  },
})
