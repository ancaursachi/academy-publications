const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const policyRole = require('../policyRole')
const Manuscript = require('../../models/Manuscript')
const User = require('../../models/User')
const { ObjectId } = require('mongodb')
const { GraphQLUpload } = require('graphql-upload')
const { chain, last } = require('lodash')

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
      const manuscripts = await Manuscript.find({ submissionId })
      const users = await User.find()

      const newManuscripts = manuscripts.map(async manuscript => {
        const findEditor = users.find(
          user =>
            manuscript.editor &&
            user._id.toHexString() === manuscript.editor.id.toHexString(),
        )
        const { editor, ...restManuscript } = manuscript._doc
        return {
          userRole: role,
          editor: {
            name: findEditor
              ? `${findEditor.firstName} ${findEditor.lastName}`
              : null,
            ...editor,
          },
          ...restManuscript,
        }
      })

      return newManuscripts
    },
    userManuscripts: async (parent, args, { loggedInUser }) => {
      policyRole(loggedInUser, ['user'])

      const manuscripts = await Manuscript.find({
        'author.id': loggedInUser._id,
      })

      return chain(manuscripts)
        .groupBy('submissionId')
        .map(manuscript => {
          return last(manuscript)
        })
        .value()
    },
    unassignedManuscripts: async (parent, args, { loggedInUser }) => {
      policyRole(loggedInUser, ['professor'])
      const manuscripts = await Manuscript.find({ 'editor.id': null })
      const filteredManuscripts = manuscripts.filter(
        manuscript => manuscript.status.toLowerCase() !== 'draft',
      )

      return filteredManuscripts
    },
    assignedManuscripts: async (parent, args, { loggedInUser }) => {
      policyRole(loggedInUser, ['professor'])

      const manuscripts = await Manuscript.find({
        'editor.id': loggedInUser._id,
      })

      const groupedManuscripts = chain(manuscripts)
        .groupBy('submissionId')
        .map(manuscript => {
          return last(manuscript)
        })
        .value()

      console.log(groupedManuscripts)
      const users = await User.find({
        role: 'professor',
      })

      const newManuscripts = groupedManuscripts.map(manuscript => {
        const findEditor = users.find(
          user => user._id.toHexString() === manuscript.editor.id.toHexString(),
        )
        const { editor, ...restManuscript } = manuscript._doc

        return {
          editor: {
            name: `${findEditor.firstName} ${findEditor.lastName}`,
            ...editor,
          },
          ...restManuscript,
        }
      })
      return newManuscripts
    },
  },
  Mutation: {
    createManuscript: async (parent, { input }, { loggedInUser }) => {
      policyRole(loggedInUser, ['user'])
      const {
        author: { comment },
        ...restInput
      } = input

      const newManuscript = new Manuscript({
        submissionId: ObjectId(),
        created: new Date(),
        status: 'Submitted',
        version: 1,
        ...restInput,
        author: {
          id: loggedInUser._id,
          comment,
        },
      })

      await newManuscript.save()
      return newManuscript
    },
    createRevision: async (
      parent,
      { oldManuscript, input },
      { loggedInUser },
    ) => {
      policyRole(loggedInUser, ['user'])

      const {
        author: { comment },
        ...restInput
      } = input

      const newManuscript = new Manuscript({
        submissionId: oldManuscript.submissionId,
        created: new Date(),
        status: 'Revision Submitted',
        version: oldManuscript.version + 1,
        ...restInput,
        editor: {
          id: ObjectId(oldManuscript.editor.id),
          name: oldManuscript.editor.name,
        },
        author: {
          id: loggedInUser._id,
          comment,
        },
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
        { _id: _id, 'editor.id': null },
        {
          $set: { 'editor.id': loggedInUser._id, status: 'Editor Assigned' },
        },
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
        { _id, 'editor.id': { $ne: null } },
        { $set: { 'editor.id': null, status: 'Submitted' } },
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
      { manuscriptId, input },
      { loggedInUser },
    ) => {
      policyRole(loggedInUser, ['professor'])
      const { decision, comment } = input
      const manuscript = await Manuscript.findOneAndUpdate(
        { _id: manuscriptId },
        {
          $set: {
            'editor.decision': decision,
            'editor.comment': comment,
            status: decision,
          },
        },
        { new: true },
      )
      return manuscript
    },
  },
}

module.exports = models
