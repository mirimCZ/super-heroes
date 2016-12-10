/* @flow */
import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { Page } from '../../components/wrappers'
import { Title } from '../../components/atoms'
import { PageHeader } from '../../components/molecules'
import messages from '../../../l18n/pages/not-found'

const NotFoundPage = ({ intl }) => (
  <Page>
    <Title message={messages.h1} />
    <PageHeader
      description={intl.formatMessage(messages.p)}
      heading={intl.formatMessage(messages.h1)}
    />
  </Page>
)

NotFoundPage.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(NotFoundPage)
