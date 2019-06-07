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
}) => {
  return (
    <Root>
      <PeerReviewCheckBar
        tabButtons={['Information Manuscript', 'Review manuscript']}
      >
        <InfoManuscript
          mt={1}
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
  padding-top: 3em;
  overflow: scroll;
  font-family: 'Nunito';

  ${th.marginHelper};
`
export default EditorPeerReviewPage
