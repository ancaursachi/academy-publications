import React from 'react'
import styled from 'styled-components'
import { th, Button } from '../component-ui'
import { useMeasureWindow } from './useMeasureWindow'

const SideMenu = ({ history, ...props }) => {
  const { width: pageWidth } = useMeasureWindow()

  return (
    <Root {...props} pageWidth={pageWidth / 5} pt={5}>
      <Button
        fontWeight="bold"
        fontSize="1.2em"
        sideMenu
        iconName="plus"
        name="Create manuscript"
        onClick={() => history.push('/submission')}
      />
    </Root>
  )
}

const Root = styled.div`
  width: ${props => (props.pageWidth ? `${props.pageWidth}px` : '0px')};
  background-color:${th.colorBlue}
  height: 100%;
  display: flex;
  position: fixed;
  box-shadow: 0em 0em 0.6em 0em rgba(0, 0, 0, 0.5);
  align-items: flex-start;
  justify-content: center;
  ${th.marginHelper}
  ${th.paddingHelper}
`
export default SideMenu
