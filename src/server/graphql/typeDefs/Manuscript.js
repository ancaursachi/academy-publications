const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar Date
  type Query {
    manuscript(_id: ID!): Manuscript!
    manuscripts: [Manuscript]
  }
  type Manuscript {
    _id: String!
    title: String!
    userId: String!
    created: Date
    abstract: String!
    articleType: String!
    manuscriptFile: String
  }
  input ManuscriptInput {
    title: String!
    abstract: String!
    articleType: String!
    manuscriptFile: String
  }

  type Mutation {
    createManuscript(input: ManuscriptInput!): Boolean
  }
`
