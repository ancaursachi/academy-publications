import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { th } from '../../component-ui'
import {
  PeerReviewCheckBar,
  InfoManuscript,
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
      <PeerReviewCheckBar
        tabButtons={['Information Manuscript', 'Review manuscript']}
      >
        <InfoManuscript
          submission={submission}
          totalManuscripts={totalManuscripts}
          currentManuscript={currentManuscript}
          setCurrentManuscript={setCurrentManuscript}
        />
        <div>hei</div>
      </PeerReviewCheckBar>
    </Root>
  )
}

const Root = styled.div`
  overflow: scroll;
  font-family: 'Nunito';

  ${th.marginHelper};
  ${th.paddingHelper};
`
export default EditorPeerReviewPage
