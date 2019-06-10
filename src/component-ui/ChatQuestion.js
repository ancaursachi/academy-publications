import React from 'react'
import styled from 'styled-components'
import { th } from '../component-ui'
import { get } from 'lodash'

const parseRole = role => {
  switch (role) {
    case 'user':
      return 'Author'
    case 'professor':
      return 'Editor'
    default:
      return role.charAt(0).toUpperCase() + role.slice(1)
  }
}

const BotComment = ({ comment }) => {
  console.log(JSON.parse(comment))
  const botComment = JSON.parse(comment)
  // return botComment.map(typo => (
  //   <RootBot key={typo.typo}>
  //     <Typo>{typo.typo}</Typo>
  //   </RootBot>
  // ))
  return <div>Bot comment</div>
}
const RootBot = styled.div`
  padding: 10px 10px;
`
const Typo = styled.div``
const ChatQuestion = ({
  comment,
  manuscript,
  visibleComment,
  isLastManuscript,
  setVisibleComment,
}) => {
  const editorDecision = get(manuscript, 'editor.decision', null)

  return (
    <Root>
      <RoleLeft>{parseRole(comment.role)}</RoleLeft>
      <Question visibleComment={visibleComment}>
        {comment.role === 'bot' ? (
          <BotComment comment={comment.text} />
        ) : (
          <Comment> {comment.text}</Comment>
        )}

        <Actions>
          {!['publish', 'reject'].includes(editorDecision) &&
            isLastManuscript && (
              <Button onClick={() => setVisibleComment(!visibleComment)}>
                Reply
              </Button>
            )}
        </Actions>
      </Question>
    </Root>
  )
}

const Root = styled.div`
  margin: 6px 0px;
  font-family: 'Nunito';
  position: relative;
  padding-top: 5px;
`
const Question = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: whitesmoke;
  border-radius: 15px 15px 15px 0px;
  margin: 5px 0px;
  padding: 0.5em 0.5em;
  border: 1px solid ${th.colorCremLight};
`

const RoleLeft = styled.div`
  display: flex;
  justify-content: flex-end;
  top: -2px;
  right: 20px;
  background-color: white;
  position: absolute;
  color: ${th.colorGrey};
  font-size: 12px;
  padding: 0px 4px;
  border-radius: 3px;
  border: 1px solid #e1cda4;
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
