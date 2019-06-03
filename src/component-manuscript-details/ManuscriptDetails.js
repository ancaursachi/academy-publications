import React from 'react'
import styled from 'styled-components'
import { get, last } from 'lodash'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { th, Loader } from '../component-ui'
import {
  ManuscriptDetailsCard,
  EditorMakeDecisionCard,
  EditorDecisionCard,
  RevisionManuscriptCard,
} from '../component-manuscript-details'

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
  const editorDecision = get(manuscript, 'editor.decision', null)
  const userRole = get(manuscript, 'userRole', null)
  const status = get(manuscript, 'status', null)

  console.log(manuscript)

  return (
    <Root {...rest}>
      <Container>
        {manuscript && <ManuscriptDetailsCard manuscript={manuscript} pb={2} />}
        {!editorDecision && userRole === 'professor' && (
          <EditorMakeDecisionCard manuscript={manuscript} pb={2} />
        )}
        {editorDecision && (
          <EditorDecisionCard manuscript={manuscript} pb={2} />
        )}
        {userRole === 'user' && status === 'revision' && (
          <RevisionManuscriptCard manuscript={manuscript} pb={2} />
        )}
      </Container>
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
const Container = styled.div``

export default ManuscriptDetails
