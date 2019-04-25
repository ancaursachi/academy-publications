import React from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { SideMenu } from '../component-ui'
import { SubmissionForm } from '../component-submission'

const SubmissionPage = ({ history }) => {
  return (
    <Root>
      <SideMenu history={history} pt={6} />
      <SubmissionForm pt={6} />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 20% 80%;
`

export default compose(withRouter)(SubmissionPage)
