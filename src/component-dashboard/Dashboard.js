import React from 'react'
import { Formik } from 'formik'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { get, sortBy } from 'lodash'
import { InputForm, InputSelect, th } from '../component-ui'
import { ManuscriptCard } from '.'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dashboard = ({ ...rest }) => {
  const { data } = useQuery(queries.getManuscripts)
  const initialValues = { searchValue: '', searchType: 'title' }
  const manuscripts = get(data, 'manuscripts', [])
  const sortedManuscripts = sortBy(
    manuscripts,
    manuscript => -manuscript.created,
  )
  return (
    <Formik initialValues={initialValues}>
      {({ values, handleChange }) => {
        return (
          <Root {...rest}>
            <Content>
              <SearchBar>
                <SearchIcon icon="search" color="#818284" />
                <InputForm
                  name="searchValue"
                  value={values.searchValue}
                  onChange={handleChange}
                />
                <InputSelect
                  name="searchType"
                  type="text"
                  options={['title', 'abstract', 'articleType']}
                  widthInput={10}
                  width={10}
                  ml={0.5}
                  value={values.searchType}
                  onChange={handleChange}
                />
              </SearchBar>
              {sortedManuscripts
                .filter(manuscript =>
                  manuscript[values.searchType]
                    .toLowerCase()
                    .includes(values.searchValue.toLowerCase()),
                )
                .map(manuscript => (
                  <ManuscriptCard
                    key={manuscript._id}
                    manuscript={manuscript}
                  />
                ))}
            </Content>
          </Root>
        )
      }}
    </Formik>
  )
}

const Root = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  ${th.marginHelper};
  ${th.paddingHelper};
`
const Content = styled.div``
const SearchBar = styled.div`
  display: flex;
  padding-bottom: 1em;
`
const SearchIcon = styled(FontAwesomeIcon)`
  display: flex;
  align-self: center;
  margin-right: 0.5em;
  font-size: 1.5em;
`

export default Dashboard
