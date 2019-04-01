import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const addUser = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      _id
    }
  }
`
const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`
export default compose(
  graphql(addUser, { name: 'addUser' }),
  graphql(login, { name: 'login' }),
)
