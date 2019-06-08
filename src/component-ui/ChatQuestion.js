import React from 'react'
import styled from 'styled-components'
import { th } from '../component-ui'

const ChatQuestion = ({ comment, visibleComment, setVisibleComment }) => {
  return (
    <Root>
      <Question visibleComment={visibleComment}>
        <Comment> {comment.text}</Comment>
        <Actions>
          <Button onClick={() => setVisibleComment(!visibleComment)}>
            Reply
          </Button>
        </Actions>
      </Question>
    </Root>
  )
}

const Root = styled.div``
const Question = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: whitesmoke;
  border-radius: 15px 15px 15px 0px;
  margin: 5px 0px;
  padding: 0.5em 0.5em;
  border: 1px solid ${th.colorCremLight};
`
const Actions = styled.div`
  display: flex;
`
const Comment = styled.div`
  font-weight: 600;
`

const Button = styled.button`
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
export default ChatQuestion
