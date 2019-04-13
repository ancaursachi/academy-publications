import React from 'react'
import { get } from 'lodash'
import { useQuery } from 'react-apollo-hooks'
import { queries } from '../qraphqlClient'
import styled from 'styled-components'
import { Button } from '../component-ui'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

const DashboardPage = ({ history }) => {
  const { data } = useQuery(queries.getUsers)
  const users = get(data, 'users', [])
  return (
    <Root>
      <p>DashboardPage</p>
      {/* {users.map(({ firstName }, index) => (
        <div key={index}>{firstName}</div>
      ))} */}
      <Button
        iconName="plus"
        ml={1}
        name="Create manuscript"
        onClick={() => history.push('/submission')}
      />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3em;
`

export default compose(withRouter)(DashboardPage)
