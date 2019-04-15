import React, { useState } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import { compose } from 'recompose'
import { get } from 'lodash'
import { withRouter } from 'react-router-dom'

import { mutations } from '../qraphqlClient'
import { th } from '../component-ui'
import {
  SignUpStep0,
  SignUpStep1,
  SignUpValidation,
} from '../component-authentification'

const SignUp = ({ handleChangePage, history, signUp, login }) => {
  const [signUpPage, setSignUpPage] = useState(true)
  const [userIsCreated, setUserIsCreated] = useState(false)
  const handleChangeSignUpPage = () => {
    setSignUpPage(!signUpPage)
  }

  const handleUserIsCreated = () => {
    setUserIsCreated(!userIsCreated)
  }

  const handleSignUp = input => {
    return signUp({
      variables: {
        input,
      },
    })
      .then(() =>
        login({
          variables: {
            email: input.email,
            password: input.password,
          },
        })
          .then(({ data }) => {
            const token = get(data.login, 'token')
            const isToken = localStorage.getItem('authToken')
            if (!isToken) {
              localStorage.setItem('authToken', JSON.stringify(token))
              history.push('/dashboard')
              window.location.reload()
            }
          })
          .catch(error => alert(error)),
      )
      .catch(error => alert(error))
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
      validationSchema={SignUpValidation}
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
  color: ${th.colorDark};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${th.marginHelper}
  ${th.paddingHelper}
`

export default compose(
  mutations,
  withRouter,
)(SignUp)
