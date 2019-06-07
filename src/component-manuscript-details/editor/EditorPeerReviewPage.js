import React from 'react'
import styled from 'styled-components'
import { th } from '../../component-ui'
import {
  CheckBar,
  InfoManuscriptTab,
  FinalDecisionTab,
  RenderManuscriptTab,
} from '../../component-manuscript-details'

const EditorPeerReviewPage = ({
  submission,
  totalManuscripts,
  currentManuscript,
  setCurrentManuscript,
  ...rest
}) => {
  return (
    <Root {...rest}>
      <CheckBar
        tabButtons={[
          'Information Manuscript',
          'Review manuscript',
          'Your Decision',
        ]}
      >
        <InfoManuscriptTab
          mt={1}
          submission={submission}
          totalManuscripts={totalManuscripts}
          currentManuscript={currentManuscript}
          setCurrentManuscript={setCurrentManuscript}
        />
        <RenderManuscriptTab submission={submission} />
        <FinalDecisionTab
          mt={3}
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
