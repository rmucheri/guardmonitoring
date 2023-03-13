import React from 'react';
import { Route, Switch as RouterSwitch, Redirect } from 'react-router-dom';

import GuardHome from './components/GuardHome';
import SupervisorHome from './components/SupervisorHome';
import AdminHome from './components/AdminHome';
import LoginForm from './components/LoginForm';
import GuardLocationMap from './components/GuardLocationMap';
import GuardList from './components/GuardList';
import WriteUpForm from './components/WriteUpForm';
import CheckInForm from './components/CheckInForm';

const Switch = ({ isLoggedIn, userRole }) => {
  return (
    <RouterSwitch>
      <Route exact path="/">
        {isLoggedIn ? (
          userRole === 'guard' ? (
            <Redirect to="/guard-home" />
          ) : userRole === 'supervisor' ? (
            <Redirect to="/supervisor-home" />
          ) : (
            <Redirect to="/admin-home" />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/login">
        {isLoggedIn ? (
          userRole === 'guard' ? (
            <Redirect to="/guard-home" />
          ) : userRole === 'supervisor' ? (
            <Redirect to="/supervisor-home" />
          ) : (
            <Redirect to="/admin-home" />
          )
        ) : (
          <LoginForm />
        )}
      </Route>
      <Route path="/admin-home">
        {isLoggedIn && userRole === 'admin' ? (
          <AdminHome />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/supervisor-home">
        {isLoggedIn && userRole === 'supervisor' ? (
          <SupervisorHome />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/guard-home">
        {isLoggedIn && userRole === 'guard' ? (
          <GuardHome />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/guard-location-map">
        {isLoggedIn && userRole === 'supervisor' ? (
          <GuardLocationMap />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/guard-list">
        {isLoggedIn && userRole === 'supervisor' ? (
          <GuardList />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/write-up">
        {isLoggedIn && userRole === 'supervisor' ? (
          <WriteUpForm />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/check-in">
        {isLoggedIn && userRole === 'guard' ? (
          <CheckInForm />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </RouterSwitch>
  );
};

export default Switch;
