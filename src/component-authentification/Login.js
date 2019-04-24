import React, { useState } from 'react'
import { Formik } from 'formik'
import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { InputForm, Button, Row, Modal } from '../component-ui'
import { LoginValidation } from '../component-authentification'
import { mutations } from '../qraphqlClient'
import { get } from 'lodash'

const Login = ({ handleChangePage, history, login, ...props }) => {
  const initialValues = { email: '', password: '' }
  const [error, setError] = useState('')
  const handleSetError = error => setError(error)

  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(!showModal)

  const handleLogin = ({ email, password }) => {
    return login({
      variables: {
        email,
        password,
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
      .catch(error => {
        handleSetError(error.message)
        handleShowModal()
      })
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
                iconRight
                underline
                name="Sign Up"
                iconName={'user-plus'}
                onClick={handleChangePage}
              />
              <Button
                underline
                name="Login"
                type="submit"
                iconName={'sign-in-alt'}
                onClick={handleSubmit}
              />
            </Row>
            <Modal
              handleShowModal={handleShowModal}
              showModal={showModal}
              title={error}
              error={error}
            />
          </Root>
        )
      }}
    </Formik>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
`
const Title = styled.p`
  margin: 0.5em 0em;
  font-size: 1.5em;
  font-weight: 700;
`
export default compose(
  withRouter,
  mutations,
)(Login)
