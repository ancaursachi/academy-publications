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
    comment: String
    userId: String
    role: String
    created: Date
  }

  type Comment {
    _id: String
    manuscriptId: String
    page: Int
    created: Date
    comment: String
    userId: String
    role: String
    reply: [ReplyComment]
  }

  input CreateCommentInput {
    manuscriptId: String
    page: Int
    comment: String
  }
  input CreateReplyInput {
    commentId: String
    comment: String
  }

  type Mutation {
    createComment(input: CreateCommentInput): Comment
    addReply(input: CreateReplyInput): Comment
  }
`
