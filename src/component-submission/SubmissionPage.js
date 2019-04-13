import React from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Card } from '../component-ui'
import { SubmissionForm } from '../component-submission'

const SubmissionPage = ({ history }) => {
  return (
    <Root>
      <Card height={35} width={40}>
        <SubmissionForm />
      </Card>
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default compose(withRouter)(SubmissionPage)
