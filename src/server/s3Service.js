const {S3} = require('aws-sdk');
const {region, accessKeyId, secretKeyId, manuscriptBucketName} = require('./config');
const s3 = new S3({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretKeyId,
    params: {
        Bucket: manuscriptBucketName,
    }
})

module.exports.listObjects = prefix =>
    s3.listObjectsV2({Prefix: prefix}).promise()

module.exports.getObject = key => s3.getObject({Key: key}).promise()

module.exports.getObjectStream = key =>
    s3.getObject({Key: key}).createReadStream()

module.exports.upload = async ({key, mimetype, stream, metadata = {}}) => {
    const uploadParams = {
        Key: key,
        Body: stream,
        ContentType: mimetype,
        Metadata: metadata,
    }

    return s3.upload(uploadParams).promise()
}

module.exports.delete = async key => s3.deleteObject({Key: key}).promise()

module.exports.getSignedUrl = async key =>
    s3.getSignedUrl('getObject', {Key: key})

module.exports.copyObject = async ({prevKey, newKey}) => {
    const bucket = process.env.AWS_S3_BUCKET

    const copyParams = {
        CopySource: `${bucket}/${prevKey}`,
        Key: newKey,
    }

    return s3.copyObject(copyParams).promise()
}