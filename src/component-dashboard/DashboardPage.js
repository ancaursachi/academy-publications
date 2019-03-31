import React from 'react'
import withGQL from './withGQL'
import { compose } from 'recompose'

const DashboardPage = ({ users }) => {
  return (
    <div>
      <p>DashboardPage</p>
      {users.map(({ firstName }, index) => (
        <div key={index}>{firstName}</div>
      ))}
    </div>
  )
}

export default compose(withGQL)(DashboardPage)
