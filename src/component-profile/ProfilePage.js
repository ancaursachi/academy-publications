import React from 'react'

import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Profile } from '../component-profile'

import { SideMenu } from '../component-ui'

const ProfilePage = ({ history }) => {
  return (
    <Root>
      <SideMenu history={history} pt={6} />
      <Profile history={history} pt={8} pb={3} />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 18% 82%;
`

export default compose(withRouter)(ProfilePage)
