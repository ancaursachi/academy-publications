import React, { Fragment } from 'react'

import { AuthentificationPage } from '../component-authentification'
import { DashboardPage } from '../component-dashboard'
import { Header } from '../component-main'
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SubmissionPage } from '../component-submission'
import { UsersPage } from '../component-users'
import NotFoundPage from './NotFoundPage'

const Routing = () => {
  return (
    <Router>
      <Switch>
        <LoginRoute exact path="/login" component={AuthentificationPage} />
        <PrivateRoute exact path="/dashboard" component={DashboardPage} />
        <PrivateRoute exact path="/submission" component={SubmissionPage} />
        <PrivateRoute exact path="/users" component={UsersPage} />
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect from="*" to="/login" />
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    localStorage.getItem('authToken') && <Header /> && (
      <Route
        {...rest}
        component={props =>
          localStorage.getItem('authToken') ? (
            <Fragment>
              <Header />
              <Component />
            </Fragment>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    )
  )
}

const LoginRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props =>
        localStorage.getItem('authToken') ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component />
        )
      }
    />
  )
}

export default Routing
