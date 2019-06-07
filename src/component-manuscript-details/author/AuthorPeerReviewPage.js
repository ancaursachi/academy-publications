import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { queries } from '../../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { th, Loader } from '../../component-ui'
import {
  ManuscriptDetailsCard,
  EditorMakeDecisionCard,
  EditorDecisionCard,
  RevisionManuscriptCard,
  PeerReviewCheckBar,
  ChangePage,
} from '..'

const AuthorPeerReviewPage = ({ submission, ...rest }) => {
  let [currentManuscript, setCurrentManuscript] = useState(0)
  let [totalManuscripts, setTotalManuscripts] = useState(0)

  const manuscript = submission[currentManuscript - 1]
  const editorDecision = get(manuscript, 'editor.decision', null)
  const userRole = get(manuscript, 'userRole', null)
  const status = get(manuscript, 'status', null)

  useEffect(() => {
    if (!submission) return
    setTotalManuscripts(submission.length)
    setCurrentManuscript(submission.length)
  }, [submission])

  return (
    <Root {...rest}>
      <Column />
      {!manuscript ? (
        <RootLoader {...rest}>
          <Loader iconSize={2} />
        </RootLoader>
      ) : (
        <Container>
          {manuscript && submission.length > 1 && (
            <ChangePage
              currentManuscript={currentManuscript}
              totalManuscripts={totalManuscripts}
              setCurrentManuscript={setCurrentManuscript}
            />
          )}
          {manuscript && (
            <ManuscriptDetailsCard manuscript={manuscript} mb={2} />
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
  overflow: scroll;
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
export default AuthorPeerReviewPage
