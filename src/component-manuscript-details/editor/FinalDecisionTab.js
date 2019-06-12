import React from 'react'
import styled from 'styled-components'
import { get, last } from 'lodash'
import { Loader } from '../../component-ui'
import {
  EditorDecisionCard,
  EditorMakeDecisionCard,
  ActualManuscriptOverview,
} from '../../component-manuscript-details'

const FinalDecisionTab = ({
  submission,

  totalManuscripts,
  currentManuscript,
  setCurrentManuscript,
  ...rest
}) => {
  const manuscript = last(submission)
  const editorDecision = get(manuscript, 'editor.decision', null)
  const userRole = get(manuscript, 'userRole', null)

  return (
    <Root>
      <Wrapper>
        <Column />
        {!manuscript ? (
          <RootLoader>
            <Loader iconSize={2} />
          </RootLoader>
        ) : (
          <Container>
            {!editorDecision && userRole === 'professor' && (
              <EditorMakeDecisionCard manuscript={manuscript} mb={2} />
            )}
            {editorDecision && (
              <EditorDecisionCard manuscript={manuscript} mb={1} />
            )}
            {editorDecision && (
              <ActualManuscriptOverview submission={submission} mb={2} />
            )}
          </Container>
        )}
        <Column />
      </Wrapper>
    </Root>
  )
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;
`

const Root = styled.div`
  height: calc(100vh - 90px);
  padding-top: 50px;
  overflow: scroll;
  font-family: 'Nunito';
`
const Container = styled.div``
const Column = styled.div``

const RootLoader = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Nunito';
  padding-top: 25px;
`
export default FinalDecisionTab
