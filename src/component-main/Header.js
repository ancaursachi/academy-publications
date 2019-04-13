import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { th, Button } from '../component-ui'

const Header = () => (
  <Row>
    <Column>
      <Item>
        <StyledLink to="/dashboard">Dashboard</StyledLink>
      </Item>
    </Column>
    <Column>
      <Item>
        <Button name="Logout" onClick={logout} />
      </Item>
    </Column>
  </Row>
)

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  window.location.reload()
}

const Row = styled.nav`
  list-style-type: none;
  height: 3em;
  background-color: ${th.colorThird};
  display: grid;
  grid-template-columns: 80% 20%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
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
