import React, { useState } from 'react'
import styled from 'styled-components'
import { th } from '../styledComponents'
import { Formik } from 'formik'
import { SignupSchema } from './validations'
import { SignUpStep0, SignUpStep1 } from '../authentification'

const SignUp = ({ handleChangePage }) => {
  const [signUpPage, setSignUpPage] = useState(true)

  const handleChangeSignUpPage = () => {
    setSignUpPage(!signUpPage)
  }

  const handleSignUp = values => {
    console.log('Sign up values: ', values)
  }

  const initialValues = {
    specialization: '',
    university: '',
    firstName: '',
    password: '',
    lastName: '',
    country: '',
    email: '',
    city: '',
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={handleSignUp}
    >
      {({ values, handleChange, handleSubmit, errors }) => {
        return (
          <Root>
            {signUpPage ? (
              <SignUpStep0
                errors={errors}
                values={values}
                handleChange={handleChange}
                handleChangePage={handleChangePage}
                handleChangeSignUpPage={handleChangeSignUpPage}
              />
            ) : (
              <SignUpStep1
                errors={errors}
                values={values}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleChangePage={handleChangePage}
                handleChangeSignUpPage={handleChangeSignUpPage}
              />
            )}
          </Root>
        )
      }}
    </Formik>
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

export default SignUp
