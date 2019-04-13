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
        <Button
          name="Logout"
          color={th.colorWhite}
          onClick={logout}
          fontWeight={600}
        />
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
  background-color: ${th.colorBlue};
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
  color: ${th.colorWhite};
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
  color: ${th.colorWhite};
  font-weight: 600;
  text-decoration: none;
  display: block;
  :hover {
    color: ${th.colorWhite};
    text-decoration: none;
  }
`

export default Header
