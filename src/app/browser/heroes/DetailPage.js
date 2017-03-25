import React from 'react'
import { Page } from '../../components/wrappers'
import { SearchHeader } from '../../components/organisms'
import { Title } from '../../components/atoms'
import { connect } from 'react-redux'
import { fetchHeroList, updateSearchInput } from '../../redux/heroes/actions'

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchHeroList(this.props.heroes.get('filter'))
  }

  render() {
    const { updateSearchInput, fetchHeroList, heroes } = this.props
console.log(this.props);
    return (
      <Page className="c-heroes-page">
        <Title message="Super Heroes Exercise | Detail" />

        <SearchHeader
          heading="Spider-Man detail"
          filter={heroes.get('filter')}
          onSearchChange={updateSearchInput}
          onSearchSubmit={fetchHeroList}
        />
        yo!
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
