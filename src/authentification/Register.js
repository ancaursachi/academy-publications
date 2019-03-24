import React from 'react'
import styled from 'styled-components'
import { th, Button } from '../styledComponents'

const Register = ({ handleChangePage }) => (
  <Root>
    <Title>Sign Up</Title>
    <Row>
      <Button
        name="Login"
        iconName={'sign-in-alt'}
        handleClick={handleChangePage}
      />
      <Button name="Sign Up" iconName={'user-plus'} />
    </Row>
  </Root>
)

const Root = styled.div`
  width: 100%;
  height: 100%;
  color: ${th.colorPrimary};
`
const Title = styled.p`
  margin: 0.5em 0em;
  font-size: 1.5em;
  font-weight: 700;
`
const Row = styled.div`
  margin: 3.5em 0em;
  display: flex;
  justify-content: space-between;
`
export default Register
