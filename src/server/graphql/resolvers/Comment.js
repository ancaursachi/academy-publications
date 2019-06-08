const policyRole = require('../policyRole')
const Comment = require('../../models/Comment')
const Manuscript = require('../../models/Manuscript')

const models = {
  Query: {
    comment: async (parent, { _id }, { loggedInUser }) => {
      policyRole(loggedInUser, ['user', 'professor', 'admin'])
      return await Comment.findOne({ _id })
    },
    comments: async (parent, { _id }, { loggedInUser }) => {
      policyRole(loggedInUser, ['user', 'professor', 'admin'])
      return await Comment.find({})
    },
    manuscriptComments: async (parent, { manuscriptId }, { loggedInUser }) => {
      policyRole(loggedInUser, ['user', 'professor', 'admin'])
      return await Comment.find({ manuscriptId })
    },
    pageComments: async (parent, { manuscriptId, page }, { loggedInUser }) => {
      policyRole(loggedInUser, ['user', 'professor', 'admin'])
      return await Comment.find({ manuscriptId, page })
    },
  },

  Mutation: {
    createComment: async (
      parent,
      { input: { manuscriptId, editorComment, page } },
      { loggedInUser },
    ) => {
      policyRole(loggedInUser, ['professor', 'admin', 'user'])
      const manuscript = await Manuscript.findOne({ _id: manuscriptId })

      if (!manuscript) {
        throw Error('No manuscript found!')
      }
      const newComment = new Comment({
        manuscriptId,
        created: new Date(),
        editorId: manuscript.editor.id,
        editorComment,
        authorId: manuscript.author.id,
        authorAnswer: null,
        page,
      })
      await newComment.save()
      return newComment
    },
    addAuthorAnswer: async (
      parent,
      { input: { _id, authorAnswer } },
      { loggedInUser },
    ) => {
      policyRole(loggedInUser, ['professor', 'admin', 'user'])
      const comment = await Comment.findOneAndUpdate(
        { _id: _id, authorAnswer: null },
        {
          $set: { authorAnswer: authorAnswer },
        },
        { new: true },
      )
      if (!comment) {
        throw Error('No comment found!')
      }
      return comment
    },
  },
}

module.exports = models
