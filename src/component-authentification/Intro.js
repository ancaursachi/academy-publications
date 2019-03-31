import React from 'react'
import styled from 'styled-components'

const Intro = () => (
  <Root>
    <Content>
      <Header>Welcome to</Header>
      <Title>Academy Pub</Title>
      <Info>
        This is a web site made for students who are interested in academics
        publications.
      </Info>
    </Content>
  </Root>
)

export default Intro

const Root = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
`
const Content = styled.div``

const Header = styled.p`
  font-size: 2em;
  margin: 0em;
`
const Title = styled.p`
  font-size: 1.5em;
  font-weight: 700;
`

const Info = styled.div``
