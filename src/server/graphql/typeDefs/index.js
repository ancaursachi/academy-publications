const User = require('./User')
const Manuscript = require('./Manuscript')
const File = require('./File')

const { mergeTypes } = require('merge-graphql-schemas')
const typeDefs = [User, Manuscript, File]

module.exports = mergeTypes(typeDefs, { all: true })
