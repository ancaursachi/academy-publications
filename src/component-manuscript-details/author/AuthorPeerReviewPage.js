import React from 'react'
import styled from 'styled-components'
import { th } from '../../component-ui'
import { get, last } from 'lodash'
import {
  CheckBar,
  RevisionTab,
  CommentsTab,
  ManuscriptAuthorTab,
} from '../../component-manuscript-details'

const AuthorPeerReviewPage = ({
  submission,
  totalManuscripts,
  currentManuscript,
  setCurrentManuscript,
  ...rest
}) => {
  const manuscript = last(submission)
  const editorDecision = get(manuscript, 'editor.decision', null)

  return (
    <Root {...rest}>
      <CheckBar
        tabButtons={
          editorDecision === 'revision'
            ? ['Information Manuscript', 'All Comments', 'Sent a new version ']
            : ['Information Manuscript', 'All Comments']
        }
        selectedTab={editorDecision === 'revision' ? 1 : 0}
      >
        <ManuscriptAuthorTab
          submission={submission}
          totalManuscripts={totalManuscripts}
          currentManuscript={currentManuscript}
          setCurrentManuscript={setCurrentManuscript}
        />
        <CommentsTab submission={submission} />
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
