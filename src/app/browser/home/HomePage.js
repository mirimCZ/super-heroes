import './HomePage.scss'
import React from 'react'
import { Page } from '../../components/wrappers'
import { SearchHeader, HeroList } from '../../components/organisms'
import { Title, Spinner } from '../../components/atoms'
import { connect } from 'react-redux'
import { fetchHeroList, updateSearchInput } from '../../redux/heroes/actions'

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchHeroList(this.props.heroes.get('filter'))
  }

  render() {
    const { updateSearchInput, fetchHeroList, heroes } = this.props

    return (
      <Page className="p-homepage">
        <Title message="Super Heroes Exercise | Homepage" />

        <SearchHeader
          heading="Super Heroes List"
          filter={heroes.get('filter')}
          onSearchChange={updateSearchInput}
          onSearchSubmit={fetchHeroList}
        />
        {heroes.get('isSearchPeding') &&
          <div className="c-heroes-page__spinner">
            <Spinner />
          </div>
        }

        {!heroes.get('isSearchPeding') &&
          <HeroList
            heroes={heroes.get('map')}
          />
        }
      </Page>
    )
  }
}

HomePage.propTypes = {
  updateSearchInput: React.PropTypes.func.isRequired,
  fetchHeroList: React.PropTypes.func.isRequired,
  heroes: React.PropTypes.object.isRequired,
}

export default connect(
  (state) => ({
    heroes: state.heroes,
  }),
  { updateSearchInput, fetchHeroList },
)(HomePage)
