import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import auth from './actions/LoginActions';

import Events from "./pages/Events";
import About from "./pages/static/About";
import Faq from "./pages/static/Faq";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import DonorInfo from "./pages/DonorInfo";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from './components/auth/SignOut';

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
      <Route path="about" component={About}></Route>
      <Route path="faq" component={Faq}></Route>
      <Route path="settings" component={Settings} onEnter={requireAuth}></Route>
      <Route path="donor-info" component={DonorInfo} onEnter={requireAuth}></Route>
      <Route path="signup" component={SignUp}></Route>
      <Route path="signin" component={SignIn}></Route>
      <Route path="signout" component={SignOut} onEnter={requireAuth}></Route>
    </Route>
  </Router>
);

ReactDOM.render(routes, app);
