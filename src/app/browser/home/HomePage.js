import React from 'react'
import { Map } from 'immutable'
import { Page } from '../../components/wrappers'
import { SearchHeader, HeroList } from '../../components/organisms'
import { Title } from '../../components/atoms'
import { connect } from 'react-redux'
import { fetchHeroList } from '../../redux/heroes/actions'
import { updateInput, submitForm } from '../../redux/search/actions'

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchHeroList(new Map({
      limit: 30,
    }))
  }

  render() {
    const { updateInput, submitForm, heroes } = this.props

    return (
      <Page>
        <Title message="Super Heroes Exercise | Homepage" />

        <SearchHeader
          heading="Super Heroes List"
          onSearchChange={updateInput}
          onSearchSubmit={submitForm}
        />

        <HeroList
          heroes={heroes.get('all')}
        />
      </Page>
    )
  }
}

HomePage.propTypes = {
  updateInput: React.PropTypes.func.isRequired,
  submitForm: React.PropTypes.func.isRequired,
  heroes: React.PropTypes.object.isRequired,
  fetchHeroList: React.PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    heroes: state.heroes,
  }),
  { updateInput, submitForm, fetchHeroList },
)(HomePage)
