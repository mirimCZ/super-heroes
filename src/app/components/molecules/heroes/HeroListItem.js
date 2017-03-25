import './HeroListItem.scss'
import React from 'react'
import { Box } from '../../wrappers'

const HeroListItem = ({ hero, blockClass, ...props }) => (
  <Box
    className={`${blockClass}__hero-item`}
    {...props}
  >
    <img
      src={`${hero.get('thumbnail').path}/standard_xlarge.jpg`}
      alt={hero.get('name')}
      title={hero.get('name')}
      className={`${blockClass}__hero-icon`}
    />
    <span className={`${blockClass}__hero-description`}>
      <span className={`${blockClass}__hero-name`}>{hero.get('name')}</span>
    </span>
  </Box>
)

HeroListItem.propTypes = {
  blockClass: React.PropTypes.string,
  hero: React.PropTypes.object.isRequired,
}

export default HeroListItem
