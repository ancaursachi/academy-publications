import React from 'react'
import { get } from 'lodash'
import { space } from 'styled-system'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { withHandlers } from 'recompose'

const Button = styled.button`
  background: none;
  border: none;
  min-width: 0;
  padding: 0;
  &:focus {
    outline: none;
  }
`

const Action = props => {
  if (props.to) return <Link {...props}>{props.children}</Link>
  return <Button {...props}>{props.children}</Button>
}

const ActionLink = ({
  to,
  onClick,
  disabled,
  children,
  renderLink,
  ...rest
}) => (
  <Root {...rest} to={to}>
    {renderLink(rest)}
  </Root>
)

export default withHandlers({
  renderLink: ({
    to,
    internal,
    disabled,
    onClick,
    children,
    fontSize,
    fontWeight,
    ...rest
  }) => () => {
    if (to && !internal) {
      return (
        <ExternalLink
          href={disabled ? undefined : to}
          target="_blank"
          {...rest}
        >
          {children}
        </ExternalLink>
      )
    }

    if (to && internal) {
      return <CustomLink to={to}>{children}</CustomLink>
    }
    return (
      <Action
        disabled={disabled}
        fontSize={fontSize}
        fontWeight={fontWeight}
        onClick={onClick}
      >
        {children}
      </Action>
    )
  },
})(ActionLink)

const ExternalLink = styled.a`
  cursor: pointer;
  line-height: 1;
  text-decoration: underline;
  font-size: ${props => (props.fontSize ? props.fontSize : '')};
  opacity: ${props => (props.opacity ? props.opacity : '1')};
`
const CustomLink = ExternalLink.withComponent(Link)

const Root = styled.div`
  align-items: ${props => get(props, 'alignItems', 'center')};
  flex: ${props => props.flex || 'none'};
  justify-content: center;
  height: inherit;
  width: max-content;

  &:focus * {
    outline: none;
  }

  ${space};
`
