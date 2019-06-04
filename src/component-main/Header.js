import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { th, Button } from '../component-ui'
import { withRouter } from 'react-router-dom'

const Header = ({ history, loggedInUser }) => {
  const firstName = get(loggedInUser, 'firstName', '')
  const lastName = get(loggedInUser, 'lastName', '')
  const handleLogout = () => {
    // localStorage.removeItem('authToken')
    // localStorage.removeItem('user')
    localStorage.clear()
    history.push('/login')
    window.location.reload()
  }
  return (
    <Row>
      <Logo>
        <StyledLink to="/dashboard">Academy Publication</StyledLink>
      </Logo>
      <Column>
        <User>
          Hello, {firstName} {lastName}
        </User>
        <Button
          name="Logout"
          color={th.colorBlueLight}
          onClick={handleLogout}
          fontSize={0.8}
          fontWeight={600}
        />
      </Column>
    </Row>
  )
}

const Row = styled.nav`
  list-style-type: none;
  height: 3em;
  background-color: ${th.colorWhite};
  display:grid;
  grid-template-columns:50% 50%;
  position: fixed;
  box-shadow: 0em 0em 0.1em 0em ${th.colorBlueLight}
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  font-family: 'Nunito';
`
const User = styled.div`
  font-family: 'Nunito';
  font-size: 0.8em;
  padding-right: 2em;
`
const Logo = styled.div`
  font-family: 'Nunito';
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin-left: 1em;
`
const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.4rem;
  margin-right: 1em;
`
const StyledLink = styled(Link)`
  font-family: 'Nunito';
  color: ${th.colorBlueLight};
  font-weight: 600;
  text-decoration: none;
  display: block;
  :hover {
    color: ${th.colorBlueLight};
    text-decoration: none;
  }
`

export default compose(withRouter)(Header)
