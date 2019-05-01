const { ForbiddenError } = require('apollo-server')
const { get } = require('lodash')

module.exports = function policyRole(loggedInUser, roles) {
  const role = get(loggedInUser, 'role', null)
  if (!roles.includes(role))
    throw new ForbiddenError("You don't have access to do this request")
}
