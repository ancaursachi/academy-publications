const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    // unique: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: Schema.Types.Mixed,
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  university: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  password: {
    type: Schema.Types.Mixed,
    required: true,
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
