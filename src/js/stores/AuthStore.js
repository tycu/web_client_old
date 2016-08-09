import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import AuthActions from '../actions/AuthActions';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import * as Constants from '../constants/AuthConstants';
import request from 'reqwest';
import when from 'when';

class AuthStore extends EventEmitter {
  constructor() {
    super()

    this.loggedIn = '';
    this.email    = '';
    this.message  = '';
    this.error    = '';
  }

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

  getPassword() {
    return this.password;
  }

  currentUser() {
    return localStorage.getItem('tallyUserEmail') || '';
  }

  currentUserId() {
    return localStorage.getItem('tallyUserId');
  }

  getMessage() {
    return this.message;
  }

  getError() {
    return this.error;
  }

  signin(email, password) {
    this.loggedIn = true
    this.email = email
    var url = Constants.SIGNIN_URL

    return this.handleAuth(when(request({
      url: url,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        email: email,
        password: password
      }
    })));
  }

  signup(email, password, url) {
    this.loggedIn = true
    this.email = email
    var url = Constants.SIGNUP_URL;

    return this.handleAuth(when(request({
      url: url,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        email: email,
        password: password
      }
    })));
  }

  handleAuth(signInPromise) {
    var that = this;

    return signInPromise.then(function(response) {
      var savedToken = localStorage.getItem('tallyToken');
      localStorage.setItem('tallyUserEmail', response.email);
      // localStorage.setItem('tallyEndureToken', response.refreshToken);
      localStorage.setItem('tallyUserId', response.id)

      if (savedToken !== response.token) {
        browserHistory.push('/');
        localStorage.setItem('tallyToken', response.token);
      }
      that.emit("change");
    })
    .catch(function (response) {
      // NOTE Model validation errors
      if (response.status) {
        alertText = JSON.parse(response.response).message;
        console.log("Error logging in", alertText);
        that.error = alertText;

        that.emit("change");
      } else if (response.status !== 200) {
        var alertText = JSON.parse(response.response).message;
        console.log("Error logging in", alertText);
        that.error = alertText;
        that.emit("change");
      }
    });
  }

  signout() {
    this.loggedIn = false
    this.email = null

    var tokenLocal = this.getAuthToken();
    var url = Constants.SIGNOUT_URL;

    localStorage.removeItem('tallyToken');
    localStorage.removeItem('tallyEndureToken');
    localStorage.removeItem('tallyUserEmail');
    localStorage.removeItem('tallyUserId');
    browserHistory.push('/');

    return this.handleSignOut(when(request({
      url: url,
      method: 'PUT',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    })));
  }

  handleSignOut(signOutPromise) {
    var that = this;

    return signOutPromise.then(function(response) {
      // Could post signed out success message here
      that.emit('change');
      return true;
    })
    .catch(function(response) {
      if (response.status !== 200) {
        var alertText = JSON.parse(response.response).message;
        that.error = alertText
        console.log("Error signing out.", response);
        that.emit('change');
        return false;
      }
    });
  }


  handleActions(action) {
    console.log("AuthStore received an action", action);

    switch(action.type) {
      case "SIGN_IN_USER": {
        this.signin(action.email, action.password);
        break;
      }
      case "SIGN_UP_USER": {
        this.signup(action.email, action.password);
        break
      }
      case "SIGN_OUT_USER": {
        this.signout()
        break;
      }
    }
  }

}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));
authStore.setMaxListeners(5);
// window.dispatcher = dispatcher

export default authStore;
