const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    user(_id: ID!): User!
    users: [User]
    loggedInUser: User!
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
    role: String!
  }
  input UserInput {
    firstName: String
    lastName: String!
    email: String!
    country: String
    city: String
    university: String!
    specialization: String!
    password: String!
  }

  type Token {
    token: String!
  }
  type Mutation {
    signUp(input: UserInput!): Token!
    deleteUser(_id: String!): Boolean
    login(email: String!, password: String!): Token!
  }
`
