import React from 'react'

const Heading = ({ level, ...props }) => {
  const Component = `h${level}`

  return <Component {...props} />
}

Heading.propTypes = {
  level: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
}

Heading.defaultProps = {
  level: 2,
}

export default Heading
