import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { th, Button } from '../component-ui'
import { withRouter } from 'react-router-dom'

const Header = ({ history }) => {
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    history.push('/login')
    window.location.reload()
  }
  return (
    <Row>
      <Logo>
        <StyledLink to="/dashboard">Academy Publication</StyledLink>
      </Logo>
      <Column>
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
  display: flex;
  position: fixed;
  justify-content: space-between;
  box-shadow: 0em 0em 0.1em 0em ${th.colorBlueLight}
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4em;
  margin-left: 1em;
`
const Column = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4em;
  margin-right: 1em;
`
const StyledLink = styled(Link)`
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
