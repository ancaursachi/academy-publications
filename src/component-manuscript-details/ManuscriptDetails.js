import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { th, Loader, Button } from '../component-ui'
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
          {manuscript && submission.length > 1 && (
            <ChangeVersion>
              {currentManuscript > 1 && (
                <Button
                  mt={1}
                  iconLeft
                  underline
                  name="Prev"
                  color={th.colorGrey}
                  iconName={'arrow-left'}
                  onClick={goToPrevPage}
                />
              )}
              <DisplayCurrentVersion>
                Version {currentManuscript}
              </DisplayCurrentVersion>
              {currentManuscript < totalManuscripts && (
                <Button
                  mt={1}
                  iconRight
                  underline
                  name="Next"
                  color={th.colorGrey}
                  iconName={'arrow-right'}
                  onClick={goToNextPage}
                />
              )}
            </ChangeVersion>
          )}
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
  margin-bottom: 1em;
  font-family: 'Nunito';
`
const DisplayCurrentVersion = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: 800;
  font-family: 'Nunito';
  margin: 16px 11px 0px;
  background-color: ${th.colorWhite};
  padding: 2px 3px;
  border-radius: 4px;
  border: 1px solid ${th.colorBlueLight};
  font-size: 15px;
  color: ${th.colorBlueLight};
  white-space: nowrap;
`

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
export default ManuscriptDetails
