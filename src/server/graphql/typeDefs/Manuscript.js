const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar Date
  scalar Upload
  type Query {
    manuscript(_id: ID!): Manuscript!
    manuscripts: [Manuscript]
    unassignedManuscripts: [Manuscript]
    userManuscripts: [Manuscript]
    assignedManuscripts: [Manuscript]
  }
  type Manuscript {
    _id: String!
    title: String!
    userId: String!
    created: Date
    abstract: String!
    userComment: String
    professorId: String
    articleType: String!
    submissionId: String!
    manuscriptFile: String!
    professorName: String
    professorComment: String
  }
  input ManuscriptInput {
    title: String!
    abstract: String!
    articleType: String!
    manuscriptFile: String
  }
  type File {
    filename: String
    mimetype: String
    encoding: String
    size: Int
  }
  type Mutation {
    createManuscript(input: ManuscriptInput!): Manuscript
    addEditorOnManuscript(_id: String!): Manuscript
    removeEditorFromManuscript(_id: String!): Manuscript
    deleteManuscript(_id: String!): Manuscript
    uploadFile(file: Upload!, type: String, size: Int): File!
  }
`
