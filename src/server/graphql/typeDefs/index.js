const User = require('./User')
const { mergeTypes } = require('merge-graphql-schemas')
const typeDefs = [User]

module.exports = mergeTypes(typeDefs, { all: true })
