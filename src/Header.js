import React from 'react'
import th from './styles'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MainPage from './dashboard/Dashboard'
import UserProfile from './dashboard/UserProfile'

const Header = () => (
  <Router>
    <Row>
      <Column>
        <Item>
          <StyledLink to="/">Dashboard</StyledLink>
        </Item>
        <Item>
          <StyledLink to="/UserProfile">Profile</StyledLink>
        </Item>
      </Column>
      <Column>
        <Item>
          <StyledLink to="/Logout">Logout</StyledLink>
        </Item>
      </Column>
    </Row>
    <Route exact path="/" component={MainPage} />
    <Route path="/UserProfile" component={UserProfile} />
  </Router>
)

const Row = styled.nav`
  list-style-type: none;
  height: 3em;
  background-color: ${th.colorPrimary};
  display: grid;
  grid-template-columns: 80% 20%;
`

const Column = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 1.4em;
  margin-left: 3em;
`
const Item = styled.div`
  float: left;
  display: flex;
  align-items: center;
  margin: 0 0.5em 0 0.5em;
`

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;
  :hover {
    color: #fff;
    text-decoration: none;
  }
`

export default Header
