import React, { Fragment, useState } from 'react'
import styled, { css } from 'styled-components'
import { Tabs } from '../component-ui'

const PeerReviewCheckBar = ({ children, tabButtons }) => {
  const [showManuscriptInfo, setShowManuscriptInfo] = useState(false)

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
            <LabelButton />
          </TabsHeader>
          <Root showManuscriptInfo={showManuscriptInfo}>
            {React.Children.toArray(children)[selectedTab]}
          </Root>
        </Fragment>
      )}
    </Tabs>
  )
}

const Root = styled.div``
const TabText = styled.div``
const TabsHeader = styled.nav`
  display: flex;
  justify-content: space-between;
`
const LabelButton = styled.button`
  background: none;
  border: none;
  outline: none;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
`
const StyledActiveTab = props => {
  if (props.selected) {
    return css``
  }
}
const Tab = styled.button`
  padding: 0;
  font-weight: bold;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  text-decoration: none;

  ${StyledActiveTab}
`
export default PeerReviewCheckBar
