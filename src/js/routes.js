import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import AuthStore from './stores/AuthStore';

import Events from "./pages/Events";
import About from "./pages/static/About";
import Faq from "./pages/static/Faq";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import DonorInfo from "./pages/DonorInfo";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from './components/auth/SignOut';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordSubmit from './components/auth/ForgotPasswordSubmit';
import EmailVerification from "./components/auth/EmailVerification";
import ChangePassword from './components/auth/ChangePassword';
import NewPasswordFromReset from './components/auth/NewPasswordFromReset';
import FourOhFour from './pages/static/FourOhFour';

const app = document.getElementById('app');

var requireAuth = function(nextState, replace) {
  if (!AuthStore.signedIn()) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

var invalidIfSignedIn = function(nextState, replace) {
  if (AuthStore.signedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

let routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Events}></IndexRoute>
      <Route path="email_verification" component={EmailVerification}></Route>
      <Route path="events" component={Events}></Route>
      <Route path="about" component={About}></Route>
      <Route path="faq" component={Faq}></Route>
      <Route path="settings" component={Settings} onEnter={requireAuth}></Route>
      <Route path="change_password" component={ChangePassword} onEnter={requireAuth}></Route>
      <Route path="donor-info" component={DonorInfo} onEnter={requireAuth}></Route>
      <Route path="signup" component={SignUp} onEnter={invalidIfSignedIn}></Route>
      <Route path="signin" component={SignIn} onEnter={invalidIfSignedIn}></Route>
      <Route path="signout" component={SignOut} onEnter={requireAuth}></Route>
      <Route path="reset_password" component={ForgotPassword}></Route>
      <Route path="reset_password_submit" component={ForgotPasswordSubmit}></Route>
      <Route path="new_password_from_reset" component={NewPasswordFromReset}></Route>
      <Route path='*' component={FourOhFour}></Route>
    </Route>
  </Router>
);

ReactDOM.render(routes, app);
