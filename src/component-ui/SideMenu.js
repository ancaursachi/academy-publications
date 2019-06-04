import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { th } from '../component-ui'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'

const policyRole = (loggedInUser, roles) => {
  const role = get(loggedInUser, 'role', null)
  return roles.includes(role)
}

const SideMenu = ({ history, ...props }) => {
  const { data } = useQuery(queries.getLoggedInUser)
  const { loggedInUser } = data
  return (
    <Root {...props}>
      <Content>
        {policyRole(loggedInUser, ['user', 'professor', 'admin']) && (
          <Button
            fontWeight="bold"
            fontSize="1.2em"
            sideMenu
            name="Public manuscripts"
            onClick={() => history.push('/publicManuscripts')}
          />
        )}

        {policyRole(loggedInUser, ['user']) && (
          <Button
            mt={1}
            fontWeight="bold"
            fontSize="1.2em"
            sideMenu
            iconLeft
            iconName="plus"
            name="Create manuscript"
            onClick={() => history.push('/submission')}
          />
          // <NavButton
          //   fontWeight="bold"
          //   fontSize="1.2em"
          //   sideMenu
          //   iconName="plus"
          //   name="Create manuscript"
          //   onClick={() => history.push('/submission')}
          // />
        )}

        {policyRole(loggedInUser, ['user']) && (
          <Button
            mt={1}
            fontWeight="bold"
            fontSize="1.2em"
            sideMenu
            name="Your Manuscripts"
            onClick={() => history.push('/userManuscripts')}
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
const Button = ({
  name,
  iconName,
  iconLeft,
  type = 'button',
  onClick,
  ...props
}) => {
  return (
    <RootButton type={type} onClick={onClick}>
      <Title>{name}</Title>
    </RootButton>
  )
}
const Title = styled.p`
  margin: 0em;
  font-size: 1.1rem;
`
const RootButton = styled.button`
  background-color: transparent;
  text-decoration: none;
  display: flex;
  justify-content: center;
  border: none;
  transition: all 0.4s ease 0s;
  width: 100%;
  height: fit-content;
  margin: 25px 0px;
  padding: 0px 10px;
  color: ${th.colorWhite};
  :focus {
    outline: none;
  }
  :hover {
    color: ${th.colorCremLight};
    font-weight: 600;
  }
  :active {
    color: ${th.colorCremLight};
  }

  font-weight: normal;
`

const Root = styled.div`
  font-family: 'Nunito';
  background-color: ${th.colorBlue};
  height: 100%;
  width: 100%;
  box-shadow: 0em 0em 0.6em 0em rgba(0, 0, 0, 0.5);
  align-items: flex-start;
  ${th.marginHelper}
  ${th.paddingHelper}
`

const Content = styled.div`
  /* position: fixed; */
`
// const NavButton = styled(NavLink)`
//   background-color: transparent;
//   border: none;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   :focus {
//     outline: none;
//   }
//   font-size: ${props =>
//     get(props, 'fontSize') ? `${props.fontSize}em` : `1em`};
//   font-weight: ${props =>
//     get(props, 'fontWeight') ? props.fontWeight : 'normal'};
//   transition: all 0.4s ease 0s;
//   width: 100%;
//   display: flex;
//   font-size: 0.9em;
//   justify-content: flex-start;
//   color: ${th.colorWhite};
//   padding: 0.3em;
//   :hover {
//     color: ${th.colorCremLight};
//   }
//   :active {
//     color: ${th.colorCremLight};
//   }
// `

export default SideMenu
