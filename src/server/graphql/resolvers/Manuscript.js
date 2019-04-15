const Manuscript = require('../../models/Manuscript')

const models = {
  Query: {
    manuscript: async (parent, { _id }) => {
      return await Manuscript.findOne({ _id })
    },
    manuscripts: async () => {
      return await Manuscript.find({})
    },
  },
  Mutation: {
    createManuscript: async (parent, args) => {
      const newManuscript = new Manuscript(args.input)
      await newManuscript.save()
    },
  },
}

module.exports = models
