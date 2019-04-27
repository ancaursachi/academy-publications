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
const editUser = gql`
  mutation editUser($input: UserEditInput!) {
    editUser(input: $input) {
      _id
      firstName
    }
  }
`
const createManuscript = gql`
  mutation createManuscript($input: ManuscriptInput!) {
    createManuscript(input: $input)
  }
`
const addEditorOnManuscript = gql`
  mutation addEditorOnManuscript($id: String!) {
    addEditorOnManuscript(_id: $id) {
      professorId
    }
  }
`
export default compose(
  graphql(signUp, { name: 'signUp' }),
  graphql(login, { name: 'login' }),
  graphql(deleteUser, { name: 'deleteUser' }),
  graphql(editUser, { name: 'editUser' }),
  graphql(createManuscript, { name: 'createManuscript' }),
  graphql(addEditorOnManuscript, { name: 'addEditorOnManuscript' }),
)
