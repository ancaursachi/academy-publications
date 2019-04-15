import React from 'react'

import { AuthentificationPage } from '../component-authentification'
import { DashboardPage } from '../component-dashboard'
import { Header } from '../component-main'
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { SubmissionPage } from '../component-submission'
import NotFoundPage from './NotFoundPage'

const Routing = () => {
  return (
    <Router>
      {localStorage.getItem('authToken') && <Header />}
      <LoginRoute exact path="/login" component={AuthentificationPage} />
      <PrivateRoute exact path="/" component={DashboardPage} />
      <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      <PrivateRoute exact path="/submission" component={SubmissionPage} />
      <Route exact path="*" component={NotFoundPage} />
    </Router>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props =>
        localStorage.getItem('authToken') ? (
          <Component />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
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
