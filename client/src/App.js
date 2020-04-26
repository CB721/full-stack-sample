import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import './App.scss';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route
          exact path="/"
          render={props => (
            <Home
              {...props}
            />
          )}
        />
        <Route
          exact path="/profile"
          render={props => (
            <Profile
              {...props}
            />
          )}
        />
        <Route
          exact path="/login"
          render={props => (
            <Login
              {...props}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
