import './HeroList.scss'
import React from 'react'
import { Flex } from '../../wrappers'
import { HeroListItem } from '../../molecules'
import { Link } from '../../atoms'

const HeroList = ({ heroes }) => (
  <Flex className="c-hero-list" wrap>
    {heroes.map(hero => (
      <Link
        blockClass="c-hero-list"
        to={`/detail/${hero.get('id')}`}
      >
        <HeroListItem
          key={hero.get('id')}
          hero={hero}
          blockClass="c-hero-list"
        />
      </Link>
    ))}

    {heroes.size === 0 &&
      <p className="c-hero-list__message">No super heroes found :(</p>
    }
  </Flex>
)

HeroList.propTypes = {
  heroes: React.PropTypes.object.isRequired,
}

export default HeroList
