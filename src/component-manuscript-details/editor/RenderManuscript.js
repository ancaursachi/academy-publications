import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { th, Loader } from '../../component-ui'
import {
  ManuscriptDetailsCard,
  EditorMakeDecisionCard,
  EditorDecisionCard,
  ChangePage,
  SideBarReview,
} from '../../component-manuscript-details'

const RenderManuscript = ({
  submission,
  totalManuscripts,
  currentManuscript,
  setCurrentManuscript,
  ...rest
}) => {
  const manuscript = submission[currentManuscript - 1]
  const editorDecision = get(manuscript, 'editor.decision', null)
  const userRole = get(manuscript, 'userRole', null)

  return (
    <Root {...rest}>
      <div>hei</div>
      <SideBarReview />
    </Root>
  )
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
`

const Root = styled.div`
  overflow: scroll;
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
