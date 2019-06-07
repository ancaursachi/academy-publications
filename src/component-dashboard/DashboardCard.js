import React from 'react'
import { Card, th, File } from '../component-ui'
import styled from 'styled-components'
import { compose } from 'recompose'
import { mutations } from '../qraphqlClient'
import { get } from 'lodash'

const DashboardCard = ({ manuscript, history }) => {
  const { _id, title, articleType, abstract } = manuscript

  const editorName = get(manuscript, 'editor.name', null)
  const authorName = get(manuscript, 'author.name', null)
  const file = get(manuscript, 'file', null)
  const handleReview = () => {
    history.push(`/publicManuscripts/${_id}`)
  }

  return (
    <StyledCard>
      <ButtonCard onClick={handleReview}>
        <Border>
          <Title>{title}</Title>
          <ArticleType>{articleType}</ArticleType>
          {authorName && <AuthorName>Written by {authorName}</AuthorName>}
          {editorName && <EditorName>Editor: {editorName}</EditorName>}
          <Abstract>{abstract}</Abstract>
          <File file={file} mt={0.8} />
        </Border>
      </ButtonCard>
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
const Abstract = styled.div`
  font-size: 14px;
  width: 100%;
  overflow: hidden;
`
const AuthorName = styled.div`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-size: 0.9em;
  width: 100%;
  color: ${th.colorBlueGray};
  font-weight: bold;
`
const EditorName = styled.div`
  padding-bottom: 1em;
  font-size: 0.9em;
  width: 100%;
`

export default compose(mutations)(DashboardCard)
