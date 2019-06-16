import React from 'react'
import styled from 'styled-components'
import { th } from '../../component-ui'
import { last, get } from 'lodash'
import {
  CheckBar,
  BotCommentsTab,
  EditorCommentsTab,
  FinalDecisionTab,
  ManuscriptEditorTab,
  RenderManuscriptTab,
} from '../../component-manuscript-details'

const EditorPeerReviewPage = ({
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
          ['publish', 'reject'].includes(editorDecision)
            ? [
                'Information Manuscript',
                'Spell Check',
                'Editor Comments',
                'Your Decision',
              ]
            : [
                'Information Manuscript',
                'Spell Check',
                'Review manuscript',
                'Editor Comments',
                'Your Decision',
              ]
        }
        selectedTab={0}
      >
        <ManuscriptEditorTab
          submission={submission}
          totalManuscripts={totalManuscripts}
          currentManuscript={currentManuscript}
          setCurrentManuscript={setCurrentManuscript}
        />
        <BotCommentsTab submission={submission} />
        {!['publish', 'reject'].includes(editorDecision) && (
          <RenderManuscriptTab submission={submission} />
        )}
        <EditorCommentsTab submission={submission} />
        <FinalDecisionTab
          submission={submission}
          totalManuscripts={totalManuscripts}
          currentManuscript={currentManuscript}
          setCurrentManuscript={setCurrentManuscript}
        />
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
export default EditorPeerReviewPage
