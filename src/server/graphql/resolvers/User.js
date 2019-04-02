const { AuthenticationError, UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const createToken = async (user, secret, expiresIn) => {
  const { email, password } = user
  return await jwt.sign({ email, password }, secret, { expiresIn })
}

const models = {
  Query: {
    user: async (parent, args) => {
      return await User.findOne(args)
    },
    users: async () => {
      return await User.find({})
    },
  },
  Mutation: {
    signUp: async (parent, args) => {
      const user = new User(args.input)
      const secret = 'hipopotan'
      await user.save()
      return { token: createToken(user, secret, '30m') }
    },
    deleteUser: (parent, args) => {
      return User.findOneAndRemove(args)
    },
    login: async (parent, { email, password }) => {
      const user = await User.findByLogin(email)
      const secret = 'hipopotan'
      if (!user) {
        throw new UserInputError('No user found with this login credentials.')
      }

      const isValid = await user.validatePassword(password)

      if (!isValid) {
        throw new AuthenticationError('Invalid password.')
      }

      return { token: createToken(user, secret, '30m') }
    },
  },
}

module.exports = models
