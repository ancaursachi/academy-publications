import React, { useState } from 'react'
import styled from 'styled-components'
import { get, chain, map, sortBy } from 'lodash'
import { th, DetailsCard, ChatQuestion, ChatReply } from '../../component-ui'
import { queries, mutations } from '../../qraphqlClient'
import { compose } from 'recompose'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Comment = ({ comment, isLastManuscript, manuscript, addReply }) => {
  const replies = get(comment, 'reply')
  const [visibleComment, setVisibleComment] = useState(false)
  const [replyText, setReplyText] = useState('')

  const handleAuthorAnswer = values => {
    return addReply({
      variables: {
        input: {
          commentId: comment._id,
          text: replyText,
        },
      },
      refetchQueries: [
        {
          query: queries.getManuscriptComments,
          variables: { manuscriptId: manuscript._id },
        },
      ],
    }).then(() => setReplyText(''))
  }
  return (
    <Card>
      <ChatQuestion
        comment={comment}
        isLastManuscript={isLastManuscript}
        manuscript={manuscript}
        visibleComment={visibleComment}
        setVisibleComment={setVisibleComment}
      />
      {map(replies, reply => (
        <ChatReply role={reply.role} key={reply._id}>
          {reply.text}
        </ChatReply>
      ))}
      {visibleComment && (
        <ChatReply writeReply>
          <AuthorComment
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
          />
          <Actions>
            <AnswerButton onClick={handleAuthorAnswer}>
              <IconRight icon={'arrow-right'} color="inherit" />
            </AnswerButton>
          </Actions>
        </ChatReply>
      )}
    </Card>
  )
}

const CommentPageCard = ({
  manuscript,
  isLastManuscript,
  comments,
  addReply,
}) => {
  const sortedComents = sortBy(comments, comments => -comments.created)
  return (
    <DetailsCard mt={1} mb={1}>
      <Page>Page {comments[0].page}</Page>
      {map(sortedComents, comment => (
        <Comment
          key={comment._id}
          comment={comment}
          addReply={addReply}
          manuscript={manuscript}
          isLastManuscript={isLastManuscript}
        />
      ))}
    </DetailsCard>
  )
}

const Comments = ({ manuscript, comments, isLastManuscript, addReply }) => {
  const groupedComments = chain(comments)
    .groupBy('page')
    .value()

  return (
    <Root>
      {groupedComments.length && <Title>Editor Comments</Title>}
      {map(groupedComments, comments => (
        <CommentPageCard
          key={comments[0].page}
          comments={comments}
          manuscript={manuscript}
          addReply={addReply}
          isLastManuscript={isLastManuscript}
        />
      ))}
    </Root>
  )
}
const Card = styled.div`
  margin: 25px 0px;
  font-style: 'Nunito';
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

export default compose(mutations)(Comments)
