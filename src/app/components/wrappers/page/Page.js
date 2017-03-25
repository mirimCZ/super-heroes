/* @flow */
import './Page.scss'
import React from 'react'

const Page = ({ className, ...props }) => (
  <div
    className={`u-page-wrapper ${className}`}
    {...props}
  />
)

Page.propTypes = {
  className: React.PropTypes.string,
}

export default Page
