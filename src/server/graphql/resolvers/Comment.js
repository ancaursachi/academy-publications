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
        editorId: manuscript.editor.id,
        editorComment,
        authorId: manuscript.author.id,
        authorAnswer: null,
        page,
      })
      console.log(newComment)
      // await newComment.save()
      return newComment
    },
  },
}

module.exports = models
