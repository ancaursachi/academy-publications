import React from 'react'
import { Card, Row, th, StatusTag } from '../component-ui'
import styled from 'styled-components'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'
import { DeleteUserManuscript } from '../component-user-manuscripts'

const UserManuscriptCard = ({ manuscript }) => {
  const { title, articleType, abstract, professorName, status } = manuscript
  return (
    <Card
      borderRadius={'5px 5px 5px 5px'}
      width={45}
      height={10}
      mt={0.5}
      mb={0.5}
      pt={1}
      pr={1}
      pl={1}
      pb={1}
    >
      <Content>
        <Border>
          <Row>
            <Title>{title ? title : 'Draft'}</Title>
            <StatusTag status={status} />
          </Row>
          <ArticleType>{articleType}</ArticleType>
          {professorName ? (
            <EditorName>Professor: {professorName}</EditorName>
          ) : (
            <Abstract>{abstract ? `Abstract: ${abstract}` : ''}</Abstract>
          )}
          <Row
            justify="flex-end"
            alignItems="flex-end"
            mt={abstract ? 0.5 : 1.8}
          >
            <DeleteUserManuscript manuscript={manuscript} />
          </Row>
        </Border>
      </Content>
    </Card>
  )
}
const Content = styled.div`
  display: flex;
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
const Title = styled.div`
  font-size: 1.3em;
  width: 100%;
  color: ${th.colorBlue};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

export default compose(mutations)(UserManuscriptCard)
