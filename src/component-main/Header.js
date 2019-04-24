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
      <Column>
        <Item>
          <StyledLink to="/dashboard">Dashboard</StyledLink>
        </Item>
      </Column>
      <Column>
        <Item>
          <Button
            name="Logout"
            color={th.colorBlue}
            onClick={handleLogout}
            fontWeight={600}
          />
        </Item>
      </Column>
    </Row>
  )
}

const Row = styled.nav`
  list-style-type: none;
  height: 3em;
  background-color: ${th.colorCremLight};
  display: grid;
  grid-template-columns: 80% 20%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
`

const Column = styled.div`
  display: flex;
  align-items: center;
  color: ${th.colorBlue};
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
  color: ${th.colorBlue};
  font-weight: 600;
  text-decoration: none;
  display: block;
  :hover {
    color: ${th.colorBlue};
    text-decoration: none;
  }
`

export default compose(withRouter)(Header)
