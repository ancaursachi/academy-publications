import React from 'react'
import withUserGQL from './withUsersGQL'
import { compose } from 'recompose'

const Dashboard = ({ users }) => {
  return users.map(({ username }, index) => <div key={index}>{username}</div>)
}

export default compose(withUserGQL)(Dashboard)
