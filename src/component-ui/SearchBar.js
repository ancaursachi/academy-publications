import React from 'react'
import styled from 'styled-components'
import { InputForm, InputSelect } from '../component-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = ({ values, handleChange, options }) => {
  return (
    <Root>
      <Content>
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
          ml={0.5}
          value={values.searchType}
          onChange={handleChange}
        />
      </Content>
      <Column />
    </Root>
  )
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
`
const Column = styled.div``
const Content = styled.div`
  display: grid;
  grid-template-columns: 10% 60% 30%;
  padding-bottom: 1em;
`

const SearchIcon = styled(FontAwesomeIcon)`
  display: flex;
  align-self: center;
  margin-right: 0.5em;
  font-size: 1.5em;
`
export default SearchBar
