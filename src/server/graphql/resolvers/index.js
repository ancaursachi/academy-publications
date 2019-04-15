const User = require('./User')
const Manuscript = require('./Manuscript')
const { mergeResolvers } = require('merge-graphql-schemas')
const resolvers = [User, Manuscript]

module.exports = mergeResolvers(resolvers)
