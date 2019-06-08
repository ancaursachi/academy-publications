import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { th, Loader } from '../../component-ui'
import { ManuscriptDetailsCard, EditorDecisionCard, ChangePage } from '..'

const InfoManuscriptTab = ({
  submission,
  totalManuscripts,
  currentManuscript,
  setCurrentManuscript,
  ...rest
}) => {
  const manuscript = submission[currentManuscript - 1]
  const editorDecision = get(manuscript, 'editor.decision', null)

  return (
    <Root {...rest}>
      <Wrapper>
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
  overflow: scroll;
  height: calc(100vh - 90px);
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
export default InfoManuscriptTab
