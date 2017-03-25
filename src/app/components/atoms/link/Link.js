import './Link.scss'
import React from 'react'
import classnames from 'classnames'
import { Link as RouterLink } from 'react-router'

const Link = ({ blockClass, className, ...props }) => (
  <RouterLink
    className={classnames(`${blockClass}__link`, className)}
    {...props}
  />
)

Link.propTypes = {
  className: React.PropTypes.string,
  blockClass: React.PropTypes.string,
}

export default Link
