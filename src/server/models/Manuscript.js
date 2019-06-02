const mongoose = require('mongoose')

const ManuscriptSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  articleType: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
  },
  status: {
    type: String,
  },
  version: {
    type: Number,
  },
  created: {
    type: Number,
  },
  userId: {
    type: String,
    required: true,
  },
  userComment: {
    type: String,
  },
  professorId: {
    type: String,
  },
  submissionId: {
    type: String,
    required: true,
  },
  professorName: {
    type: String,
  },
  professorComment: {
    type: String,
  },
  professorDecision: {
    type: String,
  },
  file: {
    type: {
      providerKey: {
        type: String,
      },
      name: {
        type: String,
      },
      size: {
        type: Number,
      },
    },
  },
})

const Manuscript = mongoose.model('Manuscript', ManuscriptSchema)

module.exports = Manuscript
