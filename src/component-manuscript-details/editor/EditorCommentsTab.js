import React from 'react'
import styled from 'styled-components'
import { last, get } from 'lodash'
import { Comments } from '..'
import { mutations, queries } from '../../qraphqlClient'
import { EmptyError } from '../../component-ui'
import { compose } from 'recompose'
import { useQuery } from 'react-apollo-hooks'

const EditorCommentsTab = ({ submission, addReply }) => {
  const manuscript = last(submission)
  const { data } = useQuery(queries.getEditorComments, {
    variables: { manuscriptId: manuscript._id },
  })
  const comments = get(data, 'editorComments')

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
// const EmptyError = styled.div``
const Column = styled.div``
export default compose(mutations)(EditorCommentsTab)
