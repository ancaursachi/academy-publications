const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    file(_id: ID!): FileDB!
    files: [FileDB]
  }
  type FileDB {
    _id: String
    filename: String
    size: Int
    providerKey: String
    manuscriptId: String
  }
  type File {
    filename: String
    mimetype: String
    encoding: String
    size: Int
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
