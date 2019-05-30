const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  size: {
    type: Number,
  },
  manuscriptId: {
    type: String,
  },
  providerKey: {
    type: String,
  },
})

const File = mongoose.model('File', FileSchema)

module.exports = File
