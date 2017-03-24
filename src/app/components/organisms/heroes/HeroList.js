import React from 'react'
import { Flex } from '../../wrappers'
import { HeroListItem } from '../../molecules'

const HeroList = ({ heroes }) => (
  <Flex className="c-hero-list">
    {heroes.map(hero => (
      <HeroListItem key={hero.get('id')} hero={hero} />
    ))}
  </Flex>
)

HeroList.propTypes = {
  heroes: React.PropTypes.object.isRequired,
}

export default HeroList
