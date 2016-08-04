import dispatcher from "../dispatcher";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

class LoginActions {

  getAuthToken() {
    return localStorage.tallyToken;
  }

  getRefreshToken() {
    return localStorage.tallyEndureToken;
  }

  signedIn() {
    // return !!localStorage.tallyToken;
    return !!localStorage.tallyEndureToken;
  }

  currentUser() {
    return localStorage.getItem('tallyUserEmail');
  }

  loginUser(token, email, refreshToken) {
    var savedToken = localStorage.getItem('tallyToken');
    localStorage.setItem('tallyUserEmail', email);
    localStorage.setItem('tallyEndureToken', refreshToken);

    if (savedTokenses !== token) {
      browserHistory.push('/');
      localStorage.setItem('tallyToken', token);
    }
  }

  signoutUser() {
    localStorage.removeItem('tallyToken');
    localStorage.removeItem('tallyEndureToken');
    localStorage.removeItem('tallyUserEmail');
    browserHistory.push('/');
  }
}

export default new LoginActions();
