import React, { useState } from 'react'
import styled from 'styled-components'
import { th } from '../styledComponents'
import { Formik } from 'formik'
import { SignupSchema } from './validations'
import { SignUpStep0, SignUpStep1 } from '../authentification'
import withGQL from './withGQL'
import { compose } from 'recompose'

const SignUp = ({ handleChangePage, addUser }) => {
  const [signUpPage, setSignUpPage] = useState(true)
  const [userIsCreated, setUserIsCreated] = useState(false)

  const handleChangeSignUpPage = () => {
    setSignUpPage(!signUpPage)
  }

  const handleUserIsCreated = () => {
    setUserIsCreated(!userIsCreated)
  }

  const handleSignUp = input => {
    return addUser({
      variables: {
        input,
      },
    })
      .then(() => handleUserIsCreated())
      .catch(error => alert('Email is already in the system'))
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    university: '',
    specialization: '',
    password: '',
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
                userIsCreated={userIsCreated}
                handleUserIsCreated={handleUserIsCreated}
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

export default compose(withGQL)(SignUp)
