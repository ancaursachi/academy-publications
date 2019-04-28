const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const Manuscript = require('../../models/Manuscript')
const User = require('../../models/User')

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
    assignedManuscripts: async (parent, args, { loggedInUser }) => {
      const manuscripts = await Manuscript.find({
        professorId: { $exists: true, $regex: loggedInUser._id },
      })
      const users = await User.find({
        role: 'professor',
      })

      const newManuscripts = manuscripts.map(manuscript => {
        const findUser = users.find(
          user => user._id.toString() === manuscript.professorId,
        )

        return {
          ...manuscript._doc,
          professorName: `${findUser.firstName} ${findUser.lastName}`,
        }
      })
      console.log(newManuscripts)

      return newManuscripts
    },
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
    removeEditorFromManuscript: async (parent, { _id }, { loggedInUser }) => {
      return await Manuscript.findOneAndUpdate(
        { _id },
        { $set: { professorId: null } },
        { new: true },
      )
    },
  },
}

module.exports = models
