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
  },
  created: {
    type: Number,
  },
  userId: {
    type: String,
    required: true,
  },
  professorId: {
    type: String,
  },
})

const Manuscript = mongoose.model('Manuscript', ManuscriptSchema)

module.exports = Manuscript
