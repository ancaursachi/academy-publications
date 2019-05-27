const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  size: {
    type: Number,
  },
  providedKey: {
    type: String,
  },
})

const File = mongoose.model('File', FileSchema)

module.exports = File
