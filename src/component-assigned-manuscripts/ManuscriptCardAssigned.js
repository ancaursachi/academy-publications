import React from 'react'
import { Card, Row, th, StatusTag } from '../component-ui'
import styled from 'styled-components'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'
import { RemoveProfessorModal } from '../component-assigned-manuscripts'

const ManuscriptCardAssigned = ({ manuscript, history }) => {
  const { submissionId, title, articleType, professorName, status } = manuscript

  const handleReview = () => {
    history.push(`/manuscriptsDetails/${submissionId}`)
  }

  return (
    <Card
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
      <ButtonCard onClick={handleReview}>
        <Content>
          <Border>
            <Row>
              <Title>{title}</Title>
              <StatusTag status={status} />
            </Row>
            <ArticleType>{articleType}</ArticleType>
            <EditorName>Professor: {professorName}</EditorName>
          </Border>
        </Content>
      </ButtonCard>
      <RowStyled justify="flex-end" alignItems="flex-end" mt={0.5}>
        <RemoveProfessorModal manuscript={manuscript} />
      </RowStyled>
    </Card>
  )
}

const Content = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-wrap: wrap;
`
const RowStyled = styled(Row)`
  position: relative;
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
  font-size: 0.9em;
  width: 100%;
  color: ${th.colorBlueGray};
  font-weight: bold;
`

export default compose(mutations)(ManuscriptCardAssigned)
