const { jwtSecret } = require('./config')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
// const { AuthenticationError } = require('apollo-server')

module.exports = function authorizationLogic() {
  return async ({ req }) => {
    const mutationbody = req.body.operationName
    if (['login', 'signUp'].includes(mutationbody)) {
      return
    }
    const token = req.headers.authorization || ''
    if (!['', 'Bearer '].includes(token)) {
      const splittedToken = token
        .replace('Bearer ', '')
        .replace(/"/g, '')
        .split(':')[0]

      const decodedToken = jwt.verify(splittedToken, jwtSecret)
      const { email, password } = decodedToken
      const user = await User.findOne({ email, password })
      if (!user) {
        throw new Error('No user found with this credential.')
      }
      try {
        return { loggedInUser: user }
      } catch (e) {
        throw new Error('Your session expired. Sign in again.')
      }
    }
    throw new Error('YOU MUST PROVIDE TOKEN HACKERMANE!')
  }
}
