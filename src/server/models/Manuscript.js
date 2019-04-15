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
})

const Manuscript = mongoose.model('Manuscript', ManuscriptSchema)

module.exports = Manuscript
