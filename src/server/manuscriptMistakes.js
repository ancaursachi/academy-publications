const {textGearsUrl, textGearsApiKey} = require('./config')
const s3Service = require('./s3Service')
const pdfUtil = require('pdf-to-text');
const fs = require('fs')
const os = require('os')
const path = require('path')
const querystring = require("querystring");
const {promisify} = require('util')
const https = require('https');
const writeFile = promisify(fs.writeFile.bind(fs))
const unlinkFile = promisify(fs.unlink.bind(fs))


module.exports.automaticReview = async (providerKey) => {
    if (!providerKey) {
        return;
    }
    const file = await s3Service.getObject(providerKey)

    var filePath = path.resolve(
        os.tmpdir(),
        providerKey.replace('/', '')
    )
    filePath += ".pdf";
    await writeFile(filePath, file.Body)

    let pdfNumberOfPages = 0;
    pdfUtil.info(filePath, function (err, info) {
        if (err) throw(err);
        pdfNumberOfPages = info.pages;
        for (let index = 0; index < pdfNumberOfPages; index++) {
            let option = {from: index, to: index + 1};
            pdfUtil.pdfToText(filePath, option, function (err, data) {
                if (err) throw(err);
                console.log(data)
                const escapedPdfInfo = querystring.escape(data);
                const textGearsComputedUrl = `${textGearsUrl}${escapedPdfInfo}&key=${textGearsApiKey}`;
                console.log(textGearsComputedUrl);

                https.get(textGearsComputedUrl, (resp) => {
                    let data = '';
                    resp.on('data', (chunk) => data += chunk);

                    resp.on('end', () => {
                        let listOfErrors = JSON.parse(data).errors;
                        let listOfUsableErrors = listOfErrors.filter(error => error.better.length > 0 && error.better.length <= 3);
                        console.log(listOfUsableErrors)
                        //TODO save in Comments DB
                    });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                })
            });
        }
    });
    unlinkFile(filePath)
}
