import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const signUp = gql`
  mutation signUp($input: UserInput!) {
    signUp(input: $input) {
      token
    }
  }
`
const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
const deleteUser = gql`
  mutation deleteUser($id: String!) {
    deleteUser(_id: $id)
  }
`
const createManuscript = gql`
  mutation createManuscript($input: ManuscriptInput!) {
    createManuscript(input: $input)
  }
`
export default compose(
  graphql(signUp, { name: 'signUp' }),
  graphql(login, { name: 'login' }),
  graphql(deleteUser, { name: 'deleteUser' }),
  graphql(createManuscript, { name: 'createManuscript' }),
)
