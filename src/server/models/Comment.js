const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  manuscriptId: {
    type: String,
  },
  page: {
    type: Number,
  },
  created: {
    type: Number,
  },
  comment: {
    type: String,
  },
  userId: {
    type: String,
  },
  role: {
    type: String,
  },
  reply: {
    type: [
      {
        _id: {
          type: String,
        },
        comment: {
          type: String,
        },
        userId: {
          type: String,
        },
        role: {
          type: String,
        },
        created: {
          type: Number,
        },
      },
    ],
  },
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
