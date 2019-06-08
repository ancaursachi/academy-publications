const User = require('./User')
const Manuscript = require('./Manuscript')
const File = require('./File')
const Comment = require('./Comment')

const { mergeResolvers } = require('merge-graphql-schemas')
const resolvers = [User, Manuscript, File, Comment]

module.exports = mergeResolvers(resolvers)
