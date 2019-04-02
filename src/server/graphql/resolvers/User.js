const User = require('../../models/User')

module.exports = {
  Query: {
    user: async (parent, args) => {
      return await User.findOne(args)
    },
    users: async () => {
      return await User.find({})
    },
  },
  Mutation: {
    addUser: (parent, user) => {
      const newUser = new User(user.input)
      return newUser.save()
    },
    deleteUser: (root, args) => {
      return User.findOneAndRemove(args)
    },
    login: async (root, { email, password }) => {
      const user = await User.findOne(
        { email: email, password: password },
        { _id: 1, email: 1, firstName: 1, lastName: 1 },
      )
      if (user) return `${email}:${password}`
      else return new Error("User doesn't exist")
    },
  },
}
