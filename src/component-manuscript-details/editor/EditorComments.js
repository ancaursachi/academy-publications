import React from 'react'
import styled from 'styled-components'
import { get, chain, map, sortBy } from 'lodash'
import { th, DetailsCard } from '../../component-ui'
import { queries } from '../../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'

const CommentPageCard = ({ manuscript, comments, ...rest }) => {
  const sortedComents = sortBy(comments, comments => -comments.created)
  return (
    <DetailsCard mt={1} mb={1}>
      <Page>Page {comments[0].page}</Page>
      {map(sortedComents, comment => (
        <Card key={comment._id}>{comment.text}</Card>
      ))}
    </DetailsCard>
  )
}
const EditorComments = ({ manuscript, ...rest }) => {
  const { data } = useQuery(queries.getManuscriptComments, {
    variables: { manuscriptId: manuscript._id },
  })
  const comments = get(data, 'manuscriptComments')
  const groupedComments = chain(comments)
    .groupBy('page')
    .value()

  return (
    <Root>
      <Title>Your Comments</Title>
      {map(groupedComments, comments => (
        <CommentPageCard key={comments[0].page} comments={comments} />
      ))}
    </Root>
  )
}

const Card = styled.div`
  background-color: whitesmoke;
  border-radius: 4px;
  margin: 20px 0px;
  padding: 0.5em 0.5em;
  border: 1px solid ${th.colorCremLight};
`

const Root = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  font-family: 'Nunito';
`
const Title = styled.div`
  padding-top: 15px;
  padding-bottom: 8px;
  font-size: 25px;
  font-weight: 600;
  color: ${th.colorBlueLight};
`
const Page = styled.div`
  font-size: 20px;
  font-weight: 600;
`
export default EditorComments
