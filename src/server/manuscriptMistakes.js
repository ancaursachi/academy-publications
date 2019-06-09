const { textGearsUrl, textGearsApiKey } = require('./config')
var ProWritingAidApi = require('pro_writing_aid_api')
const s3Service = require('./s3Service')
const pdfUtil = require('pdf-to-text')
const fs = require('fs')
const os = require('os')
const path = require('path')
const querystring = require('querystring')
const { promisify } = require('util')
const https = require('https')
const writeFile = promisify(fs.writeFile.bind(fs))
const unlinkFile = promisify(fs.unlink.bind(fs))
const { chain, last, uniq } = require('lodash')
const Comment = require('./models/Comment')
module.exports.automaticReview = async providerKey => {
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
    for (let index = 0; index < 1; index++) {
      let option = { from: index, to: index + 1 }

      pdfUtil.pdfToText(filePath, option, (err, pdfText) => {
        // console.log(pdfText)
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
            .filter(d => d.hint.includes('Unknown word'))
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
        })
      })
    }
  })
  //   unlinkFile(filePath)
}
