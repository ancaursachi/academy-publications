const { jwtSecret, jwtExpiresIn } = require('../../config')
// const { AuthenticationError, UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const policyRole = require('../policyRole')

const createToken = async (user, secret, expiresIn) => {
  const { email, password } = user
  return await jwt.sign({ email, password }, secret, { expiresIn })
}

const models = {
  Query: {
    loggedInUser: async (parent, args, { loggedInUser }) => {
      if (!loggedInUser) {
        throw new Error('You have to log in to make this request')
      }
      return loggedInUser
    },
    user: async (parent, { _id }, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin'])
      return await User.findOne({ _id })
    },
    users: async (parent, args, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin'])
      return await User.find({})
    },
  },
  Mutation: {
    signUp: async (parent, { input }) => {
      const user = await User.findByLogin(input.email)
      if (user) {
        throw new Error('This email already exist.')
      }
      const newUser = new User({ ...input, role: 'user' })
      await newUser.save()
      return { token: createToken(newUser, jwtSecret, '30m') }
    },
    deleteUser: async (parent, { _id }, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin', 'user', 'professor'])
      const role = loggedInUser.role
      if (loggedInUser._id.toString() === _id && role === 'admin') {
        throw new Error("You can't delete your account.")
      }
      const user = await User.findOneAndRemove({ _id })

      if (!user) {
        throw new Error("You can't delete a non existent account")
      }
    },
    editUser: async (parent, { input }, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin', 'professor', 'user'])
      const { _id, ...userRest } = input
      return await User.findOneAndUpdate(
        { _id },
        { $set: userRest },
        { new: true },
      )
    },
    login: async (parent, { email, password }, { loggedInUser }) => {
      const user = await User.findByLogin(email)
      if (!user) {
        throw new Error('No user found with this login credentials.')
      }
      const isValid = await user.validatePassword(password)
      if (!isValid) {
        throw new Error('Invalid password.')
      }
      return { token: createToken(user, jwtSecret, jwtExpiresIn) }
    },
  },
}

module.exports = models
