import React, { useState } from 'react'
import styled from 'styled-components'
import { th, Row, Button, InputForm } from '../styledComponents'

const SignUpStep1 = ({
  errors,
  values,
  handleChange,
  handleSubmit,
  handleChangePage,
  handleChangeSignUpPage,
}) => {
  const [userIsCreated, setUserIsCreated] = useState(false)
  const handleUserIsCreated = () => {
    setUserIsCreated(!userIsCreated)
  }

  const handleSignUp1Button = () => {
    const isValid =
      !errors.university &&
      !!values.university &&
      !errors.specialization &&
      !!values.specialization &&
      !errors.password &&
      !!values.password

    if (isValid) {
      return handleSubmit() || handleUserIsCreated()
    }
  }
  return !userIsCreated ? (
    <Root>
      <Title>Sign Up</Title>
      <InputForm
        mt={0.5}
        mb={0.5}
        required
        name="university"
        type="text"
        label="University"
        onChange={handleChange}
        value={values.university}
        error={errors.university}
      />
      <InputForm
        mt={0.5}
        mb={0.5}
        required
        type="text"
        name="specialization"
        label="Faculty/Specialization"
        onChange={handleChange}
        value={values.specialization}
        error={errors.specialization}
      />
      <InputForm
        mt={0.5}
        mb={0.5}
        required
        name="password"
        type="password"
        label="Password"
        onChange={handleChange}
        value={values.password}
        error={errors.password}
      />

      <Row>
        <Button
          name="Prev"
          iconName={'arrow-left'}
          iconLeft
          onClick={handleChangeSignUpPage}
          mt={1}
        />
        <Button name="Login" handleClick={handleChangePage} mt={1} />
        <Button
          name="End Sign Up"
          iconName={'user-plus'}
          mt={1}
          onClick={handleSignUp1Button}
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

export default SignUpStep1
