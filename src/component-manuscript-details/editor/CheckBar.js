import React, { Fragment, useState } from 'react'
import styled, { css } from 'styled-components'
import { Tabs, th } from '../../component-ui'

const CheckBar = ({ children, tabButtons }) => {
  return (
    <Tabs selectedTab={0}>
      {({ selectedTab, changeTab }) => (
        <Fragment>
          <TabsHeader>
            <Container>
              {tabButtons.map((tab, index) => (
                <Tab
                  key={tab}
                  onClick={() => changeTab(index)}
                  selected={index === selectedTab}
                >
                  <TabText>{tab}</TabText>
                </Tab>
              ))}
            </Container>
          </TabsHeader>
          <Root>{React.Children.toArray(children)[selectedTab]}</Root>
        </Fragment>
      )}
    </Tabs>
  )
}

const Root = styled.div``
const TabText = styled.div``
const TabsHeader = styled.nav`
  outline: none;
  font-size: 14px;
  font-family: 'Nunito';
  padding: 0 12 0 0;
  display: flex;
  justify-content: space-between;
  background-color: white;
  height: 40px;
  box-shadow: inset 0 -1px 0 0 ${th.colorBlueLight};
  width: calc(100vw-226px);
  :focus {
    outline: none;
  }
  :hover {
    outline: none;
  }
  :active {
    outline: none;
  }
`

const Container = styled.div`
  display: flex;
`
const StyledActiveTab = props => {
  if (props.selected) {
    return css`
      color: ${th.colorBlue};
      font-weight: 600;
      border-bottom: 3px solid ${th.colorBlue};
    `
  }
}
const Tab = styled.button`
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  padding:0px 15px
  outline: none;
  text-decoration: none;
  :hover {
    color: ${th.colorBlue};
    outline: none;
  }
  :active {
    outline: none;
    color: ${th.colorBlue};
  }
  :focus {
    outline: none;
    color: ${th.colorBlue};
  }
  ${StyledActiveTab}
`
export default CheckBar
