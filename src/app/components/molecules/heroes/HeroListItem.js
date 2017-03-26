import './HeroListItem.scss'
import React from 'react'
import { Box } from '../../wrappers'
import { HeroIcon } from '../../atoms'

const HeroListItem = ({ hero, blockClass, ...props }) => (
  <Box
    className={`${blockClass}__hero-item`}
    {...props}
  >
    <HeroIcon
      hero={hero}
      blockClass={blockClass}
      size="standard_xlarge"
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
