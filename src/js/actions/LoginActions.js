import dispatcher from "../dispatcher";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

class LoginActions {

  getToken() {
    return localStorage.tallySession
  }

  logout(cb) {
    delete localStorage.tallySession
  }

  loggedIn() {
    return !!localStorage.tallySession
  }

  loginUser(sessionID) {
    var savedSessionID = localStorage.getItem('tallySession');
    if (savedSessionID !== sessionID) {
      browserHistory.push('/');
      localStorage.setItem('tallySession', sessionID);
    }
  }

  logoutUser() {
    localStorage.removeItem('tallySession');
    browserHistory.push('/');
  }
}

export default new LoginActions();
