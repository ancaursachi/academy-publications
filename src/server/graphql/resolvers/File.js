const policyRole = require('../policyRole')
const File = require('../../models/File')
const s3Service = require('../../s3Service')

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
    uploadFile: async (
      parent,
      { file, type, size, manuscriptId },
      { loggedInUser },
    ) => {
      policyRole(loggedInUser, ['professor', 'admin', 'user'])

      const fileData = await file
      const { createReadStream, filename, mimetype } = fileData
      const stream = createReadStream()

      await s3Service.upload({
        key: manuscriptId,
        stream,
        mimetype,
        metadata: {
          filename,
          type,
        },
      })
      const url = await s3Service.getSignedUrl(manuscriptId)

      const newFile = new File({
        name: filename,
        size,
        manuscriptId,
        url,
      })
      await newFile.save()
      return { size, manuscriptId, url, ...fileData }
    },
  },
}

module.exports = models
