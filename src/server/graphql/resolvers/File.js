const policyRole = require('../policyRole')
const s3Service = require('../../s3Service')
const uuidv4 = require('uuid/v4')
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
    signedUrl: async (parent, { providerKey }, { loggedInUser }) => {
      policyRole(loggedInUser, ['admin', 'user', 'professor'])
      return await s3Service.getSignedUrl(providerKey)
    },
  },
  Mutation: {
    uploadFile: async (
      parent,
      { file, type, size, manuscriptId },
      { loggedInUser },
    ) => {
      policyRole(loggedInUser, ['professor', 'admin', 'user'])

      const fileData = await file
      const { createReadStream, filename, mimetype } = fileData
      const stream = createReadStream()
      const providerKey = uuidv4()

      await s3Service.upload({
        key: providerKey,
        stream,
        mimetype,
        metadata: {
          filename,
          type,
        },
      })

      return { providerKey, size, name: filename }
    },
  },
}

module.exports = models
