import React, { Fragment } from 'react'
import { get } from 'lodash'
import { Redirect } from 'react-router'
import { useQuery } from 'react-apollo-hooks'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import { AuthentificationPage } from '../component-authentification'
import { DashboardPage } from '../component-dashboard'
import { Header } from '../component-main'
import { SubmissionPage } from '../component-submission'
import { ReviewPage } from '../component-review'
import { UsersPage } from '../component-users'
import NotFoundPage from './NotFoundPage'
import { queries } from '../qraphqlClient'
import { Loader } from '../component-ui'

const policyRole = (loggedInUser, roles) => {
  const role = get(loggedInUser, 'role', null)
  return roles.includes(role)
}

const Routing = () => {
  const { data, loading } = useQuery(queries.getLoggedInUser)
  if (loading) {
    return (
      <Root>
        <Loader />
      </Root>
    )
  }
  const { loggedInUser } = data
  return (
    <Router>
      <Switch>
        <LoginRoute
          exact
          path="/login"
          policy={policyRole(loggedInUser, ['professor', 'user', 'admin'])}
          component={AuthentificationPage}
        />
        <PrivateRoute
          exact
          loggedInUser={loggedInUser}
          path="/dashboard"
          policy={policyRole(loggedInUser, ['professor', 'user', 'admin'])}
          component={DashboardPage}
        />
        <PrivateRoute
          exact
          loggedInUser={loggedInUser}
          path="/submission"
          policy={policyRole(loggedInUser, ['user'])}
          component={SubmissionPage}
        />
        <PrivateRoute
          exact
          loggedInUser={loggedInUser}
          path="/reviewProcess"
          component={ReviewPage}
          policy={policyRole(loggedInUser, ['professor'])}
        />
        <PrivateRoute
          exact
          loggedInUser={loggedInUser}
          path="/users"
          component={UsersPage}
          policy={policyRole(loggedInUser, ['admin'])}
        />
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect from="*" to="/login" />
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  )
}

const PrivateRoute = ({
  component: Component,
  loggedInUser,
  policy = true,
  ...rest
}) => {
  console.log(policy)
  return (
    <Route
      {...rest}
      component={props =>
        localStorage.getItem('authToken') && policy ? (
          <Fragment>
            <Header loggedInUser={loggedInUser} />
            <Component />
          </Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

const LoginRoute = ({ component: Component, policy = true, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props =>
        localStorage.getItem('authToken') && policy ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component />
        )
      }
    />
  )
}

export default Routing

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
