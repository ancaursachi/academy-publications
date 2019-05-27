const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    file(_id: ID!): File!
    files: [File]
  }
  type File {
    _id: String
    name: String
    size: Int
    providedKey: String
  }
  input FileInput {
    name: String
    size: Int
    providedKey: String
  }
  type Mutation {
    createFile(input: FileInput): File
  }
`
