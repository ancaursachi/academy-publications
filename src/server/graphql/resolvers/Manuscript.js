const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const Manuscript = require('../../models/Manuscript')
const models = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null
    },
  }),
  Query: {
    manuscript: async (parent, { _id }) => {
      return await Manuscript.findOne({ _id })
    },
    manuscripts: async () => {
      return await Manuscript.find()
    },
    unassignedManuscripts: async () => {
      return await Manuscript.find({ professorId: null })
    },
    // assignedManuscripts: async () => {
    //   return await Manuscript.find({ professorId: null })
    // },
  },
  Mutation: {
    createManuscript: async (parent, args, { loggedInUser }) => {
      const createdDate = new Date()
      const newManuscript = new Manuscript({
        ...args.input,
        created: createdDate,
        userId: loggedInUser._id,
      })
      await newManuscript.save()
    },
    addEditorOnManuscript: async (parent, { _id }, { loggedInUser }) => {
      return await Manuscript.findOneAndUpdate(
        { _id },
        { $set: { professorId: loggedInUser._id } },
        { new: true },
      )
    },
  },
}

module.exports = models
