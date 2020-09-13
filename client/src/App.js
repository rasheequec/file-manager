import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './route/private-route';
import PublicRoute from './route/public-route';
import Home from './pages/home'
import SignUp from './pages/signup'
import Login from './pages/login'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact from="/" to="login" />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={SignUp} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
