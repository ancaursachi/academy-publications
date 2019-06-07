const User = require('./User')
const Manuscript = require('./Manuscript')
const File = require('./File')
const Comment = require('./Comment')
const { mergeTypes } = require('merge-graphql-schemas')
const typeDefs = [User, Manuscript, File, Comment]

module.exports = mergeTypes(typeDefs, { all: true })
