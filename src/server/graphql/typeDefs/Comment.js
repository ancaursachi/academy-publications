const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    comment(_id: ID!): Comment
    comments: [Comment]
    manuscriptComments(manuscriptId: ID!): [Comment]
    pageComments(manuscriptId: ID!, page: Int): [Comment]
  }

  type ReplyComment {
    _id: String
    text: String
    userId: String
    role: String
    created: Date
  }

  type Comment {
    _id: String
    manuscriptId: String
    page: Int
    created: Date
    text: String
    userId: String
    role: String
    reply: [ReplyComment]
  }

  input CreateCommentInput {
    manuscriptId: String
    page: Int
    text: String
  }
  input CreateReplyInput {
    commentId: String
    text: String
  }

  type Mutation {
    createComment(input: CreateCommentInput): Comment
    addReply(input: CreateReplyInput): Comment
  }
`
