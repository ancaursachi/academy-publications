import React, { useState, Fragment } from 'react'
import { th, Button, Modal, Row, InputForm, InputSelect } from '../component-ui'
import { mutations } from '../qraphqlClient'
import { compose } from 'recompose'
import { Formik } from 'formik'
import styled from 'styled-components'
import { editUserValidation } from '../component-users'
import { queries } from '../qraphqlClient'

const EditUser = ({ user, showModal, handleShowModal, editUser }) => {
  const initialValues = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    country: user.country,
    city: user.city,
    university: user.university,
    specialization: user.specialization,
  }

  const handleEditUser = input => {
    handleShowModal()
    return editUser({
      variables: {
        input,
      },
      refetchQueries: [
        {
          query: queries.getUsers,
        },
      ],
    })
      .then(() => {})
      .catch(error => {
        alert(error.message)
      })
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editUserValidation}
      onSubmit={handleEditUser}
    >
      {({ values, handleChange, handleSubmit, errors }) => {
        return (
          <Root pr={1}>
            <Title>Edit User</Title>
            <RowInput>
              <InputForm
                mb={0.5}
                pr={0.5}
                required
                type="text"
                name="firstName"
                label="First name"
                onChange={handleChange}
                value={values.firstName}
                error={errors.firstName}
              />
              <InputForm
                mb={0.5}
                pl={0.5}
                required
                type="text"
                name="lastName"
                label="Last name"
                onChange={handleChange}
                value={values.lastName}
                error={errors.lastName}
              />
            </RowInput>
            <RowInput>
              <InputForm
                widthInput={12}
                mb={0.5}
                pr={0.5}
                required
                type="text"
                label="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
              />
              <InputSelect
                pl={0.5}
                widthInput={12}
                label="Role"
                name="role"
                type="text"
                options={['user', 'professor', 'admin']}
                value={values.searchType}
                onChange={handleChange}
              />
            </RowInput>
            <RowInput>
              <InputForm
                mb={0.5}
                pr={0.5}
                type="text"
                label="Country"
                name="country"
                onChange={handleChange}
                value={values.country}
                error={errors.country}
              />
              <InputForm
                mb={0.5}
                pl={0.5}
                label="City"
                type="text"
                name="city"
                onChange={handleChange}
                value={values.city}
                error={errors.city}
              />
            </RowInput>
            <RowInput>
              <InputForm
                mt={0.5}
                mb={0.5}
                pr={0.5}
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
                pl={0.5}
                required
                type="text"
                name="specialization"
                label="Faculty/Specialization"
                onChange={handleChange}
                value={values.specialization}
                error={errors.specialization}
              />
            </RowInput>
            <Row mt={1} ml={2} mr={0.5}>
              <Button name="Close" underline onClick={handleShowModal} />
              <Button
                name={'Edit'}
                underline
                iconName={'arrow-right'}
                mr={1.5}
                onClick={() => handleSubmit(values)}
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
  font-size: 0.8em;
  color: ${th.colorDark};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${th.marginHelper}
  ${th.paddingHelper}
`
const RowInput = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`
const Title = styled.div`
  font-size: 1.3em;
  padding-bottom: 0.5em;
  color: ${th.colorBlue};
  display: flex;
  padding-right: 1.5em;
  text-align: center;
  justify-content: center;
  line-height: normal;
`
export default compose(mutations)(EditUser)
