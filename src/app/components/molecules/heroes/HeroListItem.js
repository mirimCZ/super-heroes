import React from 'react'
import { Box } from '../../wrappers'

const HeroListItem = ({ hero }) => (
  <Box sm={12} md={3}>
    Im hero {hero.get('name')}
  </Box>
)

HeroListItem.propTypes = {
  hero: React.PropTypes.object.isRequired,
}

export default HeroListItem
