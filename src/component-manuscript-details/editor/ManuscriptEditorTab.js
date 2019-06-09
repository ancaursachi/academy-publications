import React from 'react'
import styled from 'styled-components'
import { get, last } from 'lodash'
import { Loader } from '../../component-ui'
import {
  ManuscriptDetailsCard,
  EditorDecisionCard,
  Comments,
  ChangePage,
} from '../../component-manuscript-details'

const ManuscriptEditorTab = ({
  submission,
  totalManuscripts,
  currentManuscript,
  setCurrentManuscript,
  ...rest
}) => {
  const manuscript = submission[currentManuscript - 1]
  const editorDecision = get(manuscript, 'editor.decision', null)
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

            {editorDecision && currentManuscript < totalManuscripts && (
              <EditorDecisionCard manuscript={manuscript} mb={2} />
            )}
            {currentManuscript < totalManuscripts && (
              <Comments manuscript={manuscript} />
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
export default ManuscriptEditorTab
