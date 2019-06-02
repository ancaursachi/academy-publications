import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { th } from '../component-ui'

const parseText = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const ProfessorDecisionCard = ({ manuscript, ...rest }) => {
  const professorDecision = get(manuscript, 'professorDecision', null)
  const professorComment = get(manuscript, 'professorComment', null)

  return (
    <Root {...rest}>
      <Card pt={2} pr={2} pl={2} pb={2}>
        <Title>Editor response</Title>

        <Label>Decision</Label>
        <Data>{parseText(professorDecision)}</Data>

        <Label>Comment</Label>
        <Data>{parseText(professorComment)}</Data>
      </Card>
    </Root>
  )
}

const Card = styled.div`
  background-color: white;
  font-family: 'Nunito';
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '0px')};
  height: fit-content;
  width: 40px;
  width: 50em;
  ${th.marginHelper}
  ${th.paddingHelper}
`
const Root = styled.div`
  display: flex;
  font-family: 'Nunito';
  justify-content: center;

  ${th.marginHelper};
  ${th.paddingHelper};
`
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
export default ProfessorDecisionCard
