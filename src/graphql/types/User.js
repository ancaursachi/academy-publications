const { gql } = require('apollo-server-express')
const types = gql`
  type Query {
    user(_id: ID!): User!
    users: [User]
  }
  type User {
    _id: String!
    username: String!
  }
  type Mutation {
    addUser(username: String): User!
    editUser(_id: String!, user: UpdateUserInput!): User!
    deleteUser(_id: String!): User!
  }

  input UpdateUserInput {
    username: String
  }
`
module.exports = types
