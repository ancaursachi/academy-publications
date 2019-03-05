const User = require('./User')
const { mergeResolvers } = require('merge-graphql-schemas')
const resolvers = [User]

module.exports = mergeResolvers(resolvers)
