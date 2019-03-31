import React from 'react'
import styled from 'styled-components'

import { th, Row, Button, InputForm } from '../component-ui'

const SignUpStep0 = ({
  errors,
  values,
  handleChange,
  handleChangePage,
  handleChangeSignUpPage,
}) => {
  const handleSignUp0Button = () => {
    const isValid =
      !errors.firstName &&
      !!values.firstName &&
      !errors.lastName &&
      !!values.lastName &&
      !errors.email &&
      !!values.email

    if (isValid) {
      return handleChangeSignUpPage()
    }
  }
  return (
    <Root>
      <Title>Sign Up</Title>

      <Row>
        <InputForm
          mt={0.5}
          mb={0.5}
          required
          type="text"
          name="firstName"
          label="First name"
          onChange={handleChange}
          value={values.firstName}
          error={errors.firstName}
          widthInput={10}
        />
        <InputForm
          mt={0.5}
          mb={0.5}
          required
          type="text"
          name="lastName"
          label="Last name"
          onChange={handleChange}
          value={values.lastName}
          error={errors.lastName}
          widthInput={10}
        />
      </Row>

      <InputForm
        mt={0.5}
        mb={0.5}
        required
        margin={0}
        type="text"
        label="Email"
        name="email"
        onChange={handleChange}
        value={values.email}
        error={errors.email}
      />

      <Row>
        <InputForm
          mt={0.5}
          mb={0.5}
          type="text"
          label="Country"
          name="country"
          widthInput={10}
          onChange={handleChange}
          value={values.country}
          error={errors.country}
        />
        <InputForm
          mt={0.5}
          mb={0.5}
          label="City"
          type="text"
          name="city"
          widthInput={10}
          onChange={handleChange}
          value={values.city}
          error={errors.city}
        />
      </Row>

      <Row>
        <Button
          mt={1}
          name="Login"
          iconName={'sign-in-alt'}
          onClick={handleChangePage}
        />
        <Button
          mt={1}
          name="Next"
          iconName={'arrow-right'}
          onClick={handleSignUp0Button}
        />
      </Row>
    </Root>
  )
}

const Title = styled.p`
  font-size: 1.5em;
  font-weight: 700;
  margin-bottom: 0.5em;
`
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

export default SignUpStep0
