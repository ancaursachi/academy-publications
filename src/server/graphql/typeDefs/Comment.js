const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    comment(_id: ID!): Comment!
    comments: [Comment]
  }
  type Comment {
    manuscriptId: String
    editorId: String
    editorComment: String
    authorId: String
    authorAnswer: String
    page: Int
  }

  input EditorComment {
    manuscriptId: String
    editorId: String
    editorComment: String
    page: Int
  }
  type Mutation {
    createComment(input: EditorComment): Comment!
  }
`
