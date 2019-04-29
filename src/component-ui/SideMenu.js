import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { th, Button, Loader } from '../component-ui'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'

const policyRole = (loggedInUser, roles) => {
  const role = get(loggedInUser, 'role', null)
  return roles.includes(role)
}

const SideMenu = ({ history, ...props }) => {
  const { data, loading } = useQuery(queries.getLoggedInUser)
  if (loading) {
    return (
      <Root {...props}>
        <Content>
          <Loader />
        </Content>
      </Root>
    )
  }
  const { loggedInUser } = data
  return (
    <Root {...props}>
      <Content>
        {policyRole(loggedInUser, ['user']) && (
          <Button
            fontWeight="bold"
            fontSize="1.2em"
            sideMenu
            iconName="plus"
            name="Create manuscript"
            onClick={() => history.push('/submission')}
          />
        )}
        {policyRole(loggedInUser, ['user']) && (
          <Button
            mt={1}
            fontWeight="bold"
            fontSize="1.2em"
            sideMenu
            name="Dashboard"
            onClick={() => history.push('/dashboard')}
          />
        )}
        {policyRole(loggedInUser, ['admin']) && (
          <Button
            mt={1}
            fontWeight="bold"
            fontSize="1.2em"
            sideMenu
            name="Manuscripts"
            onClick={() => history.push('/manuscripts')}
          />
        )}
        {policyRole(loggedInUser, ['professor']) && (
          <Button
            mt={1}
            fontWeight="bold"
            fontSize="1.2em"
            sideMenu
            name="Unreviewed manuscripts"
            onClick={() => history.push('/unassignedManuscripts')}
          />
        )}
        {policyRole(loggedInUser, ['professor']) && (
          <Button
            mt={1}
            fontWeight="bold"
            fontSize="1.2em"
            sideMenu
            name="Review Process"
            onClick={() => history.push('/assignedManuscripts')}
          />
        )}

        {policyRole(loggedInUser, ['admin']) && (
          <Button
            mt={1}
            fontWeight="bold"
            fontSize="1.2em"
            sideMenu
            name="Users"
            onClick={() => history.push('/users')}
          />
        )}
      </Content>
    </Root>
  )
}

const Root = styled.div`
  background-color: ${th.colorBlue};
  height: 100%;
  width: 100%;
  display: flex;
  box-shadow: 0em 0em 0.6em 0em rgba(0, 0, 0, 0.5);
  align-items: flex-start;
  justify-content: center;
  ${th.marginHelper}
  ${th.paddingHelper}
`

const Content = styled.div`
  position: fixed;
`
export default SideMenu
