import React from 'react'
import styled from 'styled-components'
import { th, InputForm, Button } from '../styledComponents'

const Login = ({ handleChangePage }) => {
  return (
    <Root>
      <Title>Login</Title>
      <InputForm label="Email" type="text" mt={2} mb={1} />
      <InputForm label="Password" type="password" mb={1} />
      <Row>
        <Button
          name="Sign Up"
          iconName={'user-plus'}
          handleClick={handleChangePage}
        />
        <Button name="Login" iconName={'sign-in-alt'} />
      </Row>
    </Root>
  )
}

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
export default Login
