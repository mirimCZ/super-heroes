import React from 'react'
import { Text, Heading } from '../../atoms'

const PageHeader = ({ heading, description }) => (
  <header>
    <Heading level={1}>
      {heading}
    </Heading>

    {description &&
      <Text>
        {description}
      </Text>
    }
  </header>
)

PageHeader.propTypes = {
  heading: React.PropTypes.string,
  description: React.PropTypes.string,
}

export default PageHeader
