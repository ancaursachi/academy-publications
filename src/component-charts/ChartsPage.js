import React from 'react'

import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import { Charts } from '../component-charts'
import { SideMenu } from '../component-ui'

const ChartsPage = ({ history, match }) => {
  return (
    <Root>
      <SideMenu history={history} pt={6} />
      <Charts history={history} match={match} pt={6} pb={3} />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 18% 82%;
`

export default compose(withRouter)(ChartsPage)
