const User = require('./User')
const Manuscript = require('./Manuscript')
const File = require('./File')

const { mergeResolvers } = require('merge-graphql-schemas')
const resolvers = [User, Manuscript, File]

module.exports = mergeResolvers(resolvers)
