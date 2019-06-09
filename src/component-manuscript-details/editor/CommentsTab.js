import React from 'react'
import styled from 'styled-components'
import { last } from 'lodash'
import { Comments } from '../../component-manuscript-details'
import { mutations } from '../../qraphqlClient'
import { compose } from 'recompose'

const CommentsTab = ({ submission, addReply }) => {
  const manuscript = last(submission)

  return (
    <Root>
      <Wrapper>
        <Column />
        <Comments manuscript={manuscript} />
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
export default compose(mutations)(CommentsTab)
