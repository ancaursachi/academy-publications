import React from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { th, Loader, SearchBar } from '../component-ui'
import { mutations } from '../qraphqlClient'
import { DeleteUserModal, EditUserModal } from '../component-users'

const UsersTable = ({ deleteUser, ...rest }) => {
  const { data, loading } = useQuery(queries.getUsers)
  const { users } = data

  const initialValues = { searchValue: '', searchType: 'email' }

  if (loading) {
    return (
      <Root {...rest}>
        <Loader />
      </Root>
    )
  }
  return (
    <Formik initialValues={initialValues}>
      {({ values, handleChange }) => {
        return (
          <Root {...rest}>
            <Content>
              <TitlePage>Users</TitlePage>
              <SearchBar
                values={values}
                handleChange={handleChange}
                options={[
                  'firstName',
                  'lastName',
                  'email',
                  'country',
                  'city',
                  'university',
                  'specialization',
                  'role',
                ]}
              />
              <Table>
                <TableRow>
                  <TableHeadCell>First Name</TableHeadCell>
                  <TableHeadCell>Last Name</TableHeadCell>
                  <TableHeadCell>Email</TableHeadCell>
                  <TableHeadCell>Country</TableHeadCell>
                  <TableHeadCell>City</TableHeadCell>
                  <TableHeadCell>University</TableHeadCell>
                  <TableHeadCell>Specialization</TableHeadCell>
                  <TableHeadCell>Role</TableHeadCell>
                  <div />
                  <div />
                </TableRow>
                {users &&
                  users
                    .filter(user =>
                      user[values.searchType]
                        .toLowerCase()
                        .includes(values.searchValue.toLowerCase()),
                    )
                    .map(user => (
                      <TableRow key={user._id}>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>{user.city}</TableCell>
                        <TableCell>{user.university}</TableCell>
                        <TableCell>{user.specialization}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <DeleteUserModal user={user} />
                        <EditUserModal user={user} />
                      </TableRow>
                    ))}
              </Table>
            </Content>
          </Root>
        )
      }}
    </Formik>
  )
}

const Root = styled.div`
  overflow: scroll;
  width: 100%;
  display: flex;
  justify-content: center;
  ${th.marginHelper};
  ${th.paddingHelper};
`
const Content = styled.div`
  width: 90%;
`
const TitlePage = styled.div`
  font-family: 'Nunito';
  font-size: 1.6em;
  font-weight: 600;
  width: 100%;
  padding-bottom: 1.5em;
  color: ${th.colorBlue};
`
const Table = styled.div`
  margin: 1em 0em;
  width: 100%;
`
const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 10%) repeat(1, 20%) repeat(5, 10%) repeat(
      2,
      5%
    );
`
const TableCell = styled.div`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: ${th.colorWhite};
  overflow-wrap: break-word;
`
const TableHeadCell = styled.div`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: ${th.colorCremLight};
  overflow-wrap: break-word;
`
export default compose(
  mutations,
  withRouter,
)(UsersTable)
