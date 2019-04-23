import React from 'react'
import styled from 'styled-components'
import { th, Button } from '../component-ui'

const SideMenu = ({ history, ...props }) => {
  return (
    <Root {...props}>
      <Content>
        <Button
          fontWeight="bold"
          fontSize="1.2em"
          sideMenu
          iconName="plus"
          name="Create manuscript"
          onClick={() => history.push('/submission')}
        />
      </Content>
    </Root>
  )
}

const Root = styled.div`
  background-color:${th.colorBlue}
  height: 100%;
  width:100%;
  display: flex;
  box-shadow: 0em 0em 0.6em 0em rgba(0, 0, 0, 0.5);
  align-items: flex-start;
  justify-content: center;
  ${th.marginHelper}
  ${th.paddingHelper}
`

const Content = styled.div`
  position: fixed;
`
export default SideMenu
