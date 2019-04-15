import React from 'react'
import { Card, Row, th, Button } from '../component-ui'
import styled from 'styled-components'

const ManuscriptCard = ({ manuscript: { title, abstract, articleType } }) => {
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
          <Title>{title}</Title>
          <ArticleType>{articleType}</ArticleType>
          <Abstract>{abstract}</Abstract>
          <Row justify="flex-end" alignItems="flex-end" mt={0.5}>
            <Button iconName={'times'} decisionDash color={th.colorRed} />
            <Button
              iconName={'check'}
              decisionDash
              color={th.colorGreenLight}
            />
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
  font-size: 1.5em;
  width: 100%;
  color: ${th.colorBlue};
`

const ArticleType = styled.div`
  font-size: 1.1em;
`

const Abstract = styled.div`
  font-size: 1em;
  width: 100%;
  color: ${th.colorGrey};
`

export default ManuscriptCard
