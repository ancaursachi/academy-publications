import React from 'react'
import styled from 'styled-components'
import { get, last } from 'lodash'
import { Loader } from '../../component-ui'
import { useQuery } from 'react-apollo-hooks'
import { queries } from '../../qraphqlClient'
import {
  ManuscriptDetailsCard,
  EditorDecisionCard,
  ChangePage,
  Comments,
} from '../../component-manuscript-details'

const ManuscriptAuthorTab = ({
  submission,
  totalManuscripts,
  currentManuscript,
  setCurrentManuscript,
  ...rest
}) => {
  const manuscript = submission[currentManuscript - 1]

  if (!manuscript) {
    return (
      <RootLoader>
        <Loader iconSize={2} />
      </RootLoader>
    )
  }
  const editorDecision = get(manuscript, 'editor.decision', null)
  const isLastManuscript =
    get(submission[currentManuscript - 1], '_id') ===
    get(last(submission), '_id')

  const { data } = useQuery(queries.getEditorComments, {
    variables: { manuscriptId: manuscript._id },
  })
  const comments = get(data, 'editorComments')

  return (
    <Root>
      <Wrapper>
        <Column />
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

          {currentManuscript < totalManuscripts && (
            <Comments
              manuscript={manuscript}
              comments={comments}
              isLastManuscript={isLastManuscript}
            />
          )}
        </Container>
        <Column />
      </Wrapper>
    </Root>
  )
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
`

const Root = styled.div`
  padding-top: 25px;
  overflow: scroll;
  height: calc(100vh - 90px);
  font-family: 'Nunito';
`
const Container = styled.div``
const Column = styled.div``

const RootLoader = styled.div`
  padding-top: 25px;
  display: flex;
  justify-content: center;
  font-family: 'Nunito';
`
export default ManuscriptAuthorTab
