import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({ name, iconName = '', handleClick }) => {
  return (
    <Root onClick={handleClick ? handleClick : null}>
      <Title>{name}</Title>
      <Icon icon={iconName} />
    </Root>
  )
}

export default Button

const Root = styled.button`
  color: #4b5b82;
  background-color: white;
  color: black;
  border: none;
  text-decoration: none;
  border-bottom: 2px solid #4b5b82;
  display: flex;
  align-items: center;
  :focus {
    outline: none;
  }
`

const Title = styled.p`
  color: #4b5b82;
  margin: 0em;
`
const Icon = styled(FontAwesomeIcon)`
  margin: 0em 0em 0em 0.5em;
  color: #4b5b82;
`
