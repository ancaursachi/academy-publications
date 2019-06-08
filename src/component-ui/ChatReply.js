import React from 'react'
import styled from 'styled-components'
import { th } from '../component-ui'

const parseStatus = role => {
  switch (role) {
    case 'user':
      return 'Author'
    default:
      return role.charAt(0).toUpperCase() + role.slice(1)
  }
}
const ChatReply = ({ children, role, writeReply, ...rest }) => {
  if (writeReply) {
    return (
      <WriteRoot {...rest}>
        <Reply>{children}</Reply>
      </WriteRoot>
    )
  } else if (role === 'user') {
    return (
      <Root {...rest}>
        <Role>{parseStatus(role)}</Role>
        <Reply>{children}</Reply>
      </Root>
    )
  } else
    return (
      <Root {...rest}>
        <RoleLeft>{parseStatus(role)}</RoleLeft>
        <Reply>{children}</Reply>
      </Root>
    )
}
const WriteRoot = styled.div`
  margin-top: 10px;
`
const Root = styled.div`
  margin: 6px 0px;
  font-family: 'Nunito';
  position: relative;
  padding-top: 5px;
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
const Role = styled.div`
  color:${th.colorGrey}
  font-size: 12px;
  top: -2px;
  left: 20px;
  padding: 0px 4px;
  background-color: white;
  position: absolute;
  border-radius: 3px;
    border: 1px solid #e1cda4;
`
const Reply = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 15px 15px 0px 15px;
  padding: 0.5em 0.5em;
  border: 1px solid #e1cda4;
`
export default ChatReply
