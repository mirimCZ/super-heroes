import React from 'react'
import { Page } from '../../components/wrappers'
import { SearchHeader, HeroDetail } from '../../components/organisms'
import { Title, Text, Link } from '../../components/atoms'
import { connect } from 'react-redux'
import { fetchHero, fetchHeroList, updateSearchInput } from '../../redux/heroes/actions'

class DetailPage extends React.Component {
  componentDidMount() {
    this.props.fetchHero(this.props.params.id)
  }

  render() {
    const { updateSearchInput, fetchHeroList, heroes } = this.props
    const { router } = this.context
    const hero = heroes.get('detail')

    return (
      <Page className="p-heroes-detail">
        <Title message="Super Heroes Exercise | Detail" />

        <SearchHeader
          heading={`${hero.get('name')}`}
          filter={heroes.get('filter')}
          onSearchChange={updateSearchInput}
          onSearchSubmit={() => {
            fetchHeroList(heroes.get('filter'))
            router.transitionTo('/')
          }}
        />

        <Text mb={3}>
          <Link
            blockClass="p-heroes-detail"
            to="/"
          >
            &lt; to Homepage
          </Link>
        </Text>

        {hero.get('name') && <HeroDetail hero={hero} />}

      </Page>
    )
  }
}

DetailPage.propTypes = {
  updateSearchInput: React.PropTypes.func.isRequired,
  fetchHeroList: React.PropTypes.func.isRequired,
  fetchHero: React.PropTypes.func.isRequired,
  heroes: React.PropTypes.object.isRequired,
  params: React.PropTypes.object,
}

DetailPage.contextTypes = {
  router: React.PropTypes.object,
}

export default connect(
  (state) => ({
    heroes: state.heroes,
  }),
  { updateSearchInput, fetchHero, fetchHeroList },
)(DetailPage)
