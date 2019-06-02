const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const { last } = require('lodash')
const policyRole = require('../policyRole')
const Manuscript = require('../../models/Manuscript')
const User = require('../../models/User')
const { ObjectId } = require('mongodb')
const { GraphQLUpload } = require('graphql-upload')
const s3Service = require('../../s3Service')

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

      const newManuscripts = manuscripts
        .filter(manuscript => manuscript.status.toLowerCase() !== 'draft')
        .map(manuscript => {
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
    getSubmission: async (parent, { submissionId }, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin', 'user', 'professor'])

      const { role } = loggedInUser
      const files = await File.find()
      const manuscripts = await Manuscript.find({ submissionId })
      const users = await User.find()

      const newManuscripts = manuscripts.map(async manuscript => {
        const findFile = files.find(
          file => manuscript.fileId === file._id.toString(),
        )

        const findProfessor = users.find(
          user => manuscript.professorId === user._id.toString(),
        )

        const url = await s3Service.getSignedUrl(findFile.providerKey)
        return {
          ...manuscript._doc,
          filename: findFile.filename,
          size: findFile.size,
          url,
          userRole: role,
          professorName:
            findProfessor && role !== 'user'
              ? `${findProfessor.firstName} ${findProfessor.lastName}`
              : null,
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
      const manuscripts = await Manuscript.find({ professorId: null })
      const filteredManuscripts = manuscripts.filter(
        manuscript => manuscript.status.toLowerCase() !== 'draft',
      )

      return filteredManuscripts
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
        status: 'Draft',
        version: 1,
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
        { $set: { professorId: loggedInUser._id, status: 'Editor Assigned' } },
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
        { $set: { professorId: null, status: 'Submitted' } },
        { new: true },
      )

      if (!manuscript) {
        throw new Error('Manuscript was not found.')
      } else {
        return manuscript
      }
    },
    updateManuscript: async (parent, { _id, input }, { loggedInUser }) => {
      policyRole(loggedInUser, ['user', 'professor'])
      const { title, abstract, articleType, userComment } = input
      const file = await File.findOne({ manuscriptId: _id })

      const manuscript = await Manuscript.findOneAndUpdate(
        { _id },
        {
          $set: {
            abstract,
            title,
            articleType,
            userComment,
            fileId: file._id,
            status: 'Submitted',
          },
        },
        { new: true },
      )
      if (!(abstract || title || articleType || file._id)) {
        throw new Error("You don't have enough parameters")
      } else {
        return manuscript
      }
    },
    addProfessorDecision: async (
      parent,
      { submissionId, input },
      { loggedInUser },
    ) => {
      policyRole(loggedInUser, ['professor'])
      const { professorDecision, professorComment } = input
      const manuscript = await Manuscript.findOneAndUpdate(
        { submissionId },
        {
          $set: {
            professorDecision,
            professorComment,
            status: 'Professor Submitted',
          },
        },
        { new: true },
      )
      return manuscript
    },
  },
}

module.exports = models
