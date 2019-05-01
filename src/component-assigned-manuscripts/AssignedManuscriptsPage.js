import React from 'react'

import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { AssignedManuscripts } from '../component-assigned-manuscripts'

import { SideMenu } from '../component-ui'

const AssignedManuscriptsPage = ({ history }) => {
  return (
    <Root>
      <SideMenu history={history} pt={6} />
      <AssignedManuscripts pt={6} />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 18% 82%;
`

export default compose(withRouter)(AssignedManuscriptsPage)
