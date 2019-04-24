import React from 'react'

import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import { SideMenu, Dashboard } from '../component-dashboard'

const DashboardPage = ({ history }) => {
  return (
    <Root>
      <SideMenu history={history} pt={5} />
      <Dashboard pt={5} />
    </Root>
  )
}

const Root = styled.div`
  grid-template-columns: 20% 80%;
  width: 100%;
  height: 100%;
  display: grid;
`

export default compose(withRouter)(DashboardPage)
