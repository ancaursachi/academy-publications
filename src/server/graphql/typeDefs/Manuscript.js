const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar Date
  scalar Upload
  type Query {
    manuscript(_id: ID!): Manuscript!
    manuscripts: [Manuscript]
    getSubmission(submissionId: ID!): [Submission]
    unassignedManuscripts: [Manuscript]
    userManuscripts: [Manuscript]
    assignedManuscripts: [Manuscript]
  }
  type Manuscript {
    _id: String!
    title: String
    userId: String!
    created: Date
    abstract: String
    status: String
    version: Int
    userComment: String
    professorId: String
    articleType: String!
    submissionId: String!
    fileId: String
    professorName: String
    professorComment: String
  }

  type Submission {
    _id: String!
    title: String
    userId: String!
    created: Date
    abstract: String
    status: String
    version: Int
    userComment: String
    professorId: String
    articleType: String!
    submissionId: String!
    fileId: String
    professorComment: String
    professorName: String
    filename: String
    size: String
    url: String
  }
  input ManuscriptInput {
    title: String
    abstract: String
    articleType: String
    fileId: String
    userComment: String
  }
  type Mutation {
    createManuscript(input: ManuscriptInput): Manuscript
    addEditorOnManuscript(_id: String!): Manuscript
    updateManuscript(_id: String, input: ManuscriptInput): Manuscript
    removeEditorFromManuscript(_id: String!): Manuscript
    deleteManuscript(_id: String!): Manuscript
  }
`
