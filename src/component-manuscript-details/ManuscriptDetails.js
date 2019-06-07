import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { get, last } from 'lodash'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { th, Loader, Button, Row } from '../component-ui'
import {
  ManuscriptDetailsCard,
  EditorMakeDecisionCard,
  EditorDecisionCard,
  RevisionManuscriptCard,
} from '../component-manuscript-details'

const ManuscriptDetails = ({ match, ...rest }) => {
  let [currentManuscript, setCurrentManuscript] = useState(0)
  let [totalManuscripts, setTotalManuscripts] = useState(0)

  const { submissionId } = match.params
  const { data, loading } = useQuery(queries.getSubmission, {
    variables: { submissionId },
  })
  const submission = get(data, 'getSubmission', [])
  const manuscript = submission[currentManuscript - 1]
  const editorDecision = get(manuscript, 'editor.decision', null)
  const userRole = get(manuscript, 'userRole', null)
  const status = get(manuscript, 'status', null)

  useEffect(() => {
    if (!submission) return
    setTotalManuscripts(submission.length)
    setCurrentManuscript(submission.length)
  }, [submission])
  const goToPrevPage = () =>
    currentManuscript > 1 && setCurrentManuscript(currentManuscript - 1)
  const goToNextPage = () =>
    currentManuscript < totalManuscripts &&
    setCurrentManuscript(currentManuscript + 1)
  return (
    <Root {...rest}>
      <Column />
      {loading && !manuscript ? (
        <RootLoader {...rest}>
          <Loader iconSize={2} />
        </RootLoader>
      ) : (
        <Container>
          <ChangeVersion>
            <Button
              mt={1}
              iconLeft
              underline
              name="Prev"
              color={th.colorGrey}
              iconName={'arrow-left'}
              onClick={goToPrevPage}
            />
            <DisplayCurrentVersion>
              Version {currentManuscript}
            </DisplayCurrentVersion>
            <Button
              mt={1}
              iconRight
              underline
              name="Next"
              color={th.colorGrey}
              iconName={'arrow-right'}
              onClick={goToNextPage}
            />
          </ChangeVersion>
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
const ChangeVersion = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2em;
  font-family: 'Nunito';
`
const DisplayCurrentVersion = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: 800;
  padding: 0px 10px;
  font-family: 'Nunito';
  font-size: 18px;
`

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
