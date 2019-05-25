const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    jwtSecret: 'hipopotam',
    jwtExpiresIn: '90000000000000000000',
    port: '1000',
    dbLink: 'mongodb://admin:admin16@ds243041.mlab.com:43041/academy-db',
    region: process.env.AWS_REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretKeyId: process.env.SECRET_KEY_ID,
    manuscriptBucketName: process.env.MANUSCRIPTS_BUCKET_NAME
}
