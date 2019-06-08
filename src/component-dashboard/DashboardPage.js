import React from 'react'

import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import { Dashboard } from '../component-dashboard'
import { SideMenu } from '../component-ui'

const DashboardPage = ({ history, match }) => {
  return (
    <Root>
      <SideMenu history={history} pt={6} />
      <Dashboard history={history} match={match} pt={6} pb={3} />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 18% 82%;
`

export default compose(withRouter)(DashboardPage)
