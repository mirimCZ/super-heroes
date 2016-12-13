import './Link.scss'
import React from 'react'
import classnames from 'classnames'
import { Link as RouterLink } from 'react-router'

const Link = ({ className, ...props }) => (
  <RouterLink
    className={classnames('Link', className)}
    {...props}
  />
)

Link.propTypes = {
  className: React.PropTypes.string,
}

export default Link
