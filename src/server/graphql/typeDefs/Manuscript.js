const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar Date
  type Query {
    manuscript(_id: ID!): Manuscript!
    manuscripts: [Manuscript]
    unassignedManuscripts: [Manuscript]
    assignedManuscripts: [Manuscript]
  }
  type Manuscript {
    _id: String!
    title: String!
    userId: String!
    created: Date
    abstract: String!
    professorId: String
    articleType: String!
    manuscriptFile: String
    professorName: String
  }
  input ManuscriptInput {
    title: String!
    abstract: String!
    articleType: String!
    manuscriptFile: String
  }
  type Mutation {
    createManuscript(input: ManuscriptInput!): Boolean
    addEditorOnManuscript(_id: String!): Manuscript
    removeEditorFromManuscript(_id: String!): Manuscript
  }
`
