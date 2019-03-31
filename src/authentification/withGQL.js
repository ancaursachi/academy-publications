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
export default compose(graphql(addUser, { name: 'addUser' }))
