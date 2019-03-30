import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const addUser = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $country: String
    $city: String
    $university: String!
    $specialization: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      country: $country
      city: $city
      university: $university
      specialization: $specialization
      password: $password
    ) {
      firstName
      lastName
      email
    }
  }
`
export default compose(graphql(addUser, { name: 'addUser' }))
