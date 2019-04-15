import React from 'react'
import { get } from 'lodash'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { queries } from '../qraphqlClient'
import { Button, th } from '../component-ui'
import { useMeasureWindow } from './useMeasureWindow'

const DashboardPage = ({ history }) => {
  const { data } = useQuery(queries.getUsers)
  const { width: pageWidth } = useMeasureWindow()
  const users = get(data, 'users', [])
  return (
    <Root>
      {/* {users.map(({ firstName }, index) => (
        <div key={index}>{firstName}</div>
      ))} */}

      <SideMenu pageWidth={pageWidth / 5} pt={5}>
        <Button
          fontWeight="bold"
          fontSize="1.2em"
          sideMenu
          iconName="plus"
          name="Create manuscript"
          onClick={() => history.push('/submission')}
        />
      </SideMenu>
      <Content pr={1} pl={1} pt={1} mt={3}>
        <div>aici</div>
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
  ${th.marginHelper}
  ${th.paddingHelper}
`
const SideMenu = styled.div`
  width: ${props => (props.pageWidth ? `${props.pageWidth}px` : '0px')};
  background-color:${th.colorCremLight}
  height: 100%;
  display: flex;
  box-shadow: 0em 0em 0.6em 0em rgba(0, 0, 0, 0.8);
  align-items: flex-start;
  justify-content: center;
  ${th.marginHelper}
  ${th.paddingHelper}
`

export default compose(withRouter)(DashboardPage)
