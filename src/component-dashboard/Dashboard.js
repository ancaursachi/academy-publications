import React from 'react'
import { Formik } from 'formik'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { get, sortBy } from 'lodash'
import { th, Loader, SearchBar, EmptyError } from '../component-ui'
import { DashboardCard } from '../component-dashboard'
import styled from 'styled-components'

const Dashboard = ({ history, ...rest }) => {
  const { data, loading } = useQuery(queries.getPublicManuscripts)

  const initialValues = { searchValue: '', searchType: 'title' }
  const manuscripts = get(data, 'publicManuscripts', [])
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
              <TitlePage>Dashboard</TitlePage>
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
                  <DashboardCard
                    key={manuscript._id}
                    manuscript={manuscript}
                    history={history}
                  />
                ))}
              {!manuscripts.length && (
                <EmptyError>No manuscripts published</EmptyError>
              )}
            </Content>
          </Root>
        )
      }}
    </Formik>
  )
}
const Root = styled.div`
  display: flex;
  font-family: 'Nunito';
  justify-content: center;
  flex-wrap: wrap;
  ${th.marginHelper};
  ${th.paddingHelper};
`
const Content = styled.div``
const TitlePage = styled.div`
  font-family: 'Nunito';
  font-size: 1.6em;
  font-weight: 600;
  width: 100%;
  padding-bottom: 1em;
  color: ${th.colorBlue};
`
export default Dashboard
