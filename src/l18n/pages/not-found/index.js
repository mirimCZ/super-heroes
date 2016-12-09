/* @flow */
import { defineMessages } from 'react-intl'

// TODO: improve ux - add search, add menu categories atc, refer google
export default defineMessages({
  h1: {
    defaultMessage: '404: Stránka nebyla nalezena',
    id: 'notFound.h1',
  },
  p: {
    defaultMessage: 'Odkaz může být zastaralý, nebo byla stránka odstraněna.',
    id: 'notFound.p',
  },
  continue: {
    defaultMessage: 'Prosím pokračujte tudy.',
    id: 'notFound.continue',
  },
})
