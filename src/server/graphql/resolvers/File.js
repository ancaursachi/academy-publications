const policyRole = require('../policyRole')
const File = require('../../models/File')

const models = {
  Query: {
    file: async (parent, { _id }, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin', 'user', 'professor'])

      return await File.findOne({ _id })
    },
    files: async (parent, { _id }, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin', 'user', 'professor'])

      return await File.find({})
    },
  },
  Mutation: {
    createFile: async (
      parent,
      { input: { name, size, providedKey } },
      { loggedInUser },
    ) => {
      policyRole(loggedInUser, ['admin', 'user', 'professor'])
      const newFile = new File({
        name,
        size,
        providedKey,
      })
      await newFile.save()
      return newFile
    },
  },
}

module.exports = models
