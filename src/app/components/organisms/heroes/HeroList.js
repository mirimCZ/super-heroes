import './HeroList.scss'
import React from 'react'
import { Flex } from '../../wrappers'
import { HeroListItem } from '../../molecules'

const HeroList = ({ heroes }) => (
  <Flex className="c-hero-list" wrap>
    {heroes.map(hero => (
      <HeroListItem
        key={hero.get('id')}
        hero={hero}
        blockClass="c-hero-list"
      />
    ))}
  </Flex>
)

HeroList.propTypes = {
  heroes: React.PropTypes.object.isRequired,
}

export default HeroList
