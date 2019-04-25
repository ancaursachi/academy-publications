import React from 'react'

import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { th } from '../component-ui'

const UsersTable = ({ ...rest }) => {
  const { data } = useQuery(queries.getUsers)
  const { users } = data
  console.log(data)
  return (
    <Root {...rest}>
      <Table>
        <Head>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Country</Th>
            <Th>City</Th>
            <Th>University</Th>
            <Th>Specialization</Th>
            <Th>Role</Th>
          </Tr>
        </Head>
        <Body>
          {users &&
            users.map(user => (
              <Tr key={user._id}>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td>{user.country}</Td>
                <Td>{user.city}</Td>
                <Td>{user.university}</Td>
                <Td>{user.specialization}</Td>
                <Td>{user.role}</Td>
              </Tr>
            ))}
        </Body>
      </Table>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  justify-content: center;
  ${th.marginHelper};
  ${th.paddingHelper};
`

const Table = styled.table`
  margin: 0em 3em;
  border-collapse: collapse;
  width: 100%;
  background-color: ${th.colorWhite};
`
const Head = styled.thead``
const Body = styled.tbody``
const Tr = styled.tr``
const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`
const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: ${th.colorCremLight};
`

export default compose(withRouter)(UsersTable)
