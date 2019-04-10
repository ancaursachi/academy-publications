const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  dbLink: process.env.DB_LINK,
}
