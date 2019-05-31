import React from 'react'
import styled from 'styled-components'
import { get, last } from 'lodash'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { th, Loader } from '../component-ui'
import { ManuscriptDetailsCard } from '../component-manuscript-details'

const ManuscriptDetails = ({ match, ...rest }) => {
  const { submissionId } = match.params
  const { data, loading } = useQuery(queries.getSubmission, {
    variables: { submissionId },
  })

  if (loading) {
    return (
      <Root {...rest}>
        <Loader />
      </Root>
    )
  }

  const manuscript = last(get(data, 'getSubmission', []))

  return (
    <Root {...rest}>
      {manuscript && <ManuscriptDetailsCard manuscript={manuscript} />}
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  font-family: 'Nunito';
  justify-content: center;

  ${th.marginHelper};
  ${th.paddingHelper};
`

export default ManuscriptDetails
