import React from 'react'
import { Formik } from 'formik'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { get, sortBy } from 'lodash'
import { th, Loader, SearchBar } from '../component-ui'
import { ManuscriptCardAssigned } from '../component-assigned-manuscripts'
import styled from 'styled-components'

const AssignedManuscripts = ({ history, ...rest }) => {
  const { data, loading } = useQuery(queries.getAssignedManuscripts)

  const initialValues = { searchValue: '', searchType: 'title' }
  const manuscripts = get(data, 'assignedManuscripts', [])
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
              <TitlePage>Review Process</TitlePage>
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
                  <ManuscriptCardAssigned
                    history={history}
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
const TitlePage = styled.div`
  font-size: 1.6em;
  font-weight: 600;
  width: 100%;
  padding-bottom: 1em;
  color: ${th.colorBlue};
`
export default AssignedManuscripts
