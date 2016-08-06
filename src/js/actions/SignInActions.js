import dispatcher from "../dispatcher";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

class SignInActions {

  getAuthToken() {
    return localStorage.tallyToken;
  }

  getRefreshToken() {
    return localStorage.tallyEndureToken;
  }

  signedIn() {
    return !!localStorage.tallyToken;
    // return !!localStorage.tallyEndureToken;
  }

  currentUser() {
    return localStorage.getItem('tallyUserEmail');
  }

  signInUser(token, email, refreshToken) {
    var savedToken = localStorage.getItem('tallyToken');
    localStorage.setItem('tallyUserEmail', email);
    // localStorage.setItem('tallyEndureToken', refreshToken);

    if (savedToken !== token) {
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

export default new SignInActions();
