import gql from 'graphql-tag'

const queries = {
  getUsers: gql`
    query {
      users {
        _id
        firstName
      }
    }
  `,
}

export default queries
