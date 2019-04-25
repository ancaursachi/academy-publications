import React from 'react'

import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { UsersTable } from '../component-users'

import { SideMenu } from '../component-ui'

const UsersPage = ({ history }) => {
  return (
    <Root>
      <SideMenu history={history} pt={6} />
      <UsersTable pt={6} />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
`

export default compose(withRouter)(UsersPage)
