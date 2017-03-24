import './SearchHeader.scss'
import React from 'react'
import { Flex, Box } from '../../wrappers'
import { PageHeader } from '../../molecules'

const SearchHeader = ({ heading, onSearchChange, onSearchSubmit }) => (
  <Flex className="c-search-header">
    <Box sm={12} md={9}>
      <PageHeader heading={heading} />
    </Box>
    <Box sm={12} md={3} className="u-align-right">
      <form onSubmit={onSearchSubmit}>
        <input
          onChange={onSearchChange}
          className="c-search-header__input"
          placeholder="Search for super hero"
          type="search"
        />
      </form>
    </Box>
  </Flex>
)

SearchHeader.propTypes = {
  heading: React.PropTypes.string,
  onSearchChange: React.PropTypes.func,
  onSearchSubmit: React.PropTypes.func,
}

export default SearchHeader
