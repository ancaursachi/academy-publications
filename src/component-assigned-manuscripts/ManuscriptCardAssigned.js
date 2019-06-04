import React from 'react'
import { Card, Row, th, StatusTag } from '../component-ui'
import styled from 'styled-components'
import { get } from 'lodash'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'
import { RemoveProfessorModal } from '../component-assigned-manuscripts'

const ManuscriptCardAssigned = ({ manuscript, history }) => {
  const { submissionId, title, articleType, status, abstract } = manuscript
  const editorName = get(manuscript, 'editor.name', null)
  const handleSubmission = () => {
    history.push(`/manuscriptsDetails/${submissionId}`)
  }

  return (
    <StyledCard>
      <ButtonCard onClick={handleSubmission}>
        <Border>
          <Row>
            <Title>{title}</Title>
            <StatusTag status={status} />
          </Row>
          <ArticleType>{articleType}</ArticleType>
          <EditorName>Editor: {editorName}</EditorName>
          <Abstract>{abstract}</Abstract>
        </Border>
      </ButtonCard>
      <RowStyled justify="flex-end" alignItems="flex-end">
        <RemoveProfessorModal manuscript={manuscript} />
      </RowStyled>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  position: relative;
  border-radius: 5px;
  font-family: 'Nunito';
  padding: 0.5em;
  margin: 1em 0em;
`

const RowStyled = styled(Row)`
  position: relative;
`
const ButtonCard = styled.button`
  padding: 0.5em;
  height: 100%;
  width: 100%;
  text-align: initial;
  background-color: transparent;
  border: none;
  text-decoration: none;
  :focus {
    outline: none;
  }
`
const Border = styled.div`
  height: 100%;
  width: 100%;
  border-style: solid;
  border-color: ${th.colorCremLight};
  border-width: 1px;
  border-radius: 5px 5px 5px 5px;
  padding: 1em;
`
const Title = styled.div`
  font-size: 1.3em;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${th.colorBlue};
`
const ArticleType = styled.div`
  font-size: 0.9em;
  padding-bottom: 0.7em;
`

const EditorName = styled.div`
  padding-bottom: 0.5em;
  font-size: 0.9em;
  width: 100%;
  color: ${th.colorBlueGray};
  font-weight: bold;
`
const Abstract = styled.div`
  font-size: 0.8em;
  width: 100%;
  overflow: hidden;
`

export default compose(mutations)(ManuscriptCardAssigned)
