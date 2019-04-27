const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  jwtSecret: 'hipopotam',
  jwtExpiresIn: '90000000',
  port: '1000',
  dbLink: 'mongodb://admin:admin16@ds243041.mlab.com:43041/academy-db',
}
