import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import AuthStore from './stores/AuthStore';

import Events from "./pages/Events";
import About from "./pages/static/About";
import Faq from "./pages/static/Faq";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";

// ADMIN
import Admin from './pages/Admin';

// ADMIN EVENTS
import ManageEvents from './pages/admin/ManageEvents';
import EditEvent from './pages/admin/events/EditEvent';
import NewEvent from './pages/admin/events/NewEvent';
import AdminEventShow from './pages/admin/events/AdminEventShow';

// ADMIN Politicians
import ManagePoliticians from './pages/admin/ManagePoliticians';
import EditPolitician from './pages/admin/politicians/EditPolitician';
import NewPolitician from './pages/admin/politicians/NewPolitician';

// ADMIN Pacs
import ManagePacs from './pages/admin/ManagePacs';
import EditPac from './pages/admin/pacs/EditPac';
import NewPac from './pages/admin/pacs/NewPac';

// ADMIN TOOLS
import SetBreakingNews from './pages/admin/events/SetBreakingNews';

// ADMIN REPORTS
import ContributionReport from './pages/admin/ContributionReport';

import Contributions from "./pages/Contributions";
import DonorInfo from "./pages/DonorInfo";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from './components/auth/SignOut';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordSubmit from './components/auth/ForgotPasswordSubmit';
import ResetPasswordSubmit from './components/auth/ResetPasswordSubmit';
import EmailVerification from "./components/auth/EmailVerification";
import ChangePassword from './components/auth/ChangePassword';
import NewPasswordFromReset from './components/auth/NewPasswordFromReset';
import SetCard from './components/contributions/SetCard';
import FourOhFour from './pages/static/FourOhFour';

// IMPORT BOOTSTRAP to whole app
import 'bootstrap/dist/css/bootstrap.css';

const app = document.getElementById('app');

var requireAuth = function(nextState, replace) {
  if (!AuthStore.signedIn()) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

var requireAdmin = function(nextState, replace) {
  if (!AuthStore.signedIn() || !AuthStore.isAdmin()) {
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

      <Route path="admin" component={Admin} onEnter={requireAdmin}></Route>

      <Route path="manage_pacs" component={ManagePacs} onEnter={requireAdmin}></Route>
      <Route path="new_pac" component={NewPac} onEnter={requireAdmin}></Route>
      <Route path="edit_pacs/:pacId" component={EditPac} onEnter={requireAdmin}></Route>

      <Route path="manage_events" component={ManageEvents} onEnter={requireAdmin}></Route>
      <Route path="new_event" component={NewEvent} onEnter={requireAdmin}></Route>
      <Route path="edit_events/:eventId" component={EditEvent} onEnter={requireAdmin}></Route>
      <Route path="manage_events/:eventId" component={AdminEventShow} onEnter={requireAdmin}></Route>
      <Route path="breaking_news_alert" component={SetBreakingNews} onEnter={requireAdmin}></Route>

      <Route path="manage_politicians" component={ManagePoliticians} onEnter={requireAdmin}></Route>
      <Route path="new_politician" component={NewPolitician} onEnter={requireAdmin}></Route>
      <Route path="edit_politicians/:politicianId" component={EditPolitician} onEnter={requireAdmin}></Route>

      <Route path="contribution_report" component={ContributionReport} onEnter={requireAdmin}></Route>

      <Route path="change_password" component={ChangePassword} onEnter={requireAuth}></Route>
      <Route path="contributions" component={Contributions} onEnter={requireAuth}></Route>
      <Route path="edit-card" component={SetCard} onEnter={requireAuth}></Route>
      <Route path="donor-info" component={DonorInfo} onEnter={requireAuth}></Route>
      <Route path="signup" component={SignUp} onEnter={invalidIfSignedIn}></Route>
      <Route path="signin" component={SignIn} onEnter={invalidIfSignedIn}></Route>
      <Route path="signout" component={SignOut} onEnter={requireAuth}></Route>
      <Route path="reset_password" component={ForgotPassword}></Route>
      <Route path="reset_password_submit" component={ForgotPasswordSubmit}></Route>
      <Route path="password_update_submit" component={ResetPasswordSubmit}></Route>
      <Route path="new_password_from_reset" component={NewPasswordFromReset}></Route>
      <Route path='*' component={FourOhFour}></Route>
    </Route>
  </Router>
);

ReactDOM.render(routes, app);
