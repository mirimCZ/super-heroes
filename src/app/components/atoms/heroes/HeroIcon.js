import './HeroIcon.scss'
import React from 'react'

const HeroIcon = ({ hero, size, blockClass }) => (
  <img
    src={`${hero.getIn(['thumbnail', 'path'])}/${size}.jpg`}
    alt={hero.get('name')}
    title={hero.get('name')}
    className={`${blockClass}__hero-icon`}
  />
)

HeroIcon.propTypes = {
  blockClass: React.PropTypes.string.isRequired,
  hero: React.PropTypes.object.isRequired,
  size: React.PropTypes.string.isRequired,
}

export default HeroIcon
