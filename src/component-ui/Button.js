import React from 'react'
import styled, { css } from 'styled-components'
import { get } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import th from './theme'

const Button = ({ name, iconName, iconLeft, type = 'button', ...props }) => {
  return (
    <Root {...props} type={type}>
      {iconLeft && iconName && <IconLeft icon={iconName} color="inherit" />}
      <Title {...props}>{name}</Title>
      {!iconLeft && iconName && <IconRight icon={iconName} color="inherit" />}
    </Root>
  )
}

const helper = props => {
  if (get(props, 'underline')) {
    return css`
      box-shadow: 0em 0.1em 0em 0em ${th[props.color]};
      color: ${props => (get(props, 'color') ? props.color : th.colorDark)};
    `
  }
  if (get(props, 'decisionDash')) {
    return css`
      width: 2em;
      height: 2em;
      background-color:${th.colorWhite}
      color: ${props => (get(props, 'color') ? props.color : th.colorDark)};
    `
  }
  if (get(props, 'sideMenu')) {
    return css`
      background-color: ${th.colorBlueLight};
      transition: all 0.4s ease 0s;
      width: 100%;
      display: flex;
      justify-content: center;
      color: ${th.colorWhite};
      :hover {
        box-shadow: 0em 0.3em 1em rgba(0, 0, 0, 0.4);
      }
    `
  }

  return css`
    color: ${props => (get(props, 'color') ? props.color : th.colorDark)};
  `
}
const Root = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  :focus {
    outline: none;
  }
  font-size: ${props =>
    get(props, 'fontSize') ? `${props.fontSize}em` : `1em`};
  font-weight: ${props =>
    get(props, 'fontWeight') ? props.fontWeight : 'normal'};
  ${th.marginHelper}
  ${th.paddingHelper}
  ${helper};
`

const Title = styled.p`
  color: inherit;
  margin: 0em;
  font-size: ${props => get(props, 'fontSize')};
`
const IconRight = styled(FontAwesomeIcon)`
  margin: 0em 0em 0em 0.5em;
`
const IconLeft = styled(FontAwesomeIcon)`
  margin: 0em 0.5em 0em 0em;
`

export default Button
