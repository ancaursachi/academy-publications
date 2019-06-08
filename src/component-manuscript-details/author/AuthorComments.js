import React, { useState } from 'react'
import styled from 'styled-components'
import { get, chain, map, sortBy } from 'lodash'
import { th, DetailsCard } from '../../component-ui'
import { queries } from '../../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Comment = ({ comment }) => {
  const [visibleComment, setVisibleComment] = useState(false)
  const [authorAnswer, setAuthorAnswer] = useState('')
  console.log(authorAnswer)
  return (
    <RootComment>
      <Card>
        <EditorComment> {comment.editorComment}</EditorComment>
        <Actions>
          <AnswerButton onClick={() => setVisibleComment(!visibleComment)}>
            Answer
          </AnswerButton>
        </Actions>
      </Card>
      {visibleComment && (
        <WriteAnswer>
          <AuthorComment
            value={authorAnswer}
            onChange={e => setAuthorAnswer(e.target.value)}
          />
          <Actions>
            <AnswerButton onClick={() => setVisibleComment(!visibleComment)}>
              <IconRight icon={'arrow-right'} color="inherit" />
            </AnswerButton>
          </Actions>
        </WriteAnswer>
      )}
    </RootComment>
  )
}

const CommentPageCard = ({ manuscript, comments }) => {
  const sortedComents = sortBy(comments, comments => -comments.created)
  return (
    <DetailsCard mt={1} mb={1}>
      <Page>Page {comments[0].page}</Page>
      {map(sortedComents, comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </DetailsCard>
  )
}

const AuthorComments = ({ manuscript }) => {
  const { data } = useQuery(queries.getManuscriptComments, {
    variables: { manuscriptId: manuscript._id },
  })
  const comments = get(data, 'manuscriptComments')
  const groupedComments = chain(comments)
    .groupBy('page')
    .value()

  return (
    <Root>
      {groupedComments.length && <Title>Editor Comments</Title>}
      {map(groupedComments, comments => (
        <CommentPageCard key={comments[0].page} comments={comments} />
      ))}
    </Root>
  )
}

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: whitesmoke;
  border-radius: 4px;
  margin: 10px 0px;
  padding: 0.5em 0.5em;
  border: 1px solid ${th.colorCremLight};
`
const RootComment = styled.div``
const WriteAnswer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px 4px 12px 12px;
  padding: 0.5em 0.5em;
  border: 1px solid #e1cda4;
  margin-bottom: 20px;
`

const AnswerButton = styled.button`
  background-color: transparent;
  border: none;
  font-weight: 600;
  text-decoration: none;
  font-family: 'Nunito';
  font-size: 14px;
  padding-right: 1em;
  :focus {
    outline: none;
  }
  :hover {
    color: ${th.colorCremLight};
  }
  :active {
    color: ${th.colorCremLight};
  }
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
const EditorComment = styled.div``
const Actions = styled.div`
  display: flex;
`

const IconRight = styled(FontAwesomeIcon)`
  margin: 0em 0em 0em 0.5em;
`
const AuthorComment = styled.textarea`
  flex: 1;
  border: none;
  :focus {
    outline: none;
  }
  :hover {
    outline: none;
  }
  :active {
    outline: none;
  }
`

export default AuthorComments
