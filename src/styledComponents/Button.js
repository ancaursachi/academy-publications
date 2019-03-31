import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import th from './theme'

const Button = ({
  name,
  iconName,
  iconLeft = false,
  type = 'button',
  ...props
}) => {
  return (
    <Root {...props} type={type}>
      {iconLeft && iconName && <IconLeft icon={iconName} />}
      <Title>{name}</Title>
      {!iconLeft && iconName && <Icon icon={iconName} />}
    </Root>
  )
}

const Root = styled.button`
  color: ${th.colorPrimary};
  background-color: white;
  color: black;
  border: none;
  text-decoration: none;
  border-bottom: 2px solid ${th.colorPrimary};
  display: flex;
  align-items: center;
  :focus {
    outline: none;
  }
  ${th.marginHelper}
  ${th.paddingHelper}
`

const Title = styled.p`
  color: ${th.colorPrimary};
  margin: 0em;
`
const Icon = styled(FontAwesomeIcon)`
  margin: 0em 0em 0em 0.5em;
  color: ${th.colorPrimary};
`
const IconLeft = styled(FontAwesomeIcon)`
  margin: 0em 0.5em 0em 0em;
  color: ${th.colorPrimary};
`

export default Button
