import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
// IMPORT BOOTSTRAP to whole app
import 'bootstrap/dist/css/bootstrap.css';

// LOGGED OUT General
import Layout from "./components/pages/Layout";
import Events from "./components/pages/Events";
import FourOhFour from './components/pages/static/FourOhFour';


// LOGGED OUT STATIC
import About from "./components/pages/static/About";
import Faq from "./components/pages/static/Faq";
import PrivacyPolicy from './components/pages/static/PrivacyPolicy';
import TermsOfService from './components/pages/static/TermsOfService';
import Careers from './components/pages/static/Careers';

// LOGGED OUT USER
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPasswordSubmit from './components/auth/ResetPasswordSubmit';
import EmailVerification from "./components/auth/EmailVerification";
import ForgotPasswordSubmit from './components/auth/ForgotPasswordSubmit';
import NewPasswordFromReset from './components/auth/NewPasswordFromReset';


// LOGGED IN User
import AuthStore from './stores/AuthStore';
import EventShow from './components/contributions/EventShow';
import Settings from "./components/pages/Settings";
import Contributions from "./components/pages/Contributions";
import DonorInfo from "./components/pages/DonorInfo";
import SignOut from './components/auth/SignOut';
import ChangePassword from './components/auth/ChangePassword';
import UserProfile from './components/user/UserProfile';
import EditCard from './components/contributions/EditCard';


// LOGGED IN ADMIN
import Admin from './components/pages/Admin';
import ManageEvents from './components/pages/admin/ManageEvents';
import EditEvent from './components/pages/admin/events/EditEvent';
import NewEvent from './components/pages/admin/events/NewEvent';
import AdminEventShow from './components/pages/admin/events/AdminEventShow';
import ManagePoliticians from './components/pages/admin/ManagePoliticians';
import EditPolitician from './components/pages/admin/politicians/EditPolitician';
import NewPolitician from './components/pages/admin/politicians/NewPolitician';
import ManagePacs from './components/pages/admin/ManagePacs';
import EditPac from './components/pages/admin/pacs/EditPac';
import NewPac from './components/pages/admin/pacs/NewPac';
import SetBreakingNews from './components/pages/admin/events/SetBreakingNews';
import ContributionReport from './components/pages/admin/ContributionReport';

const requireAuth = function(nextState, replace) {
  if (!AuthStore.signedIn()) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

const requireAdmin = function(nextState, replace) {
  if (!AuthStore.signedIn() || !AuthStore.isAdmin()) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

const invalidIfSignedIn = function(nextState, replace) {
  if (AuthStore.signedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};


const routes = (
  <Route path="/" component={Layout}>
    <Route path="events" component={Events}></Route>
    <IndexRoute component={Events}></IndexRoute>
    <Route path="email_verification" component={EmailVerification}></Route>
    <Route path="reset_password" component={ForgotPassword}></Route>
    <Route path="reset_password_submit" component={ForgotPasswordSubmit}></Route>
    <Route path="password_update_submit" component={ResetPasswordSubmit}></Route>
    <Route path="new_password_from_reset" component={NewPasswordFromReset}></Route>
    <Route path="signup" component={SignUp} onEnter={invalidIfSignedIn}></Route>
    <Route path="signin" component={SignIn} onEnter={invalidIfSignedIn}></Route>

    <Route path="about" component={About}></Route>
    <Route path="faq" component={Faq}></Route>
    <Route path="privacy_policy" component={PrivacyPolicy}></Route>
    <Route path="terms_of_service" component={TermsOfService}></Route>
    <Route path="careers" component={Careers}></Route>

    <Route path="events/:eventId" component={EventShow} onEnter={requireAuth}></Route>
    <Route path="settings" component={Settings} onEnter={requireAuth}></Route>
    <Route path="change_password" component={ChangePassword} onEnter={requireAuth}></Route>
    <Route path="user_profile" component={UserProfile} onEnter={requireAuth}></Route>
    <Route path="contributions" component={Contributions} onEnter={requireAuth}></Route>
    <Route path="edit-card" component={EditCard} onEnter={requireAuth}></Route>
    <Route path="donor-info" component={DonorInfo} onEnter={requireAuth}></Route>
    <Route path="signout" component={SignOut} onEnter={requireAuth}></Route>

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

    <Route path='*' component={FourOhFour}></Route>
  </Route>
);
export default routes;
