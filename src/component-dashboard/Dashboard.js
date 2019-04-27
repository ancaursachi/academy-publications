import React from 'react'
import { Formik } from 'formik'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { get, sortBy } from 'lodash'
import { th, Loader, SearchBar } from '../component-ui'
import { ManuscriptCard } from '.'
import styled from 'styled-components'

const Dashboard = ({ ...rest }) => {
  const { data, loading } = useQuery(queries.getUnassignedManuscripts)

  const initialValues = { searchValue: '', searchType: 'title' }
  const manuscripts = get(data, 'unassignedManuscripts', [])
  const sortedManuscripts = sortBy(
    manuscripts,
    manuscript => -manuscript.created,
  )

  if (loading) {
    return (
      <Root {...rest}>
        <Loader />
      </Root>
    )
  }
  return (
    <Formik initialValues={initialValues}>
      {({ values, handleChange }) => {
        return (
          <Root {...rest}>
            <Content>
              <SearchBar
                values={values}
                handleChange={handleChange}
                options={['title', 'abstract', 'articleType']}
              />
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

export default Dashboard
