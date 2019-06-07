import React, { useState } from 'react'
import { Formik } from 'formik'
import { useQuery } from 'react-apollo-hooks'
import { get } from 'lodash'
import { compose } from 'recompose'
import {
  th,
  Row,
  Modal,
  Loader,
  Button,
  InputForm,
  InputSelect,
  DetailsCard,
} from '../component-ui'
import styled from 'styled-components'
import { queries, mutations } from '../qraphqlClient'
import { editUserValidation } from '../component-users'

const Profile = ({ history, editUser, deleteUser, ...rest }) => {
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(!showModal)

  const { data, loading } = useQuery(queries.getLoggedInUser)
  const user = get(data, 'loggedInUser')

  const initialValues = {
    _id: get(user, '_id'),
    firstName: get(user, 'firstName'),
    lastName: get(user, 'lastName'),
    email: get(user, 'email'),
    role: get(user, 'role'),
    country: get(user, 'country'),
    city: get(user, 'city'),
    university: get(user, 'university'),
    specialization: get(user, 'specialization'),
  }

  const handleEditUser = input => {
    return editUser({
      variables: {
        input,
      },
      refetchQueries: [
        {
          query: queries.getUsers,
        },
        {
          query: queries.getLoggedInUser,
        },
        {
          query: queries.getAssignedManuscripts,
        },
        {
          query: queries.getUnassignedManuscripts,
        },
        {
          query: queries.getPublicManuscripts,
        },
        {
          query: queries.getManuscripts,
        },
      ],
    })
      .then(() => {})
      .catch(error => {
        alert(error.message)
      })
  }

  const handleDelete = () => {
    handleShowModal()
  }

  const handleDeleteFinal = () => {
    handleShowModal()
    return deleteUser({
      variables: {
        id: user._id,
      },
    })
      .then(() => {
        localStorage.clear()
        history.push('/login')
      })
      .catch(error => alert(error))
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editUserValidation}
      onSubmit={handleEditUser}
    >
      {({ values, handleChange, handleSubmit, errors }) => {
        return (
          console.log(values) || (
            <Root pr={2} pl={1} {...rest}>
              <Column />
              <DetailsCard>
                <Column>
                  {loading ? (
                    <RootLoader {...rest}>
                      <Loader iconSize={2} />
                    </RootLoader>
                  ) : (
                    <Content>
                      <Title>Profile</Title>
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
                      <Row mt={2} justify="space-around">
                        <Button
                          name={'Delete Acount'}
                          underline
                          iconName={'trash-alt'}
                          color={th.colorBrick}
                          mr={1.5}
                          onClick={handleDelete}
                        />
                        <Button
                          name={'Edit'}
                          underline
                          iconName={'arrow-right'}
                          mr={1.5}
                          onClick={handleSubmit}
                        />
                      </Row>
                      <Modal
                        showModal={showModal}
                        handleShowModal={handleShowModal}
                        title={'Are you sure you want to delete your account?'}
                        buttonName={'Delete'}
                        onClickSubmit={handleDeleteFinal}
                      />
                    </Content>
                  )}
                </Column>
              </DetailsCard>
              <Column />
            </Root>
          )
        )
      }}
    </Formik>
  )
}
const Root = styled.div`
  overflow: scroll;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  font-family: 'Nunito';
  ${th.marginHelper};
  ${th.paddingHelper};
`
const Column = styled.div``
const Content = styled.div``
const Title = styled.div`
  font-family: 'Nunito';
  font-size: 1.6em;
  font-weight: 600;
  width: 100%;
  padding-bottom: 1em;
  color: ${th.colorBlue};
`

const RootLoader = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Nunito';
  ${th.marginHelper};
  ${th.paddingHelper};
`

const RowInput = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`

export default compose(mutations)(Profile)
