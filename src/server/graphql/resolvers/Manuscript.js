const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const policyRole = require('../policyRole')
const Manuscript = require('../../models/Manuscript')
const User = require('../../models/User')
const { ObjectId } = require('mongodb')
const { GraphQLUpload } = require('graphql-upload')

const models = {
  Upload: GraphQLUpload,
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
    manuscript: async (parent, { _id }, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin'])
      const manuscript = await Manuscript.findOne({ _id })
      const users = await User.find()

      if (!manuscript.professorId) {
        return manuscript
      }
      const findUser = users.find(
        user => manuscript.professorId === user._id.toString(),
      )
      return {
        ...manuscript._doc,
        professorName: `${findUser.firstName} ${findUser.lastName}`,
      }
    },
    manuscripts: async (parent, args, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin'])
      const manuscripts = await Manuscript.find()
      const users = await User.find()

      const newManuscripts = manuscripts.map(manuscript => {
        if (!manuscript.professorId) {
          return manuscript
        }
        const findUser = users.find(
          user => manuscript.professorId === user._id.toString(),
        )
        return {
          ...manuscript._doc,
          professorName: `${findUser.firstName} ${findUser.lastName}`,
        }
      })
      return newManuscripts
    },
    userManuscripts: async (parent, args, { loggedInUser }) => {
      policyRole(loggedInUser, ['user'])

      const manuscripts = await Manuscript.find({ userId: loggedInUser._id })
      const users = await User.find()

      const newManuscripts = manuscripts.map(manuscript => {
        if (!manuscript.professorId) {
          return manuscript
        }
        const findUser = users.find(
          user => manuscript.professorId === user._id.toString(),
        )
        return {
          ...manuscript._doc,
          professorName: `${findUser.firstName} ${findUser.lastName}`,
        }
      })
      return newManuscripts
    },
    unassignedManuscripts: async (parent, args, { loggedInUser }) => {
      policyRole(loggedInUser, ['professor'])
      return await Manuscript.find({ professorId: null })
    },
    assignedManuscripts: async (parent, args, { loggedInUser }) => {
      policyRole(loggedInUser, ['professor'])

      const manuscripts = await Manuscript.find({
        professorId: { $ne: null, $regex: loggedInUser._id },
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
      return newManuscripts
    },
  },
  Mutation: {
    createManuscript: async (parent, args, { loggedInUser }) => {
      policyRole(loggedInUser, ['user'])
      const createdDate = new Date()

      let submissionId = ObjectId()

      const newManuscript = new Manuscript({
        ...args.input,
        submissionId,
        created: createdDate,
        userId: loggedInUser._id,
      })
      await newManuscript.save()
      return newManuscript
    },
    deleteManuscript: async (parent, { _id }, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin', 'user'])
      const manuscript = await Manuscript.findOneAndRemove({ _id })

      if (!manuscript) {
        throw new Error("You can't delete a non existent manuscript")
      } else return manuscript
    },
    addEditorOnManuscript: async (parent, { _id }, { loggedInUser }) => {
      policyRole(loggedInUser, ['professor'])

      const manuscript = await Manuscript.findOneAndUpdate(
        { _id: _id, professorId: null },
        { $set: { professorId: loggedInUser._id } },
        { new: true },
      )
      if (!manuscript) {
        throw new Error('This manuscript already have an editor.')
      } else {
        return manuscript
      }
    },
    removeEditorFromManuscript: async (parent, { _id }, { loggedInUser }) => {
      policyRole(loggedInUser, ['professor', 'admin'])

      const manuscript = await Manuscript.findOneAndUpdate(
        { _id, professorId: { $ne: null } },
        { $set: { professorId: null } },
        { new: true },
      )

      if (!manuscript) {
        throw new Error('Manuscript was not found.')
      } else {
        return manuscript
      }
    },
  },
}

module.exports = models
