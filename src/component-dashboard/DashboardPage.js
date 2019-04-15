import React from 'react'
import { get } from 'lodash'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { queries } from '../qraphqlClient'
import { ManuscriptCard, SideMenu } from '../component-dashboard'

const DashboardPage = ({ history }) => {
  const { data } = useQuery(queries.getManuscripts)
  const manuscripts = get(data, 'manuscripts', [])

  return (
    <Root>
      <SideMenu history={history} />
      <Content>
        {manuscripts.map(manuscript => (
          <ManuscriptCard key={manuscript._id} manuscript={manuscript} />
        ))}
      </Content>
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const Content = styled.div`
  margin: 3.5em 0em 0em 0em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 14em;
`

export default compose(withRouter)(DashboardPage)
