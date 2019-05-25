const mongoose = require('mongoose')

const ManuscriptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  articleType: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  manuscriptFile: {
    type: String,
    required: true,
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
})

const Manuscript = mongoose.model('Manuscript', ManuscriptSchema)

module.exports = Manuscript
