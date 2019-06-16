import React from 'react'
import styled from 'styled-components'
import { last, get } from 'lodash'
import { compose } from 'recompose'
import { useQuery } from 'react-apollo-hooks'
import { Comments } from '../../component-manuscript-details'
import { mutations, queries } from '../../qraphqlClient'
import { EmptyError, Loader } from '../../component-ui'

const BotCommentsTab = ({ submission, addReply }) => {
  const manuscript = last(submission)

  const { data } = useQuery(queries.getBotComments, {
    variables: { manuscriptId: manuscript._id },
  })
  const comments = get(data, 'botComments')

  if (!comments) {
    return (
      <RootLoader>
        <Loader iconSize={2} />
      </RootLoader>
    )
  }
  return (
    <Root>
      <Wrapper>
        <Column />
        {comments.length ? (
          <Comments
            manuscript={manuscript}
            comments={comments}
            isLastManuscript={true}
          />
        ) : (
          <EmptyError>No comments to display yet.</EmptyError>
        )}
        <Column />
      </Wrapper>
    </Root>
  )
}

const Root = styled.div`
  padding-top: 25px;
  overflow: scroll;
  height: calc(100vh - 90px);
  font-family: 'Nunito';
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
`
const Column = styled.div``

const RootLoader = styled.div`
  padding-top: 25px;
  display: flex;
  justify-content: center;
  font-family: 'Nunito';
`
export default compose(mutations)(BotCommentsTab)
