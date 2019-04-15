const User = require('./User')
const Manuscript = require('./Manuscript')
const { mergeTypes } = require('merge-graphql-schemas')
const typeDefs = [User, Manuscript]

module.exports = mergeTypes(typeDefs, { all: true })
