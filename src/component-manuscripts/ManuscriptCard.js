import React from 'react'
import { Card, Row, th, StatusTag } from '../component-ui'
import styled from 'styled-components'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'
import { get } from 'lodash'
import {
  RemoveProfessorModal,
  DeleteManuscript,
} from '../component-manuscripts'

const ManuscriptCard = ({ manuscript, history }) => {
  const {
    title,
    abstract,
    articleType,
    professorName,
    status,
    submissionId,
  } = manuscript

  const editorName = get(manuscript, 'editor.name', null)
  const handleSubmission = () => {
    history.push(`/manuscriptsDetails/${submissionId}`)
  }

  return (
    <StyledCard
      borderRadius={'5px 5px 5px 5px'}
      width={45}
      height={10}
      mt={0.5}
      mb={0.5}
      pt={1}
      pr={0.5}
      pl={0.5}
      pb={1}
    >
      <ButtonCard onClick={handleSubmission}>
        <Content>
          <Border>
            <Row>
              <Title>{title}</Title>
              <StatusTag status={status} />
            </Row>
            <ArticleType>{articleType}</ArticleType>
            {professorName ? (
              <EditorName>Editor: {editorName}</EditorName>
            ) : (
              <Abstract>Abstract: {abstract}</Abstract>
            )}
          </Border>
        </Content>
      </ButtonCard>

      <RowStyled justify="flex-end" alignItems="flex-end" mt={0.5}>
        {editorName && <RemoveProfessorModal manuscript={manuscript} />}
        <DeleteManuscript manuscript={manuscript} />
      </RowStyled>
    </StyledCard>
  )
}
const StyledCard = styled(Card)`
  position: relative;
`
const Content = styled.div`
  display: flex;
  font-family: 'Nunito';
  height: 100%;
  align-items: center;
  flex-wrap: wrap;
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
const RowStyled = styled(Row)`
  bottom: 2px;
  right: 45px;
  position: absolute;
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

const Abstract = styled.div`
  font-size: 0.8em;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${th.colorGrey};
`
const EditorName = styled.div`
  font-size: 0.9em;
  width: 100%;
  color: ${th.colorBlueGray};
  font-weight: bold;
`
const ButtonCard = styled.button`
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

export default compose(mutations)(ManuscriptCard)
