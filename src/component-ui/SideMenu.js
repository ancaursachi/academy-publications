import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { th, Button, Loader } from '../component-ui'
import { queries } from '../qraphqlClient'
import { useQuery } from 'react-apollo-hooks'
import { useMutation } from 'react-apollo-hooks'
import { createManuscript } from '../qraphqlClient/mutations'

const policyRole = (loggedInUser, roles) => {
  const role = get(loggedInUser, 'role', null)
  return roles.includes(role)
}

const useCreateManuscript = () => {
  const useCreateManuscriptMutation = useMutation(createManuscript)
  const initialValues = {
    title: '',
    articleType: 'Research article',
    abstract: '',
    fileId: '',
  }
  const onCreateManuscript = history => {
    useCreateManuscriptMutation({
      variables: { input: initialValues },
      refetchQueries: [
        {
          query: queries.getUserManuscripts,
        },
      ],
    }).then(r => {
      const manuscriptId = get(r.data.createManuscript, '_id')
      const submissionId = get(r.data.createManuscript, 'submissionId')
      history.push(`/submission/${submissionId}/${manuscriptId}`)
    })
  }
  return { onCreateManuscript }
}
const SideMenu = ({ history, ...props }) => {
  const { data, loading } = useQuery(queries.getLoggedInUser)
  const { onCreateManuscript } = useCreateManuscript()
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
            onClick={() => onCreateManuscript(history)}
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
        {policyRole(loggedInUser, []) && (
          <Button
            mt={1}
            fontWeight="bold"
            fontSize="1.2em"
            sideMenu
            name="Dashboard"
            onClick={() => history.push('/dashboard')}
          />
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

const Root = styled.div`
  font-family: 'Nunito';
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
