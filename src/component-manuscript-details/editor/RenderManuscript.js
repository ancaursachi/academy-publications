import React, { useState } from 'react'
import styled from 'styled-components'
import { last } from 'lodash'
import { th } from '../../component-ui'
import { SideBarReview } from '../../component-manuscript-details'

import { PdfRender } from '../../component-pdf-viewer'

const RenderManuscript = ({ submission, ...rest }) => {
  const manuscript = last(submission)
  let [totalPages, setTotalPages] = useState(0)
  let [currentPageNumber, setCurrentPageNumber] = useState(1)
  return (
    <Root {...rest}>
      <PdfContainer>
        <PdfRender
          manuscript={manuscript}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          currentPageNumber={currentPageNumber}
          setCurrentPageNumber={setCurrentPageNumber}
          pb={2}
        />
      </PdfContainer>
      <SideBarReview
        manuscript={manuscript}
        currentPageNumber={currentPageNumber}
      />
    </Root>
  )
}

const PdfContainer = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: center;
`

const Root = styled.div`
  overflow: scroll;
  height: calc(100vh - 90px);
  display: grid;
  grid-template-columns: 75% 25%;
  font-family: 'Nunito';

  ${th.marginHelper};
  ${th.paddingHelper};
`

export default RenderManuscript
