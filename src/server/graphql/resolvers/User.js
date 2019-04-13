const { jwtSecret } = require('../../config')
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

    user: async (parent, args, { logInUser }) => {
      console.log('context', logInUser)
      return await User.findOne({ _id: logInUser })
    },
    users: async (parent, args, { logInUser }) => {
      return await User.find({})
    },
  },
  Mutation: {
    signUp: async (parent, args) => {
      const user = await User.findByLogin(args.input.email)
      if (user) {
        throw new UserInputError('This email already exist.')
      }
      const newUser = new User(args.input)
      await newUser.save()
      return { token: createToken(newUser, jwtSecret, '30m') }
    },
    deleteUser: (parent, args) => {
      return User.findOneAndRemove(args)
    },
    login: async (parent, { email, password }, { logInUser }) => {
      const user = await User.findByLogin(email)
      if (!user) {
        throw new UserInputError('No user found with this login credentials.')
      }
      const isValid = await user.validatePassword(password)
      if (!isValid) {
        throw new AuthenticationError('Invalid password.')
      }
      return { token: createToken(user, jwtSecret, '300m') }
    },
  },
}

module.exports = models
