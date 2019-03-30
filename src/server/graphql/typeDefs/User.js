const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    user(_id: ID!): User!
    users: [User]
  }
  type User {
    _id: String!
    firstName: String
    lastName: String!
    email: String!
    country: String
    city: String
    university: String!
    specialization: String!
    password: String!
  }
  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      country: String
      city: String
      university: String!
      specialization: String!
      password: String!
    ): User!
    editUser(_id: String!, username: String!): User!
    deleteUser(_id: String!): Boolean
  }
`
