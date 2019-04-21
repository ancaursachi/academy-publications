import React from 'react'
import { get, sortBy } from 'lodash'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { queries } from '../qraphqlClient'
import { ManuscriptCard, SideMenu } from '../component-dashboard'
import { InputFile } from '../component-ui'

const DashboardPage = ({ history }) => {
  const { data } = useQuery(queries.getManuscripts)
  const manuscripts = get(data, 'manuscripts', [])
  const sortedManuscripts = sortBy(
    manuscripts,
    manuscript => -manuscript.created,
  )
  console.log(sortedManuscripts)
  return (
    <Root>
      <SideMenu history={history} />
      <Content>
        {/* <InputFile name="searchValue" value=/> */}
        {sortedManuscripts.map(manuscript => (
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
  align-self: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 14em;
`

export default compose(withRouter)(DashboardPage)
