import React from 'react'
import { List } from 'immutable'
import { Flex, Box } from '../../wrappers'
import { Text, Link, HeroIcon } from '../../atoms'

const HeroDetail = ({ hero }) => (
  <Box className="c-heroes-detail">
    <Flex>
      <Box md={3}>
        <HeroIcon
          hero={hero}
          size="portrait_incredible"
          blockClass="c-heroes-detail"
        />
      </Box>

      <Box>
        <Text ml={3} mb={2}>
          {hero.get('description') || 'No description available.'}
        </Text>

        <Text ml={3} mb={2}>
          See {hero.get('name')} details on&nbsp;
          <Link
            to={hero.get('urls').find(url => url.get('type') === 'detail').get('url')}
            target="blank"
            blockClass="c-heroes-detail"
          >
            official Marvel site
          </Link>
          {hero.get('urls').find(url => url.get('type') === 'wiki') &&
          <span>
            &nbsp;or read through&nbsp;
            <Link
              to={hero.get('urls').find(url => url.get('type') === 'wiki').get('url')}
              target="blank"
              blockClass="c-heroes-detail"
            >
              Marvel Wiki
            </Link>
          </span>
          }.
        </Text>
      </Box>
    </Flex>

    <Box>
      <Text>
        {hero.get('name')} can be found in following comics:
      </Text>
      <ul>
        {hero.getIn(['comics', 'items'], new List()).map((comic, key) => (
          <li key={comic.get('name') + key}>{comic.get('name')}</li>
        ))}
      </ul>

      {hero.getIn(['comics', 'available']) - hero.getIn(['comics', 'returned']) > 0 &&
        <Text>
          ... and {hero.getIn(['comics', 'available']) - hero.getIn(['comics', 'returned'])} more.
        </Text>
      }
    </Box>
  </Box>
)

HeroDetail.propTypes = {
  hero: React.PropTypes.object.isRequired,
}

export default HeroDetail
