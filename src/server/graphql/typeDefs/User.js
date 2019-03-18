const { gql } = require('apollo-server-express')

module.exports = gql`
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
    editUser(_id: String!, username: String!): User!
    deleteUser(_id: String!): Boolean
  }
`
