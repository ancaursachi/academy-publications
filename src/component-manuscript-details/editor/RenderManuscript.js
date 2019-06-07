import React from 'react'
import styled from 'styled-components'
import { last } from 'lodash'
import { th } from '../../component-ui'
import { SideBarReview } from '../../component-manuscript-details'

import { PdfRender } from '../../component-pdf-viewer'

const RenderManuscript = ({ submission, ...rest }) => {
  const manuscript = last(submission)
  return (
    <Root {...rest}>
      <PdfContainer>
        <PdfRender manuscript={manuscript} pb={2} />
      </PdfContainer>
      <SideBarReview manuscript />
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
  height: calc(100vh - 104px);
  display: grid;
  grid-template-columns: 70% 30%;
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
export default RenderManuscript
