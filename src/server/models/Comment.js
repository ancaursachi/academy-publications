const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  manuscriptId: {
    type: String,
  },
  editorId: {
    type: String,
  },
  editorComment: {
    type: String,
  },
  authorId: {
    type: String,
  },
  authorAnswer: {
    type: String,
  },
  page: {
    type: Number,
  },
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
