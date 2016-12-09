import { Text, Heading } from '../../atoms'
import React from 'react'

const PageHeader = ({ heading, description }) => (
  <header className="PageHeader">
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
