import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import AdminHome from './components/AdminHome';
import SupervisorHome from './components/SupervisorHome';
import GuardHome from './components/GuardHome';

const App = () => {
  const [user, setUser] = useState(null);

  // Handle login form submission
  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post('/api/login', { email, password });
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle logout button click
  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      {user ? (
        <Router>
          <Switch>
            <Route path="/admin" component={AdminHome} />
            <Route path="/supervisor" component={SupervisorHome} />
            <Route path="/guard" component={GuardHome} />
            <Redirect to={`/${user.role}`} />
          </Switch>
          <button onClick={handleLogout}>Logout</button>
        </Router>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;

