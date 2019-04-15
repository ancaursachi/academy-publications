const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    manuscript(_id: ID!): Manuscript!
    manuscripts: [Manuscript]
  }
  type Manuscript {
    _id: String!
    title: String
    articleType: String!
    abstract: String!
    manuscriptFile: String
  }
  input ManuscriptInput {
    title: String
    articleType: String!
    abstract: String!
    manuscriptFile: String
  }

  type Mutation {
    createManuscript(input: ManuscriptInput!): Boolean
  }
`
