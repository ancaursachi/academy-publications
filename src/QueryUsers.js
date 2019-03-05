import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
const QueryUsers = () => (
  <Query
    query={gql`
      {
        users {
          _id
          username
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      return data.users.map(({ username, _id }, index) => (
        <div key={_id}>{username}</div>
      ))
    }}
  </Query>
)
export default QueryUsers
