const User = require('../../models/User')

module.exports = {
  Query: {
    user: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
  },
  Mutation: {
    addUser: (
      root,
      {
        firstName,
        lastName,
        email,
        country,
        city,
        university,
        specialization,
        password,
      },
    ) => {
      const newUser = new User({
        firstName,
        lastName,
        email,
        country,
        city,
        university,
        specialization,
        password,
      })
      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    editUser: (root, { id, username }) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
          { id },
          { $set: { username } },
          { new: true },
        ).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    deleteUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
  },
}
