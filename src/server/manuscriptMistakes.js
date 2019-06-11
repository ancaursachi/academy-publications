var ProWritingAidApi = require('pro_writing_aid_api')
const s3Service = require('./s3Service')
const pdfUtil = require('pdf-to-text')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile.bind(fs))
const { chain, uniq, isEmpty } = require('lodash')
const Comment = require('./models/Comment')
const Manuscript = require('./models/Manuscript')
const wordcount = require('wordcount')

module.exports.automaticReview = async manuscript => {
  const { providerKey } = manuscript.file
  const manuscriptId = manuscript._id

  if (!providerKey) {
    return
  }
  const file = await s3Service.getObject(providerKey)

  var filePath = path.resolve(os.tmpdir(), providerKey.replace('/', ''))
  filePath += '.pdf'
  await writeFile(filePath, file.Body)

  let pdfNumberOfPages = 0
  pdfUtil.info(filePath, (err, info) => {
    if (err) throw err
    pdfNumberOfPages = info.pages

    pdfUtil.pdfToText(filePath, async (err, pdfText) => {
      const wordCount = await wordcount(pdfText)
      await Manuscript.findOneAndUpdate(
        { _id: manuscriptId },
        {
          $set: {
            pages: info.pages,
            words: wordCount,
          },
        },
        { new: true },
      )
    })

    for (let index = 0; index < pdfNumberOfPages; index++) {
      let option = { from: index, to: index + 1 }

      pdfUtil.pdfToText(filePath, option, (err, pdfText) => {
        if (err) throw err

        var api = new ProWritingAidApi.TextApi()
        api.apiClient.basePath = 'https://api.prowritingaid.com'
        api.apiClient.defaultHeaders = {
          licenseCode: '5A52D9DC-3777-474A-AB1C-2F62E500FD5D',
        }

        var request = new ProWritingAidApi.TextAnalysisRequest(
          pdfText,
          ['grammar'],
          'Academic',
          'En',
        )
        api.post(request).then(data => {
          const groupedErrors = chain(data.Result.Tags)
            .filter(d => d.subcategory.length >= 3)
            .filter(d => d.hint.includes('Unknown word'))
            .filter(er => !isEmpty(er.suggestions))
            .groupBy('subcategory')
            .map(error => ({
              typo: error[0].subcategory,
              positions: error.map(e => `${e.startPos}-${e.endPos}`),
              suggestions: uniq(
                error.reduce(
                  (acc, current) => acc.concat(...current.suggestions),
                  [],
                ),
              ),
            }))
            .value()

          if (!isEmpty(groupedErrors)) {
            const newComment = new Comment({
              manuscriptId,
              created: new Date(),
              userId: 'bot',
              text: JSON.stringify(groupedErrors),
              role: 'bot',
              page: option.to,
              reply: [],
            })
            newComment.save()
          }
        })
      })
    }
  })
  //   unlinkFile(filePath)
}
