import React, { useState } from 'react'
import styled from 'styled-components'
import { th, Row, Button, InputForm, InputSelect } from '../styledComponents'

const Register = ({ handleChangePage }) => {
  const [signUpPage, setSignUpPage] = useState(true)

  const handleChangeSignUpPage = () => {
    setSignUpPage(!signUpPage)
  }
  return (
    <Root>
      {signUpPage ? (
        <Step0
          handleChangePage={handleChangePage}
          handleChangeSignUpPage={handleChangeSignUpPage}
        />
      ) : (
        <Step1
          handleChangePage={handleChangePage}
          handleChangeSignUpPage={handleChangeSignUpPage}
        />
      )}
    </Root>
  )
}

const Step0 = ({ handleChangePage, handleChangeSignUpPage }) => (
  <Root>
    <Title>Sign Up</Title>
    <Row>
      <InputForm label="First name" type="text" required widthInput={9.5} />
      <InputForm label="Last name" type="text" widthInput={9.5} required />
    </Row>
    <InputForm label="Email" type="text" margin={0} required />
    <Row>
      <InputForm label="City" type="text" widthInput={9.5} />
      <InputSelect
        label="Role"
        type="text"
        widthInput={9.5}
        required
        options={['User', 'Profesor', 'Student']}
      />
    </Row>
    <Row>
      <Button
        mt={1}
        name="Login"
        iconName={'sign-in-alt'}
        handleClick={handleChangePage}
      />
      <Button
        mt={1}
        name="Next"
        iconName={'arrow-right'}
        handleClick={handleChangeSignUpPage}
      />
    </Row>
  </Root>
)

const Step1 = ({ handleChangePage, handleChangeSignUpPage }) => {
  const [userIsCreated, setUserIsCreated] = useState(false)
  const handleUserIsCreated = () => {
    setUserIsCreated(!userIsCreated)
  }
  return !userIsCreated ? (
    <Root>
      <Title>Sign Up</Title>
      <InputForm label="University" type="text" required />
      <InputForm label="Faculty" type="text" required />
      <InputForm label="Password" type="password" required />

      <Row>
        <Button
          name="Prev"
          iconName={'arrow-left'}
          iconLeft
          handleClick={handleChangeSignUpPage}
          mt={1}
        />
        <Button name="Login" handleClick={handleChangePage} mt={1} />
        <Button
          name="End Sign Up"
          iconName={'user-plus'}
          mt={1}
          handleClick={handleUserIsCreated}
        />
      </Row>
    </Root>
  ) : (
    <Root>
      <Row mt={5} justify={'center'}>
        <Message>Welcome between our community !</Message>
      </Row>
      <Row justify={'flex-end'}>
        <Button
          name="Login"
          iconName={'sign-in-alt'}
          mt={5}
          handleClick={handleChangePage}
        />
      </Row>
    </Root>
  )
}
const Root = styled.div`
  width: 100%;
  height: 100%;
  color: ${th.colorPrimary};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${th.marginHelper}
  ${th.paddingHelper}
`
const Title = styled.p`
  font-size: 1.5em;
  font-weight: 700;
`
const Message = styled.div`
  font-size: 1.8em;
  font-weight: 900;
  text-align: center;
  color: ${th.colorSecondary};
`
export default Register
