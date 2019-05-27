const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  size: {
    type: Number,
  },
  manuscriptId: {
    type: String,
  },
  url: {
    type: String,
  },
})

const File = mongoose.model('File', FileSchema)

module.exports = File
