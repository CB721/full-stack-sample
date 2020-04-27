import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import API from "./utilities/api";
import './App.scss';

function App() {
  const [user, setUser] = useState({});
  const [applications, setApplications] = useState([]);
  const [unassignedApps, setUnassignedApps] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.email) {
      API.login()
        .then(res => {
          setApplications(res.data.applications);
          const userData = {
            id: res.data.id,
            email: res.data.email,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            is_admin: res.data.is_admin
          }
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          if (userData.is_admin) {
            getAllUnassignedApplications();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  function login(event, loginData) {
    return new Promise((resolve, reject) => {
      event.preventDefault();
      API.login(loginData)
        .then(res => {
          setApplications(res.data.applications);
          const userData = {
            id: res.data.id,
            email: res.data.email,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            is_admin: res.data.is_admin
          }
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          if (userData.is_admin) {
            getAllUnassignedApplications();
          }
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function getAllUnassignedApplications() {
    API.findUnassignedApplications()
      .then(res => {
        setUnassignedApps(res.data);
      })
      .catch(err => console.log(err));
  }

  function logout() {
    return new Promise((resolve, reject) => {
      API.logout()
        .then(res => {
          if (res.data === "logged out") {
            setUser({});
            localStorage.removeItem("user");
            resolve(true);
          }
        })
        .catch(err => reject(err))
    })
  }

  function submitApplication(app) {

  }
  return (
    <Router>
      <Nav
        loggedIn={user}
        logout={logout}
      />
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
            (user.email ? (
              <Profile
                {...props}
                user={user}
                applications={applications}
                unassignedApps={unassignedApps}
                submitApplication={submitApplication}
              />
            ) : (
                <Redirect to="/login" />
              ))
          )}
        />
        <Route
          exact path="/login"
          render={props => (
            (user.email ? (
              <Redirect to="/profile" />
            ) : (
                <Login
                  {...props}
                  login={login}
                />
              ))
          )}
        />
        <Route
          exact path="/signup"
          render={props => (
            <Signup
              {...props}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
