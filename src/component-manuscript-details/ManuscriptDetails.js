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

  const manuscript = last(get(data, 'getSubmission', []))
  const editorDecision = get(manuscript, 'editor.decision', null)
  const userRole = get(manuscript, 'userRole', null)
  const status = get(manuscript, 'status', null)

  return (
    <Root {...rest}>
      <Column />
      {loading ? (
        <RootLoader {...rest}>
          <Loader iconSize={2} />
        </RootLoader>
      ) : (
        <Container>
          {manuscript && (
            <ManuscriptDetailsCard manuscript={manuscript} mb={2} />
          )}
          {!editorDecision && userRole === 'professor' && (
            <EditorMakeDecisionCard manuscript={manuscript} mb={2} />
          )}
          {editorDecision && (
            <EditorDecisionCard manuscript={manuscript} mb={2} />
          )}
          {userRole === 'user' && status === 'revision' && (
            <RevisionManuscriptCard manuscript={manuscript} mb={2} />
          )}
        </Container>
      )}
      <Column />
    </Root>
  )
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
  font-family: 'Nunito';

  ${th.marginHelper};
  ${th.paddingHelper};
`
const Container = styled.div``
const Column = styled.div``

const RootLoader = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Nunito';
  ${th.marginHelper};
  ${th.paddingHelper};
`
export default ManuscriptDetails
