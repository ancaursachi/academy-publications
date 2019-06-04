import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { th, DetailsCard } from '../component-ui'

const parseText = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const EditorDecisionCard = ({ manuscript, ...rest }) => {
  const editorDecision = get(manuscript, 'editor.decision', null)
  const editorComment = get(manuscript, 'editor.comment', null)

  return (
    <DetailsCard {...rest}>
      <Title>Editor response</Title>

      <Label>Decision</Label>
      <Data>{parseText(editorDecision)}</Data>

      <Label>Comment</Label>
      <Data>{parseText(editorComment)}</Data>
    </DetailsCard>
  )
}

const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: ${th.colorBlueLight};
`
const Data = styled.div`
  font-size: 16px;
  padding: 0px 0px 16px;
`
const Label = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding: 16px 0px 0px;
`
export default EditorDecisionCard
