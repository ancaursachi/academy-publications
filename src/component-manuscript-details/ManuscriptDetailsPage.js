import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { SideMenu } from '../component-ui'
import { ManuscriptDetails } from '../component-manuscript-details'
const ManuscriptDetailsPage = ({ history, match }) => {
  return (
    <Root>
      <SideMenu history={history} pt={6} />
      <ManuscriptDetails pt={6} pb={3} match={match} />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 18% 82%;
`

export default compose(withRouter)(ManuscriptDetailsPage)
