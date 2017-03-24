import { Action } from '../../../lib/types'

export const updateInput = (event): Action => ({
  type: 'UPDATE_SEARCH_INPUT',
  payload: {
    value: event.value,
    key: event.keyCode,
  },
})

export const submitForm = (event): Action => {
  event.preventDefault()

  return {
    type: 'SUBMIT_SEARCH_FORM',
    payload: {
      values: {},
    },
  }
}
