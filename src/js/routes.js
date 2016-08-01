import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import auth from './actions/LoginActions';

import Events from "./pages/Events";
import Todos from "./pages/Todos";
import About from "./pages/About";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import DonorInfo from "./pages/DonorInfo";
import SignInSignUp from "./pages/SignInSignUp";
import Logout from './components/Logout';

const app = document.getElementById('app');

var requireAuth = function(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


let routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Events}></IndexRoute>
      <Route path="todo" component={Todos}></Route>
      <Route path="about" component={About}></Route>
      <Route path="settings" component={Settings} onEnter={requireAuth}></Route>
      <Route path="donor-info" component={DonorInfo} onEnter={requireAuth}></Route>
      <Route path="login" component={SignInSignUp}></Route>
      <Route path="logout" component={Logout}></Route>
      <Route path="signup" component={SignInSignUp}></Route>
    </Route>
  </Router>
);

ReactDOM.render(routes, app);
