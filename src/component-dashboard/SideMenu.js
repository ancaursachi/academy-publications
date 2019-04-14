import React from 'react'
import styled from 'styled-components'
import { th } from '../component-ui'
const SideMenu = props => {
  return <Root {...props}>SideMenu</Root>
}

const Root = styled.div`
  width: ${props => `${props.pageWidth}px`};
  background-color: ${th.colorBrownLight};
  height: 100%;
`
export default SideMenu
