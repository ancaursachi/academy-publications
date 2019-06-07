import React from 'react'

import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { ReviewedManuscripts } from '../component-reviewed-manuscripts'

import { SideMenu } from '../component-ui'

const ReviewedManuscriptsPage = ({ history }) => {
  return (
    <Root>
      <SideMenu history={history} pt={6} />
      <ReviewedManuscripts pt={6} history={history} pb={3} />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 18% 82%;
`

export default compose(withRouter)(ReviewedManuscriptsPage)
