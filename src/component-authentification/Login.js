import React from 'react'
import { Formik } from 'formik'
import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { th, InputForm, Button, Row } from '../component-ui'
import { LoginValidation } from '../component-authentification'
import withGQL from './withGQL'
import { get } from 'lodash'

const Login = ({ handleChangePage, history, login }) => {
  const initialValues = { email: '', password: '' }

  const handleLogin = ({ email, password }) => {
    return login({
      variables: {
        email,
        password,
      },
    })
      .then(({ data }) => {
        const token = get(data, 'login')
        const isToken = localStorage.getItem('authToken')
        if (!isToken) {
          localStorage.setItem('authToken', JSON.stringify(token))
          history.push('/dashboard')
          window.location.reload()
        }
      })
      .catch(error => alert(error))
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginValidation}
      onSubmit={handleLogin}
    >
      {({ values, handleChange, handleSubmit, errors }) => {
        return (
          <Root>
            <Title>Login</Title>
            <InputForm
              label="Email"
              name="email"
              type="text"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              mt={2}
              mb={1}
            />
            <InputForm
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              mt={1}
              mb={1}
            />
            <Row mt={4}>
              <Button
                name="Sign Up"
                iconName={'user-plus'}
                onClick={handleChangePage}
              />
              <Button
                name="Login"
                type="submit"
                iconName={'sign-in-alt'}
                onClick={handleSubmit}
              />
            </Row>
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
`
const Title = styled.p`
  margin: 0.5em 0em;
  font-size: 1.5em;
  font-weight: 700;
`
export default compose(
  withRouter,
  withGQL,
)(Login)
