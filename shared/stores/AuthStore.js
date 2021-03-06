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

  isAdmin() {
    return localStorage.fullPerms === 'true';
  }

  getPassword() {
    return this.password;
  }

  getEmailError() {
    return this.emailError;
  }
  getPasswordError() {
    return this.pwError;
  }

  oldPasswordError() {
    return this.oldPwError;
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
    const url = Constants.SIGNIN_URL

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

  signup(email, password) {
    this.loggedIn = true
    this.email = email
    const url = Constants.SIGNUP_URL;

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
    const that = this;

    return signInPromise
    .then(function(response) {
      var savedToken = localStorage.getItem('tallyToken');
      localStorage.setItem('tallyUserEmail', response.email);
      // localStorage.setItem('tallyEndureToken', response.refreshToken);
      localStorage.setItem('tallyUserId', response.id);

      if (response.role === 'admin') {
        localStorage.setItem('fullPerms', 'true');
      }
      if (savedToken !== response.token) {
        localStorage.setItem('tallyToken', response.token);
      }
      that.emit("change");
      // AuthActions.startJwtPoll();
      browserHistory.push('/');
    })
    .catch(function (response) {
      // NOTE Model validation errors
      alertText = JSON.parse(response.response).message;
      if (response.status) {
        console.log("Error logging in", alertText);
        that.message = '';
        that.error = alertText;
        that.emailError = true;
        that.pwError = true;
        that.emit("change");
      } else if ((response.status !== 200) || response.status !== 304) {
        var alertText = JSON.parse(response.response).message;
        console.log("Error logging in", alertText);
        that.message = '';
        that.error = alertText;
        that.emailError = true;
        that.pwError = true;
        that.emit("change");
      }
    });
  }

  signout() {
    this.loggedIn = false
    this.email = null

    const tokenLocal = this.getAuthToken();
    const url = Constants.SIGNOUT_URL;

    localStorage.removeItem('tallyToken');
    localStorage.removeItem('tallyEndureToken');
    localStorage.removeItem('tallyUserEmail');
    localStorage.removeItem('tallyUserId');
    localStorage.removeItem('stripeCustomerId');
    localStorage.removeItem('fullPerms');
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
    const that = this;

    return signOutPromise.then(function(response) {
      // Could post signed out success message here
      that.emit('change');
      return true;
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        var alertText = JSON.parse(response.response).message;
        that.error = alertText
        console.log("Error signing out.", response);
        that.emit('change');
        return false;
      }
    });
  }

  verifyEmail() {
    const that = this;
    const url = Constants.EMAIL_VERIFICATION;
    var emailConfirmToken = window.location.search.split('?single_use_token=')[1];

    return this.handleEmailVerify(when(request({
      url: url + "?single_use_token=" + emailConfirmToken,
      method: 'GET',
      crossOrigin: true,
      type: 'json'
    })));
  }

  handleEmailVerify(verifyPromise) {
    const that = this;

    return verifyPromise.then(function(response) {
      // Could post signed out success message here
      that.emit('change');
      return true;
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        var alertText = JSON.parse(response.response).message;
        that.emailError = true;
        that.error = alertText;
        console.log("Error verifying email address.", response);
        that.emit('change');
        return false;
      }
    });
  }

  resetPassword(email) {
    const that = this;
    const url = Constants.EMAIL_RESET;
    browserHistory.push('/reset_password_submit');

    // NOTE dont report on if email address is found, always suggest sent
    return when(request({
      url: url,
      method: 'PUT',
      crossOrigin: true,
      type: 'json',
      data: {
        email: email
      }
    }));
  }

  updatePwFromReset(newPassword) {
    const that = this;
    const url = Constants.UPDATE_PW;

    var emailConfirmToken = window.location.search.split('?single_use_token=')[1];
    browserHistory.push('/password_update_submit')

    return this.handleEmailVerify(when(request({
      url: url + "?single_use_token=" + emailConfirmToken,
      method: 'PUT',
      crossOrigin: true,
      type: 'json',
      data: {
        newPassword: newPassword
      }
    })));
  }

  changePassword(oldPassword, newPassword) {
    const that = this;
    const url = Constants.CHANGE_PASSWORD;
    const tokenLocal = this.getAuthToken();
    var email = this.currentUser();

    return this.handlePasswordChange(when(request({
      url: url,
      method: 'PUT',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      },
      data: {
        email: email,
        password: oldPassword,
        newPassword: newPassword
      }
    })));
  }

  handlePasswordChange(verifyPromise) {
    const that = this;

    return verifyPromise.then(function(response) {
      that.message = response.message;
      that.error = '';
      that.pwError = false;
      that.emit('change');
      return true;
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        var alertText = JSON.parse(response.response).message;

        if (alertText === 'Invalid email or password') {
          that.oldPwError = true;
          that.message = '';
          that.error = alertText;
          that.emit('change');
          return false;
        } else {
          that.pwError = true;
          that.message = '';
          that.error = alertText;
          that.emit('change');
          return false;
          console.log("Error changing password.", response);
        }
      }
    });
  }

  authFacebook(fbResponse) {
    this.loggedIn = true
    this.email = email
    const url = Constants.AUTH_FACEBOOK;

    return this.handleAuth(when(request({
      url: url,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        fbResponse: fbResponse
      }
    })));
  }

  startJwtPoll() {
    const url = Constants.JWT_POLL;
    const that = this;

    (function poll(){
      setTimeout(function() {
        var tokenLocal = that.getAuthToken();

        if (tokenLocal !== undefined) {
          Promise.resolve(
            request({
              url: url,
              type: 'json',
              crossOrigin: true,
              method: 'GET',
              headers: {
                authorization: "Bearer " + tokenLocal
              }
            })
          ).catch(function(response) {
            // NOTE jwt error, take back to sign in
            that.signout();
            browserHistory.push('/signin');
            that.emit('change');
          })
          .then(function(response) {
            if (tokenLocal !== response.token) {
              localStorage.setItem('tallyToken', response.token);
            }
          });
        }
        poll();
      }, Constants.JWT_POLL_INTERVAL_MS);
    })();
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  handleActions(action) {
    // console.log("AuthStore received an action", action);

    switch(action.type) {
      case "SIGN_IN_USER": {
        this.signin(action.email, action.password);
        break;
      }
      case "SIGN_UP_USER": {
        this.signup(action.email, action.password);
        break;
      }
      case "AUTH_FACEBOOK": {
        this.authFacebook(action.fbResponse);
        break;
      }
      case "SIGN_OUT_USER": {
        this.signout()
        break;
      }
      case "VERIFY_USER_EMAIL": {
        this.verifyEmail()
        break;
      }
      case  "RESET_PASSWORD": {
        this.resetPassword(action.email);
        this.emit('change');
        break;
      }
      case "CHANGE_PASSWORD": {
        this.changePassword(action.oldPassword, action.password);
        break;
      }
      case "UPDATE_PW_FROM_RESET": {
        this.updatePwFromReset(action.password);
        break;
      }
      case "START_JWT_POLL": {
        this.startJwtPoll();
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
