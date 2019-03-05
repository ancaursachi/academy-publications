import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
const QueryUsers = () => (
  <Query
    query={gql`
      {
        users {
          id
          username
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      return data.users.map(({ id, username }) => (
        <div key={id}>{username}</div>
      ))
    }}
  </Query>
)
export default QueryUsers
