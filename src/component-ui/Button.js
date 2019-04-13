import React from 'react'
import styled, { css } from 'styled-components'
import { get } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import th from './theme'

const Button = ({ name, iconName, iconLeft, type = 'button', ...props }) => {
  return (
    <Root {...props} type={type}>
      {iconLeft && iconName && <IconLeft icon={iconName} color={props.color} />}
      <Title {...props}>{name}</Title>
      {!iconLeft && iconName && (
        <IconRight icon={iconName} color={props.color} />
      )}
    </Root>
  )
}

const helper = props => {
  if (get(props, 'underline')) {
    return css`
      box-shadow: 0em 0.1em 0em 0em ${th[props.color]};
    `
  }
}
const Root = styled.button`
  color: ${props => (get(props, 'color') ? props.color : th.colorDark)};
  background-color: transparent;
  border: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  :focus {
    outline: none;
  }
  font-weight: ${props =>
    get(props, 'fontWeight') ? props.fontWeight : 'normal'};
  ${th.marginHelper}
  ${th.paddingHelper}
  ${helper};
`

const Title = styled.p`
  color: ${props => (get(props, 'color') ? props.color : th.colorDark)};
  margin: 0em;
`
const IconRight = styled(FontAwesomeIcon)`
  margin: 0em 0em 0em 0.5em;
`
const IconLeft = styled(FontAwesomeIcon)`
  margin: 0em 0.5em 0em 0em;
`

export default Button
