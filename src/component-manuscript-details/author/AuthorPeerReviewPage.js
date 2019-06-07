import React from 'react'
import styled from 'styled-components'
import { th } from '../../component-ui'
import { get } from 'lodash'
import {
  CheckBar,
  InfoManuscriptTab,
  RevisionTab,
} from '../../component-manuscript-details'

const AuthorPeerReviewPage = ({
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
      <CheckBar
        tabButtons={
          editorDecision === 'revision'
            ? ['Information Manuscript', 'Sent a new version ']
            : ['Information Manuscript']
        }
        selectedTab={editorDecision === 'revision' ? 1 : 0}
      >
        <InfoManuscriptTab
          mt={1}
          submission={submission}
          totalManuscripts={totalManuscripts}
          currentManuscript={currentManuscript}
          setCurrentManuscript={setCurrentManuscript}
        />
        {editorDecision === 'revision' && (
          <RevisionTab
            submission={submission}
            totalManuscripts={totalManuscripts}
            currentManuscript={currentManuscript}
            setCurrentManuscript={setCurrentManuscript}
          />
        )}
      </CheckBar>
    </Root>
  )
}

const Root = styled.div`
  height: calc(100vh);
  font-family: 'Nunito';
  ${th.paddingHelper};
  ${th.marginHelper};
`
export default AuthorPeerReviewPage
