const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
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
  role: {
    type: String,
    required: true,
  },
})
UserSchema.statics.findByLogin = async function(email) {
  return await this.findOne({ email })
}

UserSchema.pre('save', async function() {
  this.password = await this.generatePasswordHash()
})

UserSchema.methods.generatePasswordHash = async function() {
  const saltRounds = 10
  return await bcrypt.hash(this.password, saltRounds)
}

UserSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
