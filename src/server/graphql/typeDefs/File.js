const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    file(_id: ID!): File!
    files: [File]
    signedUrl(providerKey: String): String
  }
  type File {
    providerKey: String
    name: String
    size: Int
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
