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
  getManuscripts: gql`
    query {
      manuscripts {
        _id
        title
        abstract
        articleType
      }
    }
  `,
}

export default queries
