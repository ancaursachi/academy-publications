const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    port: process.env.PORT,
    dbLink: process.env.DB_LINK,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretKeyId: process.env.SECRET_KEY_ID,
    manuscriptBucketName: process.env.MANUSCRIPTS_BUCKET_NAME
}
