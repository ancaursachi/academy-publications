const User = require('../../models/User')

function createToken({ email, password }) {
  return `${email}:${password}`
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
    addUser: (parent, args) => {
      const newUser = new User(args.input)
      console.log(newUser)
      return newUser.save()
    },
    deleteUser: (parent, args) => {
      return User.findOneAndRemove(args)
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne(
        { email: email, password: password },
        { email: 1, password: 1 },
      )
      if (user) return { token: createToken(user) }
      else return new Error("User doesn't exist")
    },
  },
}

module.exports = models
