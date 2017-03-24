import fetch from 'isomorphic-fetch'

const configureDeps = (initialState, platformDeps) => ({
  fetch,
  ...platformDeps,
})

export default configureDeps
