const policyRole = require('../policyRole')
const Comment = require('../../models/Comment')
const Manuscript = require('../../models/Manuscript')
const { ObjectId } = require('mongodb')

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
    userCommentsPerManuscript: async (
      parent,
      { manuscriptId, page },
      { loggedInUser },
    ) => {
      policyRole(loggedInUser, ['user', 'professor', 'admin'])
      return await Comment.find({
        page,
        manuscriptId,
        userId: loggedInUser._id,
      })
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
      { input: { manuscriptId, text, page } },
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
        userId: loggedInUser._id,
        text,
        role: loggedInUser.role,
        page,
        reply: [],
      })

      await newComment.save()
      return newComment
    },
    addReply: async (
      parent,
      { input: { commentId, text } },
      { loggedInUser },
    ) => {
      policyRole(loggedInUser, ['professor', 'admin', 'user'])
      const reply = {
        _id: ObjectId(),
        text,
        userId: loggedInUser._id,
        role: loggedInUser.role,
        created: Date.now(),
      }
      const newComment = await Comment.findOneAndUpdate(
        { _id: commentId },
        {
          $push: {
            reply,
          },
        },
        { new: true },
      )

      if (!newComment) {
        throw Error('No comment found!')
      }
      return newComment
    },
  },
}

module.exports = models
