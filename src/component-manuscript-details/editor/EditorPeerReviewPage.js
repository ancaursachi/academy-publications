import React from 'react'
import styled from 'styled-components'
import { th } from '../../component-ui'
import {
  CheckBar,
  InfoManuscript,
  RenderManuscript,
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
      <CheckBar tabButtons={['Information Manuscript', 'Review manuscript']}>
        <InfoManuscript
          mt={1}
          submission={submission}
          totalManuscripts={totalManuscripts}
          currentManuscript={currentManuscript}
          setCurrentManuscript={setCurrentManuscript}
        />
        <RenderManuscript submission={submission} />
      </CheckBar>
    </Root>
  )
}

const Root = styled.div`
  /* overflow: hidden; */
  height: calc(100vh);
  font-family: 'Nunito';
  ${th.paddingHelper};
  ${th.marginHelper};
`
export default EditorPeerReviewPage
