const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    file(_id: ID!): FileDB!
    files: [FileDB]
  }
  type FileDB {
    _id: String
    name: String
    size: Int
    url: String
    manuscriptId: String
  }
  type File {
    filename: String
    mimetype: String
    encoding: String
    size: Int
    manuscriptId: String
    url: String
  }
  type Mutation {
    uploadFile(
      file: Upload!
      type: String
      size: Int
      manuscriptId: String
    ): File!
  }
`
