import gql from 'graphql-tag'

const queries = {
  getUsers: gql`
    query {
      users {
        _id
        firstName
        lastName
        email
        country
        city
        university
        specialization
        role
      }
    }
  `,
  getManuscripts: gql`
    query {
      manuscripts {
        _id
        title
        created
        abstract
        articleType
      }
    }
  `,
  getUnassignedManuscripts: gql`
    query {
      unassignedManuscripts {
        _id
        title
        created
        abstract
        articleType
      }
    }
  `,
}

export default queries
