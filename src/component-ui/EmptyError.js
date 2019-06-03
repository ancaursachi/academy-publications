import React from 'react'
import styled from 'styled-components'
import th from './theme'

const EmptyError = ({ children }) => {
  return <Root>{children}</Root>
}

const Root = styled.div`
  font-family: 'Nunito';
  padding-top: 20px;
  width: 45em;
  color: ${th.colorGrey};
`

export default EmptyError
