const resolvers = require('./resolvers')
const typeDefs = require('./types')
const { makeExecutableSchema } = require('graphql-tools')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
module.exports = schema
