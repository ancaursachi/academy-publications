const { jwtSecret, jwtExpiresIn } = require('../../config')
const { AuthenticationError, UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const createToken = async (user, secret, expiresIn) => {
  const { email, password } = user
  return await jwt.sign({ email, password }, secret, { expiresIn })
}

const models = {
  Query: {
    loggedInUser: async (parent, args, { loggedInUser }) => {
      return loggedInUser
    },
    user: async (parent, args, { loggedInUser }) => {
      return await User.findOne({ _id: loggedInUser })
    },
    users: async (parent, args, { loggedInUser }) => {
      return await User.find({})
    },
  },
  Mutation: {
    signUp: async (parent, { input }) => {
      const user = await User.findByLogin(input.email)
      if (user) {
        throw new UserInputError('This email already exist.')
      }
      const newUser = new User({ ...input, role: 'user' })
      await newUser.save()
      return { token: createToken(newUser, jwtSecret, '30m') }
    },
    deleteUser: async (parent, { _id }, { loggedInUser }) => {
      if (loggedInUser._id.toString() === _id) {
        throw new Error("You can't delete your account.")
      }
      const user = await User.findOneAndRemove({ _id })
      if (!user) {
        throw new Error("You can't delete a non existent account")
      } else return true
    },
    editUser: async (parent, { input }, { loggedInUser }) => {
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
        throw new UserInputError('No user found with this login credentials.')
      }
      const isValid = await user.validatePassword(password)
      if (!isValid) {
        throw new AuthenticationError('Invalid password.')
      }
      return { token: createToken(user, jwtSecret, jwtExpiresIn) }
    },
  },
}

module.exports = models
