import React from 'react'
import styled from 'styled-components'

import { th, Row, Button, InputForm } from '../component-ui'

const SignUpStep1 = ({
  errors,
  values,
  handleChange,
  handleSubmit,
  userIsCreated,
  handleChangePage,
  handleUserIsCreated,
  handleChangeSignUpPage,
}) => {
  const handleSignUp1Button = () => {
    const isValid =
      !errors.university &&
      !!values.university &&
      !errors.specialization &&
      !!values.specialization &&
      !errors.password &&
      !!values.password

    if (isValid) {
      return handleSubmit()
    }
  }
  return (
    <Root>
      <Title>Sign Up</Title>
      <InputForm
        mt={0.5}
        mb={0.5}
        required
        name="university"
        type="text"
        label="University"
        widthInput={21}
        onChange={handleChange}
        value={values.university}
        error={errors.university}
      />
      <InputForm
        mt={0.5}
        mb={0.5}
        required
        widthInput={21}
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
        widthInput={21}
        name="password"
        type="password"
        label="Password"
        onChange={handleChange}
        value={values.password}
        error={errors.password}
      />

      <Row>
        <Button
          mt={1}
          iconLeft
          underline
          name="Prev"
          iconName={'arrow-left'}
          onClick={handleChangeSignUpPage}
        />
        <Button
          mt={1}
          underline
          type="submit"
          name="End Sign Up"
          iconName={'user-plus'}
          onClick={handleSignUp1Button}
        />
      </Row>
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  color: ${th.colorDark};
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

export default SignUpStep1
