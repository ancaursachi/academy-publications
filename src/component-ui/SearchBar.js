import React from 'react'
import styled from 'styled-components'
import { InputForm, InputSelect } from '../component-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = ({ values, handleChange, options }) => {
  return (
    <Root>
      <SearchIcon icon="search" color="#818284" />
      <InputForm
        name="searchValue"
        value={values.searchValue}
        onChange={handleChange}
      />
      <InputSelect
        name="searchType"
        type="text"
        options={options}
        widthInput={10}
        width={10}
        ml={0.5}
        value={values.searchType}
        onChange={handleChange}
      />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  padding-bottom: 1em;
`
const SearchIcon = styled(FontAwesomeIcon)`
  display: flex;
  align-self: center;
  margin-right: 0.5em;
  font-size: 1.5em;
`
export default SearchBar
