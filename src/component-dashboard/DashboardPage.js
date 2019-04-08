import React from 'react'
import { get } from 'lodash'
import { useQuery } from 'react-apollo-hooks'
import { queries } from '../qraphqlClient'

const DashboardPage = () => {
  const { data } = useQuery(queries.getUsers)
  const users = get(data, 'users', [])
  return (
    <div>
      <p>DashboardPage</p>
      {users.map(({ firstName }, index) => (
        <div key={index}>{firstName}</div>
      ))}
    </div>
  )
}

export default DashboardPage
